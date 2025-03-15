import { useState } from "react";
import { useMutation } from "react-query";
import { updatePasswordAPI } from "../../services/auth-service";
import { toast } from "react-toastify";

const ChangePasswordForm = () => {
  const [formData, setFormData] = useState({
    old_password: "",
    new_password: "",
    confirm_password: "",
  });

  const mutation = useMutation(
    ({
      old_password,
      new_password,
    }: {
      old_password: string;
      new_password: string;
    }) => updatePasswordAPI(old_password, new_password)
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { old_password, new_password, confirm_password } = formData;

    if (new_password !== confirm_password) {
      toast.error("New Password and Confirm Password do not match!");
      return;
    }

    mutation.mutate(
      { old_password, new_password },
      {
        onSuccess: () => {
          toast.success("Password updated successfully!");
          setFormData({
            old_password: "",
            new_password: "",
            confirm_password: "",
          });
        },
        onError: () => {
          toast.error("Failed to update password. Please try again.");
        },
      }
    );
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="profile-edit-tab-title">
        <h6>Change Password</h6>
      </div>
      <div className="social-information">
        <div className="row g-3">
          <div className="col-12">
            <div className="input-group">
              <span className="input-group-text">
                <i className="fa-light fa-lock"></i>
              </span>
              <input
                type="password"
                name="old_password"
                className="form-control"
                placeholder="Current Password"
                value={formData.old_password}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="col-lg-6 col-12">
            <div className="input-group mb-3">
              <span className="input-group-text">
                <i className="fa-light fa-lock"></i>
              </span>
              <input
                type="password"
                name="new_password"
                className="form-control"
                placeholder="New Password"
                value={formData.new_password}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="col-lg-6 col-12 mb-3">
            <div className="input-group">
              <span className="input-group-text">
                <i className="fa-light fa-lock"></i>
              </span>
              <input
                type="password"
                name="confirm_password"
                className="form-control"
                placeholder="Confirm Password"
                value={formData.confirm_password}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="col-12">
            <button
              type="submit"
              className="btn btn-primary w-100"
              disabled={mutation.isLoading}
            >
              {mutation.isLoading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default ChangePasswordForm;
