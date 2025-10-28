import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { SignUpFormSchema } from "../../schemas/SignupForm";
import { apiRequest } from "../../api/apiClient";
import { ENDPOINTS } from "../../api/endpoints";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function SignUp() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(SignUpFormSchema),
  });

  const onSubmit = async ({ name, email, password }) => {
    const payload = { name, email, password };
    const res = await apiRequest({
      method: "post",
      url: ENDPOINTS.SIGNUP,
      data: payload,
    });
    if (res?.settings?.status) {
      toast.success(res?.settings?.message);
      navigate("/login");
      reset();
    } else {
      toast.error(res?.settings?.message);
    }
  };

  return (
    <div className="container signup-container">
      <h3 className="form-title">Sign Up</h3>
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

          <div className="col-12">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className={`form-control ${errors.password ? "is-invalid" : ""}`}
              id="password"
              placeholder="Enter password"
              {...register("password")}
              required
            />
            <p className="text-danger">{errors.password?.message}</p>
          </div>

          <div className="col-12">
            <label htmlFor="confirmPassword" className="form-label">
              Confirm Password
            </label>
            <input
              type="password"
              className={`form-control ${errors.confirmPassword ? "is-invalid" : ""}`}
              id="confirmPassword"
              placeholder="Enter Confirm password"
              {...register("confirmPassword")}
              required
            />
            <p className="text-danger">{errors.confirmPassword?.message}</p>
          </div>
        </div>
        <div className="mt-4 text-center">
          <button className="btn btn-primary px-4" type="submit">
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
}
