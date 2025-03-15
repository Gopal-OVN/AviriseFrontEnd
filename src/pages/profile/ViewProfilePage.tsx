import ProfileSidebar from "../../components/profile/ProfileSidebar";

const ViewProfilePage = () => {
  return (
    <div className="row g-4">
      <div className="col-12">
        <div className="dashboard-breadcrumb">
          <h6 className="mb-0">View Profile</h6>
        </div>
      </div>

      <div className="col-12 col-xl-12">
        <div className="panel">
          <div className="panel-body">
            <ProfileSidebar />
          </div>
        </div>
      </div>
    </div>
  );
};
export default ViewProfilePage;
