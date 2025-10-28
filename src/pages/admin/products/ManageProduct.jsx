import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";
import { ProductFormSchema } from "@schemas/ProductForm";

import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { apiRequest } from "@api/apiClient";
import { ENDPOINTS } from "@api/endpoints";

export default function ManageProduct() {
  const navigate = useNavigate();
  const { id } = useParams();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(ProductFormSchema),
  });

  useEffect(() => {
    if (id) {
      getUsersDetails();
    }
  }, []);

  const getUsersDetails = async () => {
    const res = await apiRequest({
      method: "get",
      url: ENDPOINTS.PRODUCT_BY_ID(id),
    });
    if (res?.settings?.status) {
      toast.success(res?.settings?.message);
      const userData = {
        name: res?.data?.name,
        brand: res?.data?.brand,
        description: res?.data?.description,
        price: res?.data?.price,
        stock: res?.data?.stock,
        category: res?.data?.category,
        image: res?.data?.image,
        status: res?.data?.status,
      };
      reset(userData);
    } else {
      toast.error(res?.settings?.message);
    }
  };

  const onSubmit = async data => {
    const res = await apiRequest({
      method: id ? "put" : "post",
      url: id ? ENDPOINTS.PRODUCT_BY_ID(id) : ENDPOINTS.PRODUCTS,
      data,
    });

    if (res?.settings?.status) {
      toast.success(res?.settings?.message || "Product created successfully!");
      reset();
      navigate("/admin/products");
    } else {
      toast.error(res?.message || "Failed to create product");
    }
  };

  return (
    <div className="container mt-4 product-container">
      <h3 className="form-title mb-3">{id ? "Update Product" : "Create Product"}</h3>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="row g-3">
          <div className="col-md-6">
            <label className="form-label">Product Name</label>
            <input
              type="text"
              className={`form-control ${errors.name ? "is-invalid" : ""}`}
              placeholder="Enter product name"
              {...register("name")}
            />
            <p className="text-danger">{errors.name?.message}</p>
          </div>

          <div className="col-md-6">
            <label className="form-label">Brand</label>
            <input
              type="text"
              className={`form-control ${errors.brand ? "is-invalid" : ""}`}
              placeholder="Enter brand"
              {...register("brand")}
            />
            <p className="text-danger">{errors.brand?.message}</p>
          </div>

          <div className="col-12">
            <label className="form-label">Description</label>
            <textarea
              rows="3"
              className={`form-control ${errors.description ? "is-invalid" : ""}`}
              placeholder="Enter product description"
              {...register("description")}
            />
            <p className="text-danger">{errors.description?.message}</p>
          </div>

          <div className="col-md-4">
            <label className="form-label">Price (₹)</label>
            <input
              type="number"
              className={`form-control ${errors.price ? "is-invalid" : ""}`}
              placeholder="Enter price"
              {...register("price")}
            />
            <p className="text-danger">{errors.price?.message}</p>
          </div>

          <div className="col-md-4">
            <label className="form-label">Stock</label>
            <input
              type="number"
              className={`form-control ${errors.stock ? "is-invalid" : ""}`}
              placeholder="Enter stock quantity"
              {...register("stock")}
            />
            <p className="text-danger">{errors.stock?.message}</p>
          </div>

          <div className="col-md-4">
            <label className="form-label">Category</label>
            <input
              type="text"
              className={`form-control ${errors.category ? "is-invalid" : ""}`}
              placeholder="Enter category"
              {...register("category")}
            />
            <p className="text-danger">{errors.category?.message}</p>
          </div>

          <div className="col-md-8">
            <label className="form-label">Image URL</label>
            <input
              type="text"
              className={`form-control ${errors.image ? "is-invalid" : ""}`}
              placeholder="https://example.com/product.jpg"
              {...register("image")}
            />
            <p className="text-danger">{errors.image?.message}</p>
          </div>

          <div className="col-md-4">
            <label className="form-label">Status</label>
            <select
              className={`form-select ${errors.status ? "is-invalid" : ""}`}
              {...register("status")}
            >
              <option value="">Select Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
            <p className="text-danger">{errors.status?.message}</p>
          </div>
        </div>

        <div className="mt-4 text-center">
          <button className="btn btn-primary px-4" type="submit">
            {id ? "Update Product" : "Create Product"}
          </button>
          <Link to="/admin/products" className="btn btn-danger px-4 ms-2" type="button">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
