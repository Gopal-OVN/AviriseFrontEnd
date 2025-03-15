import DestinationOption from "../utils/dropdowns/DestionationOption";
import PincodeOptions from "../utils/dropdowns/PincodeOptions";
import WeightOption from "../utils/dropdowns/WeightOption";

const TableFilter4 = ({
  searchTerm,
  onSearchChange,
  onPincodeChange,
  onWeightChange,
  onDestination,
  showPincode,
  showWeight,
  showDestination,
}: any) => {
  return (
    <div className="table-filter-option">
      <div className="row g-3">
        <div className="col-12">
          <form className="row g-2 align-items-center">
            <div className="col-md-3 col-6">
              <input
                type="search"
                className="form-control ps-5 pe-5"
                placeholder="Search by Shipment ID"
                value={searchTerm}
                onChange={onSearchChange}
              />
            </div>

            {showPincode && (
              <div className="col-md-3 col-6">
                <PincodeOptions onPincodeChange={onPincodeChange} />
              </div>
            )}

            {showDestination && (
              <div className="col-md-3 col-6">
                <DestinationOption onDestination={onDestination} />
              </div>
            )}

            {showWeight && (
              <div className="col-md-3 col-6">
                <WeightOption onWeight={onWeightChange} />
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default TableFilter4;
