import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoginFormSchema } from "../../schemas/LoginForm";
import { useAuth } from "../../utils/context/AuthContext";
import { apiRequest } from "../../api/apiClient";
import { ENDPOINTS } from "../../api/endpoints";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function Login() {
  const navigate = useNavigate();
  const { login, logout } = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    logout();
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(LoginFormSchema),
  });

  const onSubmit = async ({ email, password }) => {
    const payload = { email, password };
    const res = await apiRequest({
      method: "post",
      url: ENDPOINTS.LOGIN,
      data: payload,
    });
    if (res?.settings?.status) {
      toast.success(res?.settings?.message);
      login({ user: res?.data });
      navigate("/admin");
      reset();
    } else {
      toast.error(res?.message);
    }
  };

  return (
    <div className="container login-container">
      <h3 className="form-title">Login</h3>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="row g-3 ">
          <div className="col-12 ">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="text"
              className={`form-control ${errors.email ? "is-invalid" : ""}`}
              id="email"
              placeholder="Enter email"
              {...register("email")}
              required
            />
            <p className="text-danger">{errors.email?.message}</p>
          </div>

          <div className="col-12 position-relative">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              className={`form-control ${errors.password ? "is-invalid" : ""}`}
              id="password"
              placeholder="Enter password"
              {...register("password")}
              required
            />
            <span
              onClick={() => setShowPassword(prev => !prev)}
              style={{
                position: "absolute",
                right: "10px",
                top: "38px",
                cursor: "pointer",
                color: "#666",
              }}
            >
              {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
            </span>
            <p className="text-danger">{errors.password?.message}</p>
          </div>
        </div>

        <div className="mt-4 text-center">
          <button className="btn btn-primary px-4" type="submit">
            Login
          </button>
        </div>
      </form>
    </div>
  );
}
