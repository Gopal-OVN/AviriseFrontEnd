"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import { uploadPODAPI } from "../../../services/order-service";
import { useAtom } from "jotai";
import { selectedOrdersAtom } from "../../../redux/orderAtom";

export default function FileUploadComponent() {
  const [selectedOrders] = useAtom(selectedOrdersAtom);
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.length) {
      setFile(event.target.files[0]);
    }
  };

  const handleFileUpload = async () => {
    if (!file) {
      toast.error("Please select a file before uploading.");
      return;
    }

    const orderID = selectedOrders[0];
    if (!orderID) {
      toast.error("No selected order found.");
      return;
    }

    const fileData = new FormData();
    fileData.append("file", file);

    try {
      console.log("Uploading to API:", orderID, fileData);
      await uploadPODAPI(orderID, fileData);
      toast.success("File uploaded successfully");
      setFile(null);
    } catch (error: any) {
      console.error("File Upload Error:", error);
      toast.error(error.message || "Failed to upload file");
    }
  };

  return (
    <div>
      <h6>Upload Proof of Delivery</h6>
      <input type="file" className="form-control" onChange={handleFileChange} />

      <button
        onClick={handleFileUpload}
        className="btn btn-sm btn-primary mt-2"
        disabled={!file}
      >
        Upload
      </button>
    </div>
  );
}
