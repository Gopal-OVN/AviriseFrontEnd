import { Link } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";

const AuthTopLogo = () => {
  const darkMode = useAppSelector((state) => state.theme.isDark);
  return (
    <>
      <div className="logo" style={{ textAlign: "center" }}>
        <a
          href="#"
          style={{ display: "inline-block", width: "150px", height: "auto" }}
        >
          {darkMode ? (
            <img
              src="https://avirise.com/wp-content/uploads/2024/12/Avirise-Logo-1.png"
              alt="logo"
              style={{ width: "100%", height: "auto" }}
            />
          ) : (
            <img
              src="https://avirise.com/wp-content/uploads/2024/12/Avirise-Logo-1.png"
              alt="logo"
              style={{ width: "100%", height: "auto" }}
            />
          )}
        </a>
      </div>

      <Link to="/">
        <i className="fa-duotone fa-house-chimney"></i>
      </Link>
    </>
  );
};
export default AuthTopLogo;
