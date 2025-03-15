"use client";

import { useFormContext } from "react-hook-form";
import CustomerDropdown from "../../utils/dropdowns/CustomerDropdown";
import PaymentModeDropdown from "../../utils/dropdowns/PaymentModeDropdown";
import ServiceTypeDropdown from "../../utils/dropdowns/ServiceTypeDropdown";

export default function BookingInfoForm({ data, type, errors }: any) {
  const { setValue, watch, register } = useFormContext();

  const docketType = watch("docketType", "online");
  // const docket_no = watch("docket_no", "");
  const manual_docket = watch("manual_docket", "");
  const paymentType = watch("paymentType", "CLIENT_PAYMENT");
  const cod_amount = watch("cod_amount");

  const handleInputChange =
    (fieldName: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(fieldName, e.target.value);
    };

  return (
    <div className="panel ">
      <div className="panel-body">
        <div className="row g-3">
          {/* Docket Type */}
          <div className="col-xxl-6 col-lg-6 col-sm-12">
            <label className="form-label">Docket No:</label>
            <div className="d-flex align-items-center">
              <div className="form-check me-2">
                <input
                  min="0"
                  className="form-check-input"
                  type="radio"
                  name="docketType"
                  value="online"
                  checked={docketType === "online"}
                  onChange={handleInputChange("docketType")}
                />
                <label className="form-check-label">Online</label>
              </div>
              <div className="form-check me-2">
                <input
                  className="form-check-input"
                  type="radio"
                  name="docketType"
                  value="offline"
                  checked={docketType === "offline"}
                  onChange={handleInputChange("docketType")}
                />
                <label className="form-check-label">Manual</label>
              </div>
              <input
                type="text"
                name="manual_docket"
                className="form-control"
                placeholder="Ex: AVX2021100987"
                disabled={docketType === "online"}
                value={manual_docket}
                onChange={handleInputChange("manual_docket")}
              />
            </div>
          </div>

          {/* Payment Type */}
          <div className="col-xxl-6 col-lg-6 col-sm-12">
            <label className="form-label">Payment Type:</label>
            <div className="d-flex align-items-center">
              <div className="form-check me-2">
                <input
                  {...register("payment_type")}
                  className="form-check-input"
                  type="radio"
                  name="paymentType"
                  value="CLIENT_PAYMENT"
                  checked={paymentType === "CLIENT_PAYMENT"}
                  onChange={handleInputChange("paymentType")}
                />
                <label className="form-check-label">Client Payment</label>
              </div>
              <div className="form-check me-2">
                <input
                  {...register("payment_type")}
                  className="form-check-input"
                  type="radio"
                  name="paymentType"
                  value="cod"
                  checked={paymentType === "cod"}
                  onChange={handleInputChange("paymentType")}
                />

                <label className="form-check-label">Cash on Delivery</label>
              </div>
              <input
                {...register("code_amount", {
                  valueAsNumber: true,
                })}
                className="form-control ms-3"
                placeholder="Enter COD Amount"
                disabled={paymentType !== "cod"}
              />
              {errors.code_amount && (
                <p className="text-danger">{errors.code_amount.message}</p>
              )}
            </div>
          </div>

          <ServiceTypeDropdown
            setStatus={(e: any) =>
              setValue("service_type_id", e.value ?? undefined, {
                shouldValidate: true,
              })
            }
            data={data}
            type={type}
            errors={errors?.service_type_id?.message}
          />

          <PaymentModeDropdown
            setStatus={(e: any) =>
              setValue("payment_mode_id", e.value ?? undefined, {
                shouldValidate: true,
              })
            }
            data={data}
            type={type}
            error={errors?.payment_mode_id?.message}
          />

          <CustomerDropdown
            setStatus={(e: any) =>
              setValue("customer_id", e.value ?? undefined, {
                shouldValidate: true,
              })
            }
            data={data}
            type={type}
            error={errors?.customer_id?.message}
          />

          <div className="col-4">
            <label className="form-label" htmlFor="gst_number">
              GST No:
            </label>
            <input
              {...register("gst_number", {
                valueAsNumber: true,
              })}
              className="form-control"
              disabled={type === "View"}
            />
            {errors.gst_number && (
              <p className="text-danger">{errors.gst_number.message}</p>
            )}
          </div>

          <div className="col-md-4">
            <label htmlFor="shipment_value" className="form-label">
              Shipment Value:
            </label>
            <input
              {...register("shipment_value", {
                valueAsNumber: true,
              })}
              className="form-control"
              disabled={type === "View"}
            />
            {errors.shipment_value && (
              <p className="text-danger">{errors.shipment_value.message}</p>
            )}
          </div>

          <div className="col-md-4">
            <label className="form-label">E-Way Bill No:</label>
            <input
              type="number"
              {...register("e_way_bill", {
                valueAsNumber: true, // Automatically parse input as number
              })}
              disabled={type === "View"}
              className="form-control"
            />
            {errors.e_way_bill && (
              <p className="text-danger">{errors.e_way_bill.message}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
