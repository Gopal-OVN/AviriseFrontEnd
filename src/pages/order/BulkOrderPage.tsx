import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { toast } from "react-toastify";
import * as XLSX from "xlsx";

const BulkOrderPage = () => {
  const [orders, setOrders] = useState([]);

  const onDrop = (acceptedFiles: any) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();

    reader.onload = (e: any) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const parsedData = XLSX.utils.sheet_to_json(sheet);
      setOrders(parsedData);
    };

    reader.readAsArrayBuffer(file);
  };

  const handleUpload = () => {
    console.log("Uploading Orders:", orders);
    toast.success("Uploading Successfull");
    // Send data to backend
    // fetch('/api/bulk-order', { method: 'POST', body: JSON.stringify(orders) })
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: ".xls, .xlsx",
  });

  return (
    <div className="panel">
      <div className="panel-body">
        <div
          {...getRootProps()}
          className="border-2 border-dashed p-6 text-center cursor-pointer"
        >
          <i className="fa-light fa-cloud-arrow-up fa-3x"></i>
          <input
            {...getInputProps()}
            className="dropzone dz-component dz-default dz-message "
          />
          <h6>Drag & drop an Excel file here, or click to select one</h6>
        </div>

        {orders.length > 0 && (
          <>
            <div className="d-flex justify-content-end me-4 mt-4">
              <button onClick={handleUpload} className="btn btn-sm btn-primary">
                Upload Orders
              </button>
            </div>
            <div className="panel-body table-responsive">
              <table className="table table-dashed table-hover digi-dataTable all-product-table">
                <thead>
                  <tr>
                    {Object.keys(orders[0]).map((key) => (
                      <th key={key} className="border p-2">
                        {key}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order, index) => (
                    <tr key={index} className="border">
                      {Object.values(order).map((value: any, i) => (
                        <td key={i} className="border p-2">
                          {value}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default BulkOrderPage;
