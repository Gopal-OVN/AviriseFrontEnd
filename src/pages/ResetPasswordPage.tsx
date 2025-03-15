import { Link, useSearchParams } from "react-router-dom";
import AuthTopLogo from "../components/auth/AuthTopLogo";
import { useAppSelector } from "../redux/hooks";
import { useState } from "react";
import { toast } from "react-toastify";
import { resetPasswordAPI } from "../services/auth-service";
import { useNavigate } from "react-router-dom";

const ResetPasswordPage = () => {
  const navigate = useNavigate();

  const darkMode = useAppSelector((state) => state.theme.isDark);
  const [new_password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [searchParams] = useSearchParams();

  const token = searchParams.get("token");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!token) {
      toast.error("Invalid reset link.");
      return;
    }
    if (new_password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    try {
      const data = new FormData();
      data.append("new_password", new_password);
      data.append("token", token);

      const result = await resetPasswordAPI(data);
      toast.success(result.message || "Password updated successfully.");
      navigate("/");
    } catch (error: any) {
      console.error("Error object:", error);

      toast.error(error.response.detail);
    }
  };

  return (
    <main
      className={`home-call-center ${darkMode ? "dark-theme" : "light-theme"}`}
    >
      <div className="main-content login-panel">
        <div className="login-body">
          <div className="top d-flex justify-content-between align-items-center">
            <AuthTopLogo />
          </div>
          <div className="bottom">
            <h3 className="panel-title">Reset Password</h3>
            <form onSubmit={handleSubmit}>
              <div className="input-group mb-4">
                <span className="input-group-text">
                  <i className="fa-solid fa-lock"></i>
                </span>
                <input
                  type="password"
                  className="form-control"
                  placeholder="New Password"
                  value={new_password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              {/* Confirm Password Input */}
              <div className="input-group mb-4">
                <span className="input-group-text">
                  <i className="fa-solid fa-lock"></i>
                </span>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>

              <button type="submit" className="btn btn-primary w-100 login-btn">
                Update Password
              </button>
            </form>
            <div className="other-option">
              <p className="mb-0">
                Remember the password? <Link to="/">Login</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ResetPasswordPage;
