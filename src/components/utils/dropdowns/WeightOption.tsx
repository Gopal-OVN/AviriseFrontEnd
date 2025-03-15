import { useState } from "react";
import Select from "react-select";
import { Option } from "../../../types";
import { useAppSelector } from "../../../redux/hooks";

// Updated pincode options with "All Pincodes"
const weightOptions: Option[] = [
  { value: "null", label: "All Weights" },
  { value: "200 kg", label: "200 kg" },
  { value: "150 kg", label: "50 kg" },
  { value: "250 kg", label: "250 kg" },
  { value: "410 kg", label: "410 kg" },
  { value: "320 kg", label: "320 kg" },
];

const WeightOption = ({
  onWeight,
}: {
  onWeight: (option: Option | null) => void;
}) => {
  const [pincode, setPincode] = useState<Option | null>(null);
  const darkMode = useAppSelector((state) => state.theme.isDark);

  const handleChange = (selectedOption: Option | null) => {
    setPincode(selectedOption);
    onWeight(selectedOption);
  };

  return (
    <div>
      <Select
        options={weightOptions}
        className="ar-select"
        value={pincode}
        onChange={handleChange}
        placeholder="Select Weight"
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

export default WeightOption;
