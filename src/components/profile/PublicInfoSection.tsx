interface PublicInfoSectionProps {
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  userName: string;
  setUserName: React.Dispatch<React.SetStateAction<string>>;
  desc: string;
  setDesc: React.Dispatch<React.SetStateAction<string>>;
}

const PublicInfoSection: React.FC<PublicInfoSectionProps> = ({
  name,
  setName,
  userName,
  setUserName,
  desc,
  setDesc,
}) => {
  return (
    <div className="public-information mb-4">
      <div className="row g-4">
        <div className="col-lg-3">
          <div className="admin-profile mb-5">
            <div className="image-wrap">
              <div className="part-img rounded-circle overflow-hidden">
                <img src="/img/bg-img/admin.png" alt="admin" />
              </div>
              <button className="image-change">
                <i className="fa-light fa-camera"></i>
              </button>
            </div>
            <span className="admin-name">{name}</span>
            <span className="admin-role">Graphic Designer</span>
          </div>
        </div>
        <div className="col-lg-9">
          <div className="row g-3">
            <div className="col-sm-6">
              <div className="input-group">
                <span className="input-group-text">
                  <i className="fa-light fa-user"></i>
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>
            <div className="col-sm-6">
              <div className="input-group">
                <span className="input-group-text">
                  <i className="fa-light fa-at"></i>
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Username"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                />
              </div>
            </div>
            <div className="col-12">
              <textarea
                className="form-control h-150-p"
                placeholder="Biography"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
              ></textarea>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublicInfoSection;
