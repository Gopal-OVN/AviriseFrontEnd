"use client";

import { useFormContext } from "react-hook-form";
import ParcelTypeDropdown from "../../utils/dropdowns/ParcelTypeDropdown";

export default function OrderItemForm({ data, type, errors }: any) {
  const { register, setValue } = useFormContext();

  return (
    <div className="section">
      <h5>Parcel Dimension Details</h5>

      <div className="row mb-4">
        <ParcelTypeDropdown
          setStatus={(e: any) => setValue("parcel_type_id", e.value)}
          data={data}
          type={type}
          error={errors?.parcel_type_id?.message}
        />

        <div className="col-md-4">
          <label htmlFor="isFragile" className="form-label">
            Is Fragile:
          </label>
          <div className="form-check mt-2">
            <input
              {...register("is_fragile")}
              className="form-check-input"
              type="checkbox"
              id="isFragile"
            />
            <label className="form-check-label" htmlFor="isFragile">
              Yes
            </label>
          </div>
        </div>

        <div className="col-md-4">
          <label htmlFor="parcelWeight" className="form-label">
            Parcel Weight:
          </label>
          <input
            {...register("parcel_weight", { valueAsNumber: true })}
            className="form-control"
            placeholder="Enter total weight"
          />

          {errors?.parcel_weight && (
            <p className="text-danger">{errors.parcel_weight.message}</p>
          )}
        </div>
      </div>
    </div>
  );
}
