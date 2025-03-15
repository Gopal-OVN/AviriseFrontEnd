"use client";

import { useState } from "react";
import ParcelTypeDropdown from "../../utils/dropdowns/ParcelTypeDropdown";
import { useForm } from "react-hook-form";

interface CreateRecipientInfoProps {
  data?: any;
  type?: "Create" | "Edit" | "View";
}

export default function RecipientInfoForm({
  data,
  type = "Create",
}: CreateRecipientInfoProps) {
  const [formData, setFormData] = useState({
    parcelType: "doc",
    isFragile: false,
    parcelWeight: "",
    parcelBoxes: "",
    unit: "cm",
    totalBoxSize: 0,
    totalVolume: 0,
    parcels: [
      { id: 1, boxCount: "", height: "", width: "", breadth: "", volume: 0 },
      { id: 2, boxCount: "", height: "", width: "", breadth: "", volume: 0 },
    ],
  });

  const methods = useForm<any>({
    // resolver: zodResolver(citySchema),
    defaultValues: data,
  });

  const {
    // handleSubmit,
    // register,
    formState: {},
    // control,
    setValue,
  } = methods;

  // Conversion factors for cubic volume
  const conversionFactors = {
    cm: 0.0000353147, // Cubic CM to Cubic Feet
    inch: 0.000578704, // Cubic Inches to Cubic Feet
    feet: 1, // Cubic Feet to Cubic Feet
  };

  // Handle form input changes
  const handleInputChange = (e: any) => {
    const { id, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: type === "checkbox" ? checked : value,
    }));
  };

  // Handle changes in the parcel list
  // const handleParcelChange = (index: any, field: any, value: any) => {
  //   const updatedParcels = [...formData.parcels];
  //   updatedParcels[index][field] = value;
  //   calculateVolume(updatedParcels);
  // };

  const handleParcelChange = (
    index: number,
    field: keyof (typeof formData.parcels)[0],
    value: string | number
  ) => {
    const updatedParcels = [...formData.parcels];
    updatedParcels[index] = { ...updatedParcels[index], [field]: value };
    calculateVolume(updatedParcels);
  };

  // Calculate total volume and box size
  const calculateVolume = (updatedParcels: any) => {
    let totalVolume = 0;
    let totalBoxSize = 0;
    const unitFactor =
      conversionFactors[formData.unit as keyof typeof conversionFactors];

    updatedParcels.forEach((parcel: any) => {
      const { boxCount, height, width, breadth } = parcel;
      const boxCountNum = parseFloat(boxCount) || 0;
      const heightNum = parseFloat(height) || 0;
      const widthNum = parseFloat(width) || 0;
      const breadthNum = parseFloat(breadth) || 0;

      const volume =
        heightNum * widthNum * breadthNum * boxCountNum * unitFactor;
      parcel.volume = volume.toFixed(2);

      totalVolume += volume;
      totalBoxSize += heightNum * widthNum * breadthNum * boxCountNum;
    });

    setFormData((prev: any) => ({
      ...prev,
      parcels: updatedParcels,
      totalVolume: totalVolume.toFixed(2),
      totalBoxSize: totalBoxSize.toFixed(2),
    }));
  };

  return (
    <div className="panel">
      <div className="panel-body">
        <div className="section">
          <h5>Parcel Dimension Details</h5>

          <div className="row mb-3">
            {/* Parcel type */}

            <ParcelTypeDropdown
              setStatus={(e: any) => setValue("parcel_id", e.value)}
              data={data}
              type={type}
            />

            {/* <div className="col-md-3">
              <label htmlFor="parcelType" className="form-label">
                Parcel Type:
              </label>
              <select
                id="parcelType"
                className="form-select"
                value={formData.parcelType}
                onChange={handleInputChange}
                required
              >
                <option value="doc">Document</option>
                <option value="parcel">Parcel</option>
              </select>
            </div> */}

            <div className="col-md-3">
              <label htmlFor="isFragile" className="form-label">
                Is Fragile:
              </label>
              <div className="form-check mt-2">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="isFragile"
                  checked={formData.isFragile}
                  onChange={handleInputChange}
                />
                <label className="form-check-label" htmlFor="isFragile">
                  Yes
                </label>
              </div>
            </div>

            <div className="col-md-3">
              <label htmlFor="parcelWeight" className="form-label">
                Parcel Weight:
              </label>
              <input
                type="text"
                id="parcelWeight"
                className="form-control"
                placeholder="Ex: 100 Kgs"
                value={formData.parcelWeight}
                onChange={handleInputChange}
              />
            </div>

            <div className="col-md-3">
              <label htmlFor="parcelBoxes" className="form-label">
                No of Boxes:
              </label>
              <input
                type="text"
                id="parcelBoxes"
                className="form-control"
                placeholder="Ex: 10"
                value={formData.parcelBoxes}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <h6>Parcel Dimension Details</h6>

          <div className="d-flex align-items-center mb-3">
            <label htmlFor="unit" className="me-3">
              Select Dimensions in:
            </label>
            <select
              id="unit"
              className="form-select w-auto me-3"
              value={formData.unit}
              onChange={handleInputChange}
            >
              <option value="cm">CM</option>
              <option value="inch">INCH</option>
              <option value="feet">FEET</option>
            </select>

            <label htmlFor="totalBoxSize" className="me-2">
              Total Size of All Boxes:
            </label>
            <input
              type="text"
              id="totalBoxSize"
              className="form-control w-auto"
              readOnly
              value={formData.totalBoxSize}
            />
          </div>

          <table className="table table-bordered text-center">
            <thead className="table-light">
              <tr>
                <th>S.No</th>
                <th>No of Boxes</th>
                <th>Parcel Dimensions (H x W x B)</th>
                <th>Total Volume (Cubic Feet)</th>
              </tr>
            </thead>
            <tbody>
              {formData.parcels.map((parcel, index) => (
                <tr key={parcel.id}>
                  <td>{index + 1}</td>
                  <td>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="No of Boxes"
                      value={parcel.boxCount}
                      onChange={(e) =>
                        handleParcelChange(index, "boxCount", e.target.value)
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      className="form-control d-inline-block w-25"
                      placeholder="H"
                      value={parcel.height}
                      onChange={(e) =>
                        handleParcelChange(index, "height", e.target.value)
                      }
                    />
                    <input
                      type="number"
                      className="form-control d-inline-block w-25"
                      placeholder="W"
                      value={parcel.width}
                      onChange={(e) =>
                        handleParcelChange(index, "width", e.target.value)
                      }
                    />
                    <input
                      type="number"
                      className="form-control d-inline-block w-25"
                      placeholder="B"
                      value={parcel.breadth}
                      onChange={(e) =>
                        handleParcelChange(index, "breadth", e.target.value)
                      }
                    />
                  </td>
                  <td>{parcel.volume}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="mt-3">
            <strong>Total Volume (Cubic Feet):</strong>{" "}
            <span>{formData.totalVolume}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
