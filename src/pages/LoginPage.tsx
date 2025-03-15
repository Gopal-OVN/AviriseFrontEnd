import AuthTopLogo from "../components/auth/AuthTopLogo";
import LoginForm from "../components/forms/auth-form/login-form";
import { useAppSelector } from "../redux/hooks";

const LoginPage = () => {
  const darkMode = useAppSelector((state) => state.theme.isDark);

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
            <h3 className="panel-title">Login</h3>
            {/* <AuthForm /> */}
            <LoginForm />
            {/* <OtherAuthOptions /> */}
          </div>
        </div>
      </div>
    </main>
  );
};
export default LoginPage;
