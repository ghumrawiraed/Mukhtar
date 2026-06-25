const fs = require("fs");
const { PDFDocument, rgb } = require("pdf-lib");
const fontkit = require("@pdf-lib/fontkit");
const { drawRTL, drawLTR } = require("./pdfHelper");

module.exports = async function EmployeeInfoFormReport(data, est) {
  const existingPdfBytes = fs.readFileSync("./templates/R4.pdf");
  const pdfDoc = await PDFDocument.load(existingPdfBytes);

  pdfDoc.registerFontkit(fontkit);
  pdfDoc.setTitle("R4");
  const fontBytes = fs.readFileSync("./fonts/Amiri-Bold.ttf");
  const arabicFont = await pdfDoc.embedFont(fontBytes);

  const pages = pdfDoc.getPages();
  const page = pages[0];
  const FSC = {
    font: arabicFont,
    size: 14,
    color: rgb(0, 0, 1),
  };
  
  drawRTL(page, data.emp.nssf_no, 250, 625, FSC);
  drawRTL(
    page,
    data.emp.first_name + " " + data.emp.family_name,
    490,
    600,
    FSC,
  );
  drawRTL(page, data.emp.mother_name, 240, 600, FSC);
  drawRTL(page, data.emp.middle_name, 500, 570, FSC);  
  drawRTL(page, est.est_name, 460, 550, FSC);
  drawRTL(page, est.est_number, 240, 545, FSC);
  drawRTL(page, est.address, 500, 515, FSC);

  

  drawRTL(page, est.manager, 260, 290, FSC);
  drawRTL(
    page,
    new Date(data.bayan_date).toLocaleDateString("en-GB"),
    410,
    290,
    FSC,
  );

  const pdfBytes = await pdfDoc.save();
  return pdfBytes;
};
