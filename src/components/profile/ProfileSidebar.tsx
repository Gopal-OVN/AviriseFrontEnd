import { useEffect, useRef, useState, useCallback } from "react";
import { useQuery } from "react-query";
import { fetchProfileAPI } from "../../services/user-service";
import { Link } from "react-router-dom";

interface Profile {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  address: string;
  joining_date: string;
  role: string;
  avatar: string;
}

const ProfileSidebar = () => {
  const [activeDropdown, setActiveDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const {
    data: profile,
    isLoading,
    isError,
  } = useQuery<Profile>("profileData", fetchProfileAPI);

  const handleOutsideClick = useCallback((event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setActiveDropdown(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [handleOutsideClick]);

  // const toggleDropdown = () => setActiveDropdown((prev) => !prev);

  if (isLoading) return <p>Loading...</p>;
  if (isError || !profile) return <p>Failed to load profile data.</p>;

  return (
    <div className="profile-sidebar">
      <div className="d-flex justify-content-between align-items-center">
        <h5 className="profile-sidebar-title">User Information</h5>
        <div
          className="profile-view-action dropdown dropstart"
          ref={dropdownRef}
        >
          {/* <button
            className="btn btn-sm btn-icon btn-light"
            onClick={toggleDropdown}
          >
            <i className="fa-solid fa-ellipsis"></i>
          </button> */}
          {activeDropdown && (
            <ul className="dropdown-menu dropdown-menu-sm dropdown-menu-sm-end show">
              <li>
                <a className="dropdown-item" href="edit-profile">
                  <i className="fa-regular fa-pen-to-square"></i> Edit
                  Information
                </a>
              </li>
            </ul>
          )}
          <Link to="/edit-profile" className="btn btn-sm border">
            Edit Profile
          </Link>
        </div>
      </div>
      <div className="top">
        <div className="image-wrap">
          <div className="part-img rounded-circle overflow-hidden">
            <img src={profile.avatar || "/img/bg-img/admin.png"} alt="admin" />
          </div>
          <button className="image-change">
            <i className="fa-light fa-camera"></i>
          </button>
        </div>
        <div className="part-txt">
          <h4 className="admin-name">{`${profile.first_name} ${profile.last_name}`}</h4>
          <span className="admin-role">{profile.role}</span>
          <div className="admin-social">
            <a href="#">
              <i className="fa-brands fa-facebook-f"></i>
            </a>
            <a href="#">
              <i className="fa-brands fa-twitter"></i>
            </a>
            <a href="#">
              <i className="fa-brands fa-google"></i>
            </a>
            <a href="#">
              <i className="fa-brands fa-instagram"></i>
            </a>
          </div>
        </div>
      </div>
      <div className="bottom">
        <h6 className="profile-sidebar-subtitle">Communication Info</h6>
        <ul>
          <li>
            <span>Full Name:</span>{" "}
            {`${profile.first_name} ${profile.last_name}`}
          </li>
          <li>
            <span>Mobile:</span> {profile.phone}
          </li>
          <li>
            <span>Mail:</span> {profile.email}
          </li>
          <li>
            <span>Address:</span> {profile.address}
          </li>
          <li>
            <span>Joining Date:</span> {profile.joining_date}
          </li>
        </ul>
        <h6 className="profile-sidebar-subtitle">About Me</h6>
        <p>
          It has survived not only five centuries, but also the leap into
          electronic typesetting, remaining essentially unchanged. It was
          popularised in the 1960s with the release of Letraset sheets.
        </p>
      </div>
    </div>
  );
};

export default ProfileSidebar;
