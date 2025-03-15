"use client";

import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";

export default function CustomDimension({ data, errors }: any) {
  const { setValue, register } = useFormContext();

  console.log("datasss", data);

  const [formData, setFormData] = useState({
    total_volume: 0,
    total_box_size: 0,
    dimension_type: "CM",
    total_no_of_box: 1,
    order_items: [
      {
        number_of_box: 0,
        parcel_hight: 0,
        parcel_width: 0,
        parcel_breadth: 0,
        volume: 0,
      },
    ],
  });

  const conversionFactors = {
    CM: 0.0000353147,
    INCH: 0.000578704,
    FEET: 1,
  };

  const handleInputChange = (e: any) => {
    const { id, value } = e.target;
    if (id === "dimension_type") {
      setFormData((prev) => {
        const updatedForm = { ...prev, dimension_type: value };
        calculateVolume(updatedForm.order_items, value); // Recalculate volume
        return updatedForm;
      });
      setValue("dimension_type", value);
    } else {
      setFormData((prev) => ({ ...prev, [id]: Number(value) }));
      setValue(id, Number(value));
    }
  };

  const handleParcelChange = (index: any, field: any, value: any) => {
    let updatedParcels = [...formData.order_items];
    updatedParcels[index] = {
      ...updatedParcels[index],
      [field]: Number(value),
    };

    const totalBoxes = updatedParcels.reduce(
      (sum, p) => sum + (p.number_of_box || 0),
      0
    );
    if (totalBoxes > formData.total_no_of_box) return;

    calculateVolume(updatedParcels);

    // const hasEmptyBoxCount = updatedParcels.some(
    //   (parcel) => parcel.number_of_box == ""
    // );
    const currentRowFilled =
      updatedParcels[index].parcel_hight &&
      updatedParcels[index].parcel_width &&
      updatedParcels[index].parcel_breadth &&
      updatedParcels[index].number_of_box;

    // Check if an empty row already exists (a row where all fields are 0 or empty)
    const hasEmptyRow = updatedParcels.some(
      (parcel) =>
        !parcel.parcel_hight ||
        !parcel.parcel_width ||
        !parcel.parcel_breadth ||
        !parcel.number_of_box
    );
    // Add new row only if the current row is filled, no row exists already, and total boxes are still below the max

    if (
      currentRowFilled &&
      totalBoxes < formData.total_no_of_box &&
      updatedParcels.length < formData.total_no_of_box &&
      !hasEmptyRow
    ) {
      updatedParcels.push({
        number_of_box: 0,
        parcel_hight: 0,
        parcel_width: 0,
        parcel_breadth: 0,
        volume: 0,
      });
    }

    if (totalBoxes === formData.total_no_of_box) {
      updatedParcels = updatedParcels.filter((parcel) => parcel.number_of_box);
    }

    setFormData((prev) => ({ ...prev, order_items: updatedParcels }));
    setValue("order_items", updatedParcels);
  };

  const calculateVolume = (
    updatedParcels: any,
    dimensionType = formData.dimension_type
  ) => {
    let total_volume = 0;
    let total_box_size = 0;
    // const unitFactor = conversionFactors[dimensionType];
    const unitFactor =
      conversionFactors[dimensionType as keyof typeof conversionFactors];

    updatedParcels.forEach((parcel: any) => {
      const { number_of_box, parcel_hight, parcel_width, parcel_breadth } =
        parcel;
      const volume =
        (parseFloat(parcel_hight) || 0) *
        (parseFloat(parcel_width) || 0) *
        (parseFloat(parcel_breadth) || 0) *
        (parseFloat(number_of_box) || 0) *
        unitFactor;
      parcel.volume = parseFloat(volume.toFixed(2));

      total_volume += volume;
      total_box_size +=
        (parseFloat(parcel_hight) || 0) *
        (parseFloat(parcel_width) || 0) *
        (parseFloat(parcel_breadth) || 0) *
        (parseFloat(number_of_box) || 0);
    });

    setFormData((prev: any) => ({
      ...prev,
      total_volume: total_volume.toFixed(2),
      total_box_size: total_box_size.toFixed(2),
      order_items: updatedParcels,
    }));
    setValue("total_volume", parseFloat(total_volume.toFixed(2)));
    setValue("total_box_size", parseFloat(total_box_size.toFixed(2)));
  };

  useEffect(() => {
    if (data?.order_item) {
      setFormData((prev) => ({ ...prev, order_items: [...data.order_item] }));
      setValue("order_items", [...data.order_item]); // Ensure react-hook-form is updated
    }
  }, [data, setValue]);

  return (
    <div>
      <div className="row mb-3">
        <div className="col-md-4">
          <label htmlFor="total_no_of_box" >
            No of Boxes:
          </label>
          <input
            {...register("total_no_of_box", {
              valueAsNumber: true,
            })}
            id="total_no_of_box"
            className="form-control"
            placeholder="Ex: 10"
            onChange={handleInputChange}
          />
          {errors?.total_no_of_box && (
            <p className="text-danger">{errors?.total_no_of_box.message}</p>
          )}
        </div>

        <div className="col-md-4">
          <label htmlFor="dimension_type">Select Dimensions in:</label>
          <select
            {...register("dimension_type")}
            id="dimension_type"
            className="form-select  me-3"
            value={formData.dimension_type}
            onChange={handleInputChange}
          >
            <option value="CM">CM</option>
            <option value="INCH">INCH</option>
            <option value="FEET">FEET</option>
          </select>
          {errors.dimension_type && (
            <p className="text-danger">{errors.dimension_type.message}</p>
          )}
        </div>

        <div className="col-md-4">
          <label htmlFor="total_box_size" className="me-2">
            Total Size of All Boxes:
          </label>
          <input
            {...register("total_box_size")}
            id="total_box_size"
            className="form-control"
            readOnly
          />
        </div>
      </div>

      <div className="table-responsive">
        <table className="table table-bordered text-center">
          <thead className="table-light ">
            <tr>
              <th>S.No</th>
              <th>No of Boxes</th>
              <th>Parcel Dimensions (H x W x B)</th>
              <th>Total Volume (Cubic Feet)</th>
            </tr>
          </thead>
          <tbody>
            {formData.order_items.map((parcel: any, index: any) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>
                  <input
                    {...register(`order_items.${index}.number_of_box`, {
                      valueAsNumber: true,
                    })}
                    className="form-control"
                    placeholder="No of Boxes"
                    value={parcel.number_of_box}
                    onChange={(e) =>
                      handleParcelChange(index, "number_of_box", e.target.value)
                    }
                  />
                  {errors?.order_items?.[index]?.number_of_box && (
                    <p className="text-danger">
                      {errors.order_items[index].number_of_box.message}
                    </p>
                  )}
                </td>

                <td>
                  <input
                    {...register(`order_items.${index}.parcel_hight`, {
                      valueAsNumber: true,
                    })}
                    className="form-control d-inline-block w-25 me-2"
                    placeholder="H"
                    value={parcel.parcel_hight}
                    onChange={(e) =>
                      handleParcelChange(index, "parcel_hight", e.target.value)
                    }
                  />
                  {errors?.order_items?.[index]?.parcel_hight && (
                    <p className="text-danger">
                      {errors.order_items[index].parcel_hight.message}
                    </p>
                  )}

                  <input
                    {...register(`order_items.${index}.parcel_width`, {
                      valueAsNumber: true,
                    })}
                    className="form-control d-inline-block w-25 me-2"
                    placeholder="W"
                    value={parcel.parcel_width}
                    onChange={(e) =>
                      handleParcelChange(index, "parcel_width", e.target.value)
                    }
                  />
                  {errors?.order_items?.[index]?.parcel_width && (
                    <p className="text-danger">
                      {errors.order_items[index].parcel_width.message}
                    </p>
                  )}

                  <input
                    {...register(`order_items.${index}.parcel_breadth`, {
                      valueAsNumber: true,
                    })}
                    className="form-control d-inline-block w-25 me-2"
                    placeholder="B"
                    value={parcel.parcel_breadth}
                    onChange={(e) =>
                      handleParcelChange(
                        index,
                        "parcel_breadth",
                        e.target.value
                      )
                    }
                  />
                  {errors?.order_items?.[index]?.parcel_breadth && (
                    <p className="text-danger">
                      {errors.order_items[index].parcel_breadth.message}
                    </p>
                  )}
                </td>
                <td>{parcel.volume}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-3">
        <strong>Total Volume (Cubic Feet):</strong>{" "}
        <span>{formData.total_volume}</span>
      </div>
    </div>
  );
}
