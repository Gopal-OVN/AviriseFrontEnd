import { Link } from "react-router-dom";
import AuthTopLogo from "../../components/auth/AuthTopLogo";
import { useAppSelector } from "../../redux/hooks";
import { useState } from "react";
import { toast } from "react-toastify";
import { forgotpassword } from "../../services/auth-service";

const ForgetPasswordPage = () => {
  const darkMode = useAppSelector((state) => state.theme.isDark);
  const [emailOrUsername, setEmailOrUsername] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmailOrUsername(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailOrUsername) {
      toast.error("Please provide your email or username.");
      return;
    }

    try {
      console.log("emailOrUsername", emailOrUsername);

      const data = new FormData();
      data.append("email", emailOrUsername);
      console.log("FormData entries:", Array.from(data.entries()));

      const result = await forgotpassword(data);
      toast.success(
        result.message || "Link sent successfully! Check your inbox."
      );
      setEmailOrUsername(""); // Clear input field
    } catch (error: any) {
      toast.error(error.message || "An unknown error occurred.");
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
            <h3 className="panel-title">Forget Password</h3>
            <form onSubmit={handleSubmit}>
              <div className="input-group mb-4">
                <span className="input-group-text">
                  <i className="fa-regular fa-envelope"></i>
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Username or email address"
                  value={emailOrUsername}
                  onChange={handleChange}
                />
              </div>
              <button type="submit" className="btn btn-primary w-100 login-btn">
                Get Link
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

export default ForgetPasswordPage;
