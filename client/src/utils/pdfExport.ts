import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export async function exportCVToPDF(element: HTMLElement, fileName: string = "CV.pdf"): Promise<boolean> {
  try {
    // Force scale of 2 for sharp text rendering
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: "#ffffff",
      windowWidth: 1200,
    });

    const imgData = canvas.toDataURL("image/jpeg", 0.98);
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    const pdfWidth = pdf.internal.pageSize.getWidth(); // 210mm
    const pdfHeight = pdf.internal.pageSize.getHeight(); // 297mm

    const imgProps = pdf.getImageProperties(imgData);
    const renderedHeight = (imgProps.height * pdfWidth) / imgProps.width;

    let heightLeft = renderedHeight;
    let position = 0;

    // First page
    pdf.addImage(imgData, "JPEG", 0, position, pdfWidth, renderedHeight, undefined, "FAST");
    heightLeft -= pdfHeight;

    // Additional pages if needed
    while (heightLeft > 0) {
      position = heightLeft - renderedHeight;
      pdf.addPage();
      pdf.addImage(imgData, "JPEG", 0, position, pdfWidth, renderedHeight, undefined, "FAST");
      heightLeft -= pdfHeight;
    }

    const cleanFileName = fileName.endsWith(".pdf") ? fileName : `${fileName}.pdf`;
    pdf.save(cleanFileName);
    return true;
  } catch (error) {
    console.error("PDF export failed:", error);
    return false;
  }
}
