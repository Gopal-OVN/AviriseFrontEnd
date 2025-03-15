import { useState } from "react";
import Select from "react-select";
import { Option } from "../../../types";
import { useAppSelector } from "../../../redux/hooks";

// Updated destination options with "All Destinations"
const destinationOptions: Option[] = [
  { value: "all", label: "All Destinations" },
  { value: "Chennai", label: "Chennai" },
  { value: "Mumbai", label: "Mumbai" },
  { value: "Kolkata", label: "Kolkata" },
  { value: "Delhi", label: "Delhi" },
];

const DestinationOption = ({
  onDestination,
}: {
  onDestination: (option: Option | null) => void;
}) => {
  const [destination, setDestination] = useState<Option | null>(null);
  const darkMode = useAppSelector((state) => state.theme.isDark);

  const handleChange = (selectedOption: Option | null) => {
    setDestination(selectedOption);
    onDestination(selectedOption);
  };

  return (
    <div>
      <Select
        options={destinationOptions}
        className="ar-select"
        value={destination}
        onChange={handleChange}
        placeholder="Select Destination"
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

export default DestinationOption;
