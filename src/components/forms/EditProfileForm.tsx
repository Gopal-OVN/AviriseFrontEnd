import { useState } from "react";
import PublicInfoSection from "../profile/PublicInfoSection";
import { updateProfileAPI } from "../../services/user-service";
// import PrivateInfoSection from "../profile/PrivateInfoSection"; // Uncomment if needed

const EditProfileForm = () => {
  const [name, setName] = useState("Mitchell C. Shay");
  const [userName, setUserName] = useState("@mitchellc");
  const [desc, setDesc] = useState(
    "It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged."
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const profileData = {
      name,
      userName,
      desc,
    };

    try {
      const response = await updateProfileAPI(profileData);
      console.log("Profile updated successfully", response);
      // Optionally, show a success message or redirect
    } catch (error) {
      console.error("Error updating profile", error);
      // Optionally, show an error message
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="profile-edit-tab-title">
        <h6>Public Information</h6>
      </div>
      <PublicInfoSection
        name={name}
        setName={setName}
        userName={userName}
        setUserName={setUserName}
        desc={desc}
        setDesc={setDesc}
      />

      <div className="profile-edit-tab-title">
        <h6>Private Information</h6>
      </div>

      {/* Uncomment when implementing the PrivateInfoSection */}
      {/* <PrivateInfoSection /> */}

      <div className="d-flex justify-content-end ms-3">
        <button type="submit" className="btn btn-primary">
          Save Changes
        </button>
      </div>
    </form>
  );
};

export default EditProfileForm;
