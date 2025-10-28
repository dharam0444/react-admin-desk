import { useEffect, useMemo, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { ModuleRegistry, AllCommunityModule, themeQuartz } from "ag-grid-community";
import { apiRequest } from "@api/apiClient";
import { ENDPOINTS } from "@api/endpoints";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

ModuleRegistry.registerModules([AllCommunityModule]);

export default function Users() {
  const navigate = useNavigate();
  const [rowData, setRowData] = useState([]);

  const columnDefs = useMemo(
    () => [
      {
        headerName: "ID",
        field: "id",
        rowHeight: 60,
        maxWidth: 250,
        cellRenderer: params => (
          <span
            onClick={() => navigate(`/admin/users/${params.value}`)}
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
      { headerName: "Name", field: "name", rowHeight: 60, maxWidth: 250 },
      {
        headerName: "Email",
        field: "email",
        rowHeight: 60,
      },
      { headerName: "Role", field: "role", rowHeight: 60 },
      {
        headerName: "Action",
        field: "",
        rowHeight: 60,
        cellRenderer: params => (
          <span
            onClick={() => handleDelete(params.data.id)}
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
    getUsers();
  }, []);

  const getUsers = async () => {
    const res = await apiRequest({
      method: "get",
      url: ENDPOINTS.GET_USERS,
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
          url: ENDPOINTS.USER_BY_ID(id),
        });
        if (res?.settings?.status) {
          toast.success(res?.settings?.message);
          getUsers();
        } else {
          toast.error(res?.settings?.message);
        }
      }
    });
  };

  return (
    <div className="container py-0 mx-0 px-md-4 py-md-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="mb-4 fw-semibold">User Listing</h2>
        <Link to="/admin/users/add" className="btn btn-primary px-4 ms-2" type="button">
          Add User
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
