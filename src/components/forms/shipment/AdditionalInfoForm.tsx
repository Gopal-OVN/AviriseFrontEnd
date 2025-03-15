"use client";

import { useFormContext } from "react-hook-form";

export default function AdditionalInfoForm() {
  const { setValue, watch } = useFormContext();

  const handleNumberChange =
    (name: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setValue(name, value === "" ? "" : Number(value) || "");
    };

  return (
    <div className="container bg-white p-4 mt-4 shadow rounded">
      <div className="section">
        <div className="row mb-3">
          <div className="col-md-4">
            <label htmlFor="invoice_no" className="form-label">
              Invoice No:
            </label>
            <input
              type="number"
              id="invoice_no"
              className="form-control"
              placeholder="Ex: 1092390"
              value={watch("invoice_no") || ""}
              onChange={handleNumberChange("invoice_no")}
            />
          </div>

          {/* <div className="col-md-4">
            <label htmlFor="shipment_value" className="form-label">
              Shipment Value:
            </label>
            <input
              type="number"
              id="shipment_value"
              className="form-control"
              placeholder="Ex: 375000"
              value={watch("shipment_value") || ""}
              onChange={handleNumberChange("shipment_value")}
            />
          </div>
          <div className="col-md-4">
            <label htmlFor="e_way_bill" className="form-label">
              E-Way Bill No:
            </label>
            <input
              type="number"
              id="e_way_bill"
              className="form-control"
              placeholder="Ex: 0987888788788788"
              value={watch("e_way_bill") || ""}
              onChange={handleNumberChange("e_way_bill")}
            />
          </div> */}
        </div>

        <div className="row mb-3">
          <div className="col-md-6">
            <label htmlFor="forwarding" className="form-label">
              Forwarding:
            </label>
            <input
              type="number"
              id="forwarding"
              className="form-control"
              placeholder="Ex: 9878"
              value={watch("forwarding") || ""}
              onChange={handleNumberChange("forwarding")}
            />
          </div>
          {/* <div className="col-md-6">
            <label htmlFor="booking_instruction" className="form-label">
              Booking Instructions:
            </label>
            <input
              type="number"
              id="booking_instruction"
              className="form-control"
              placeholder="Ex: 12345"
              value={watch("booking_instruction") || ""}
              onChange={handleNumberChange("booking_instruction")}
            />
          </div> */}
        </div>
      </div>
    </div>
  );
}
