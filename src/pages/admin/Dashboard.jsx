import { Link } from "react-router-dom";
import { FaUsers, FaShoppingCart, FaBoxOpen, FaUserTie, FaChartLine } from "react-icons/fa";

export default function Dashboard() {
  return (
    <div className="container py-4 mx-0 px-md-4 py-md-4">
      <h2 className="mb-4 fw-semibold">Admin Dashboard</h2>
      <p className="text-muted mb-5">
        Welcome back 👋 — manage your users, products, orders, and customers all from one place. Use
        the quick links below to jump to specific modules.
      </p>

      <div className="row g-4">
        {/* Analytics Overview */}
        <div className="col-12 col-md-6 col-lg-4">
          <div className="card border-0 shadow-lg h-100">
            <div className="card-body d-flex align-items-center">
              <FaChartLine className="text-primary fs-2 me-3" />
              <div>
                <h5 className="card-title mb-1">Dashboard Overview</h5>
                <p className="card-text text-muted small">
                  Monitor key insights, revenue trends, and active users in real-time.
                </p>
                <Link to="/admin/home" className="btn btn-sm btn-outline-primary">
                  Go to Overview
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Users */}
        <div className="col-12 col-md-6 col-lg-4">
          <div className="card border-0 shadow-lg h-100">
            <div className="card-body d-flex align-items-center">
              <FaUsers className="text-success fs-2 me-3" />
              <div>
                <h5 className="card-title mb-1">Users Management</h5>
                <p className="card-text text-muted small">
                  View and manage registered users, roles, and access permissions.
                </p>
                <Link to="/admin/users" className="btn btn-sm btn-outline-success">
                  Manage Users
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Orders */}
        <div className="col-12 col-md-6 col-lg-4">
          <div className="card border-0 shadow-lg h-100">
            <div className="card-body d-flex align-items-center">
              <FaShoppingCart className="text-warning fs-2 me-3" />
              <div>
                <h5 className="card-title mb-1">Orders</h5>
                <p className="card-text text-muted small">
                  Track customer orders, update statuses, and review transactions.
                </p>
                <Link to="/admin/orders" className="btn btn-sm btn-outline-warning">
                  View Orders
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Products */}
        <div className="col-12 col-md-6 col-lg-4">
          <div className="card border-0 shadow-lg h-100">
            <div className="card-body d-flex align-items-center">
              <FaBoxOpen className="text-danger fs-2 me-3" />
              <div>
                <h5 className="card-title mb-1">Products</h5>
                <p className="card-text text-muted small">
                  Manage your catalog — create, update, or remove products easily.
                </p>
                <Link to="/admin/products" className="btn btn-sm btn-outline-danger">
                  Manage Products
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Customers */}
        <div className="col-12 col-md-6 col-lg-4">
          <div className="card border-0 shadow-lg h-100">
            <div className="card-body d-flex align-items-center">
              <FaUserTie className="text-info fs-2 me-3" />
              <div>
                <h5 className="card-title mb-1">Customers</h5>
                <p className="card-text text-muted small">
                  Explore customer profiles, history, and engagement metrics.
                </p>
                <Link to="/admin/customers" className="btn btn-sm btn-outline-info">
                  View Customers
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
