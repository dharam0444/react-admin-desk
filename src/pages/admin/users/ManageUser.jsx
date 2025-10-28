import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { apiRequest } from "@api/apiClient";
import { ENDPOINTS } from "@api/endpoints";
import { useParams } from "react-router-dom";
import { UserDetailsSchema } from "@schemas/SignupForm";

export default function ManageUser() {
  const navigate = useNavigate();
  const { id } = useParams();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(UserDetailsSchema),
  });

  const onSubmit = async ({ name, email }) => {
    const payload = { name, email };
    const res = await apiRequest({
      method: "put",
      url: ENDPOINTS.USER_BY_ID(id),
      data: payload,
    });
    if (res?.settings?.status) {
      toast.success(res?.settings?.message);
      navigate("/admin/users");
      reset();
    } else {
      toast.error(res?.settings?.message);
    }
  };

  useEffect(() => {
    if (id) {
      getUsersDetails();
    }
  }, [id]);

  const getUsersDetails = async () => {
    const res = await apiRequest({
      method: "get",
      url: ENDPOINTS.USER_BY_ID(id),
    });
    if (res?.settings?.status) {
      toast.success(res?.settings?.message);
      const userData = {
        name: res?.data?.name,
        email: res?.data?.email,
      };
      reset(userData);
    } else {
      toast.error(res?.settings?.message);
    }
  };

  return (
    <div className="container signup-container">
      <h3 className="form-title">User Details</h3>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="row g-2">
          <div className="col-md-12">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              id="name"
              placeholder="Enter first name"
              required
              {...register("name")}
              className={`form-control ${errors.name ? "is-invalid" : ""}`}
            />
            <p className="text-danger">{errors.name?.message}</p>
          </div>
          <div className="col-md-12">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="example@email.com"
              required
              {...register("email")}
              className={`form-control ${errors.email ? "is-invalid" : ""}`}
            />
            <p className="text-danger">{errors.email?.message}</p>
          </div>
        </div>
        <div className="mt-4 text-center">
          <button className="btn btn-primary px-4" type="submit">
            Update
          </button>
        </div>
      </form>
    </div>
  );
}
