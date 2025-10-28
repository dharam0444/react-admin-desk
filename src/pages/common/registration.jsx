import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { SignUpFormSchema } from "../../schemas/SignupForm";
import { RegistrationFormSchema } from "../../schemas/Registration";

export default function Registration() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(RegistrationFormSchema),
  });

  const onSubmit = data => {
    alert("Registration Successful!");
    reset();
  };

  return (
    <div className="container signup-container">
      <h3 className="form-title">Registration</h3>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="row g-3">
          <div className="col-md-6">
            <label htmlFor="firstName" className="form-label">
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              placeholder="Enter first name"
              required
              {...register("firstName")}
              className={`form-control ${errors.firstName ? "is-invalid" : ""}`}
            />
            <p className="text-danger">{errors.firstName?.message}</p>
          </div>
          <div className="col-md-6">
            <label htmlFor="lastName" className="form-label">
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              placeholder="Enter last name"
              required
              {...register("lastName")}
              className={`form-control ${errors.lastName ? "is-invalid" : ""}`}
            />
            <p className="text-danger">{errors.lastName?.message}</p>
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

          <div className="col-md-6">
            <label htmlFor="mobile" className="form-label">
              Mobile Number
            </label>
            <input
              type="tel"
              id="mobile"
              placeholder="Enter mobile number"
              required
              {...register("mobile")}
              className={`form-control ${errors.mobile ? "is-invalid" : ""}`}
            />
            <p className="text-danger">{errors.mobile?.message}</p>
          </div>

          <div className="col-md-6">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <input
              type="text"
              id="username"
              placeholder="Create a username"
              required
              {...register("username")}
              className={`form-control ${errors.username ? "is-invalid" : ""}`}
            />
            <p className="text-danger">{errors.username?.message}</p>
          </div>

          <div className="col-6">
            <label htmlFor="address1" className="form-label">
              Address 1
            </label>
            <input
              type="text"
              id="address1"
              placeholder="1234 Main St"
              required
              {...register("address1")}
              className={`form-control ${errors.address1 ? "is-invalid" : ""}`}
            />
            <p className="text-danger">{errors.address1?.message}</p>
          </div>

          <div className="col-6">
            <label htmlFor="address2" className="form-label">
              Address 2
            </label>
            <input
              type="text"
              id="address2"
              placeholder="Apartment, studio, or floor"
              {...register("address2")}
              className={`form-control ${errors.address2 ? "is-invalid" : ""}`}
            />
            <p className="text-danger">{errors.address2?.message}</p>
          </div>

          <div className="col-6">
            <label htmlFor="country" className="form-label">
              Country
            </label>
            <select
              className={`form-select ${errors.country ? "is-invalid" : ""}`}
              {...register("country")}
              id="country"
              required
            >
              <option disabled defaultValue={""}>
                Choose...
              </option>
              <option>India</option>
              <option>USA</option>
              <option>UK</option>
              <option>Canada</option>
            </select>
            <p className="text-danger">{errors.country?.message}</p>
          </div>

          <div className="col-6">
            <label htmlFor="state" className="form-label">
              State
            </label>
            <input
              type="text"
              id="state"
              placeholder="Enter state"
              required
              {...register("state")}
              className={`form-control ${errors.state ? "is-invalid" : ""}`}
            />
            <p className="text-danger">{errors.state?.message}</p>
          </div>

          <div className="col-md-6">
            <label htmlFor="city" className="form-label">
              City
            </label>
            <input
              type="text"
              className={`form-control ${errors.city ? "is-invalid" : ""}`}
              id="city"
              placeholder="Enter city"
              required
              {...register("city")}
            />
            <p className="text-danger">{errors.city?.message}</p>
          </div>

          <div className="col-md-6">
            <label htmlFor="zip" className="form-label">
              Zip Code
            </label>
            <input
              type="text"
              id="zip"
              className={`form-control ${errors.zipcode ? "is-invalid" : ""}`}
              placeholder="123456"
              required
              {...register("zipcode")}
            />
            <p className="text-danger">{errors.zipcode?.message}</p>
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
