import { useEffect, useMemo, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { ModuleRegistry, AllCommunityModule, themeQuartz } from "ag-grid-community";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { apiRequest } from "@api/apiClient";
import { ENDPOINTS } from "@api/endpoints";

const MySwal = withReactContent(Swal);

ModuleRegistry.registerModules([AllCommunityModule]);

export default function Products() {
  const navigate = useNavigate();
  const [rowData, setRowData] = useState([]);

  const columnDefs = useMemo(
    () => [
      {
        headerName: "ID",
        field: "_id",

        maxWidth: 250,
        cellRenderer: params => (
          <span
            onClick={() => navigate(`/admin/products/${params.value}`)}
            style={{
              color: "#0d6efd",
              cursor: "pointer",
              textDecoration: "underline",
            }}
          >
            {params.value}
          </span>
        ),
      },
      { headerName: "Name", field: "name", maxWidth: 250 },
      {
        headerName: "Description",
        field: "description",
      },
      {
        headerName: "Price",
        field: "price",
        maxWidth: 100,
      },
      {
        headerName: "Image",
        field: "image",
      },
      {
        headerName: "Category",
        field: "category",
      },
      {
        headerName: "Stock",
        field: "stock",
        maxWidth: 100,
        minWidth: 80,
      },
      {
        headerName: "Brand",
        field: "brand",
        maxWidth: 100,
        minWidth: 80,
      },
      {
        headerName: "Status",
        field: "status",
        maxWidth: 80,
      },
      {
        headerName: "Created At",
        field: "createdAt",
        minWidth: 100,
      },
      {
        headerName: "Action",
        field: "",

        cellRenderer: params => (
          <span
            onClick={() => handleDelete(params.data._id)}
            style={{
              color: "#fd0d0dff",
              cursor: "pointer",
              textDecoration: "underline",
            }}
          >
            Delete
          </span>
        ),
      },
    ],
    [navigate]
  );

  useEffect(() => {
    getList();
  }, []);

  const getList = async () => {
    const res = await apiRequest({
      method: "get",
      url: ENDPOINTS.PRODUCTS,
    });

    if (res?.settings?.status) {
      // toast.success(res?.settings?.message);
      setRowData(res?.data);
    } else {
      toast.error(res?.settings?.message);
    }
  };

  const defaultColDef = {
    flex: 1,
    sortable: false,
    filter: false,
    rowHeight: 60,
  };

  const handleDelete = async id => {
    MySwal.fire({
      title: "Are you sure?",
      text: "You won’t be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async result => {
      if (result.isConfirmed) {
        const res = await apiRequest({
          method: "delete",
          url: ENDPOINTS.PRODUCT_BY_ID(id),
        });
        if (res?.settings?.status) {
          toast.success(res?.settings?.message);
          getList();
        } else {
          toast.error(res?.settings?.message);
        }
      }
    });
  };

  return (
    <div className="container py-4 mx-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="mb-4 fw-semibold">Product Listing</h2>
        <Link to="/admin/products/add" className="btn btn-primary px-4 ms-2" type="button">
          Add Product
        </Link>
      </div>

      <div className="ag-theme-alpine rounded-lg shadow-md" style={{ height: 400, width: "100%" }}>
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          pagination={true}
          theme={themeQuartz}
          paginationPageSize={5}
          rowSelection="multiple"
          defaultColDef={defaultColDef}
        />
      </div>
    </div>
  );
}
