import { useEffect, useRef, useState } from "react";
import JsBarcode from "jsbarcode";
import Select from "react-select";
import { jsPDF } from "jspdf";
import { Option, OrderDataType } from "../../../types";
import { useAppSelector } from "../../../redux/hooks";
import html2canvas from "html2canvas";
import QRCode from "qrcode";

const reportOptions: Option[] = [
  { value: "AWB", label: "Docket" },
  // { value: "Performa", label: "Performa" },
  { value: "Label", label: "Label 4x6" },
  { value: "Label 3x2", label: "Label 3x2" },

  // { value: "Packing List", label: "Packing List" },
];

type ReportOptionProps = {
  orderId: string;
  orderData: OrderDataType;

  setLoading: (loading: boolean) => void;
};

const ReportOption = ({
  // orderId,
  orderData,
  setLoading,
}: ReportOptionProps) => {
  const [report, setReport] = useState<Option | null>(null);
  const barcodeRef = useRef<HTMLCanvasElement>(null);
  // const qrcodeRef = useRef<HTMLCanvasElement>(null);
  const darkMode = useAppSelector((state) => state.theme.isDark);

  useEffect(() => {
    if (barcodeRef.current) {
      JsBarcode(barcodeRef.current, orderData.order_id, {
        format: "CODE128",
        lineColor: "#000",
        width: 2,
        height: 40,
        displayValue: true,
      });
    }
  }, [orderData.order_id]);

  const handleReportSelection = async (selectedOption: Option | null) => {
    setReport(selectedOption);
    if (selectedOption?.value === "AWB" || selectedOption?.value === "Label") {
      setLoading(true);
      await generatePDF(orderData, selectedOption.value);
      setLoading(true);
    }
    setLoading(false);
  };

  const generatePDF = async (data: OrderDataType, reportType: string) => {
    const templatePath =
      reportType === "AWB"
        ? "/templates/awb-template.html"
        : "/templates/label-template.html";

    const template = await fetch(templatePath).then((res) => res.text());

    const docketNo = String(data.docket_no);
    const gstNumber = String(data.gst_number);
    const invoiceNo = String(data.invoice_no);
    const eWayBill = String(data.e_way_bill);
    const forwarding = String(data.forwarding);
    const shipmentValue = String(data.shipment_value);

    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = template
      .replace(/{{orderId}}/g, data.order_id)

      .replace(/{{orderId}}/g, data.order_id)
      .replace(/{{date}}/g, new Date().toISOString().split("T")[0])
      .replace(/{{sender_name}}/g, data.customer_name) // Assuming sender_name is stored in sender_address_book
      .replace(/{{receiver_name}}/g, data.receiver_company_name) // Assuming receiver_name is stored in receiver_address_book
      .replace(/{{sender_address}}/g, data.sender_company_name) // You can use `sender_address_book` directly if it's the address
      .replace(/{{receiver_address}}/g, data.receiver_company_name) // Same for receiver
      .replace(/{{parcel_type_name}}/g, data.parcel_type_name)
      .replace(/{{payment_mode_name}}/g, data.payment_mode_name)
      .replace(
        /{{parcel_weight}}/g,
        data.parcel_weight != null ? data.parcel_weight.toString() : "N/A"
      )
      .replace(/{{docket_no}}/g, docketNo)
      .replace(/{{gst_number}}/g, gstNumber)
      .replace(/{{invoice_no}}/g, invoiceNo)
      .replace(/{{e_way_bill}}/g, eWayBill)
      .replace(/{{forwarding}}/g, forwarding)
      .replace(/{{booking_instruction}}/g, data.booking_instruction)
      .replace(/{{shipment_value}}/g, shipmentValue);

    if (reportType === "AWB" && barcodeRef.current) {
      // Generate Barcode
      const docketUrl = `${data.docket_no}`;

      JsBarcode(barcodeRef.current, docketUrl, {
        format: "CODE128",
        lineColor: "#000",
        width: 2,
        height: 40,
        displayValue: false,
      });

      const barcodeImage = barcodeRef.current.toDataURL("image/png");
      tempDiv.querySelectorAll(".barcode-container").forEach((container) => {
        container.innerHTML = `
        <img src="${barcodeImage}" alt="Barcode" />
        <div class="docket-number">${data.docket_no}</div>
      `;
      });
    }

    if (reportType == "Label") {
      try {
        const docketUrl = `http://127.0.0.1:8000/orders/confirm-pickup/${data.docket_no}`;

        const qrCodeDataUrl = await QRCode.toDataURL(docketUrl, {
          errorCorrectionLevel: "H",
        });

        console.error("QR Code Generation URl", qrCodeDataUrl);

        tempDiv.querySelectorAll(".qr-container").forEach((container) => {
          container.innerHTML = `<img src="${qrCodeDataUrl}" alt="QR Code" />
          <div >${data.docket_no}</div>`;
        });
      } catch (error) {
        console.error("QR Code Generation Error:", error);
      }
    }

    await new Promise((resolve) => setTimeout(resolve, 50));

    document.body.appendChild(tempDiv);
    const canvas = await html2canvas(tempDiv, { scale: 2, useCORS: true });
    document.body.removeChild(tempDiv);

    const imgData = canvas.toDataURL("image/png");
    const doc = new jsPDF("p", "mm", "a4");

    const imgWidth = doc.internal.pageSize.getWidth();
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    doc.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);

    const pdfBlob = doc.output("blob");
    const pdfUrl = URL.createObjectURL(pdfBlob);
    window.open(pdfUrl, "_blank");
  };
  return (
    <div>
      <Select
        options={reportOptions}
        className="ar-select"
        value={report}
        onChange={handleReportSelection}
        placeholder="Select Report"
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
      <canvas ref={barcodeRef} style={{ display: "none" }} />
    </div>
  );
};

export default ReportOption;
