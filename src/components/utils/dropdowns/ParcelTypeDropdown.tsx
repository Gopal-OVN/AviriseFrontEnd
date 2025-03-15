import { useEffect, useState } from "react";
import Select from "react-select";
import { toast } from "react-toastify";
import { useAppSelector } from "../../../redux/hooks";
import { getParcelTypeAPI } from "../../../services/parcelType-service";
import { Option } from "../../../types";

const ParcelTypeDropdown = ({
  setStatus,
  data,
  type,
  error,
}: {
  setStatus?: (status: Option | null) => void;
  data?: any; // Replace with your data type
  type?: "Create" | "Edit" | "View";
  error?: string;
}) => {
  const [statusList, setStatusList] = useState<Option[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<Option | null>(null);
  const darkMode = useAppSelector((state) => state.theme.isDark);

  useEffect(() => {
    const fetchParcelTypes = async () => {
      try {
        const response = await getParcelTypeAPI();

        setStatusList(
          response.map(
            ({
              parcel_id,
              parcel_name,
            }: {
              parcel_id: number;
              parcel_name: string;
            }) => ({
              value: parcel_id,
              label: parcel_name, // Concatenate parcel_name and last_name
            })
          )
        );
      } catch (error: any) {
        toast.error(error.message || "Error fetching parcel types");
      }
    };

    fetchParcelTypes();
  }, []);

  useEffect(() => {
    if (data?.parcel_type_id && statusList.length > 0) {
      const matchedParceltype = statusList.find(
        (state) => state.value === data.parcel_type_id
      );
      if (matchedParceltype) {
        setSelectedStatus(matchedParceltype);
      }
    }
  }, [data, statusList]);

  return (
    <div className="col-4">
      <label className="form-label">
        Parcel Type <span className="text-danger">*</span>
      </label>
      <Select
        options={statusList}
        value={selectedStatus}
        onChange={(selectedOption) => {
          setSelectedStatus(selectedOption);
          setStatus?.(selectedOption);
        }}
        placeholder="Select Parcel type"
        isDisabled={type === "View"}
        isClearable={true}
        styles={{
          control: (baseStyles) => ({
            ...baseStyles,
            backgroundColor: "transparent",
            color: darkMode ? "#c4c4c4" : "#222222",
            fontSize: 14,
            borderColor: darkMode ? "rgba(255, 255, 255, 0.12)" : "#222323",
          }),
        }}
      />
      {error && <p className="text-danger">{error}</p>}
    </div>
  );
};

export default ParcelTypeDropdown;
