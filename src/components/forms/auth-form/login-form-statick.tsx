import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const LoginFormStatick = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    // rememberMe: false,
  });
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible((prev) => !prev);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { email, password } = formData;

    if (!email || !password) {
      toast.error("Please fill in all required fields.");
      return;
    }

    try {
      // Prepare form data as FormData
      const data = new FormData();
      data.append("email", email);
      data.append("password", password);

      setIsLoading(true);
      // const result = await loginAPI(data);
      // console.error("result", result);

      toast.success("Login successful");
      navigate("/dashboard");

      // const { access, refresh } = result.access_token;
      // localStorage.setItem("accessToken", result.access_token);
      // localStorage.setItem("refreshToken", refresh);
      // localStorage.setItem("me", JSON.stringify(result.access_token));
      // localStorage.setItem("userId", result.user_data.id);
    } catch (error: any) {
      console.error("Login error:", error);
      // toast.error(error.message || "An unknown error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="input-group mb-4">
        <span className="input-group-text">
          <i className="fa-regular fa-user"></i>
        </span>
        <input
          type="text"
          name="email"
          className="form-control"
          placeholder="email or email address"
          value={formData.email}
          onChange={handleChange}
        />
      </div>

      <div className="input-group mb-4">
        <span className="input-group-text">
          <i className="fa-regular fa-lock"></i>
        </span>
        <input
          type={passwordVisible ? "text" : "password"}
          name="password"
          className="form-control rounded-end"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />
        <button
          type="button"
          className="password-show btn btn-link"
          onClick={togglePasswordVisibility}
          aria-label={passwordVisible ? "Hide password" : "Show password"}
        >
          <i
            className={`fa-duotone fa-${passwordVisible ? "eye-slash" : "eye"}`}
          ></i>
        </button>
      </div>

      <div className="d-flex justify-content-between align-items-center mb-4">
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            name="rememberMe"
            id="loginCheckbox"
          />
          <label
            className="form-check-label text-white"
            htmlFor="loginCheckbox"
          >
            Remember Me
          </label>
        </div>
        <Link to="/auth/forget-password" className="text-white fs-14">
          Forgot Password?
        </Link>
      </div>

      <button
        type="submit"
        className="btn btn-primary w-100 login-btn"
        disabled={isLoading}
      >
        {isLoading ? "Signing in..." : "Sign in"}
      </button>
    </form>
  );
};

export default LoginFormStatick;
