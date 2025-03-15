import { useState } from "react";
import Select from "react-select";
import { Option } from "../../../types";
import { useAppSelector } from "../../../redux/hooks";

// Updated pincode options with "All Pincodes"
const pincodeOptions: Option[] = [
  { value: "null", label: "All Pincodes" },
  { value: "600001", label: "600001" },
  { value: "400001", label: "400001" },
  { value: "700001", label: "700001" },
  { value: "110001", label: "110001" },
];

const PincodeOptions = ({
  onPincodeChange,
}: {
  onPincodeChange: (option: Option | null) => void;
}) => {
  const [pincode, setPincode] = useState<Option | null>(null);
  const darkMode = useAppSelector((state) => state.theme.isDark);

  const handleChange = (selectedOption: Option | null) => {
    setPincode(selectedOption);
    onPincodeChange(selectedOption);
  };

  return (
    <div>
      <Select
        options={pincodeOptions}
        className="ar-select"
        value={pincode}
        onChange={handleChange}
        placeholder="Select Pincode"
        styles={{
          control: (baseStyles) => ({
            ...baseStyles,
            backgroundColor: "transparent",
            color: darkMode ? "#c4c4c4" : "#222222",
            fontSize: 14,
            borderColor: darkMode ? "rgba(255, 255, 255, 0.12)" : "#dbeaea",
          }),
        }}
      />
    </div>
  );
};

export default PincodeOptions;
