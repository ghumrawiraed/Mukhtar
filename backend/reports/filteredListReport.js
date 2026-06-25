const { PDFDocument, rgb, degrees } = require("pdf-lib");
const fontkit = require("@pdf-lib/fontkit");
const ArabicReshaper = require("arabic-reshaper");
const fs = require("fs");

module.exports = async function filteredListReport(
  data,
  est,
  reportTitle,
  columns,
) {
  const pdfDoc = await PDFDocument.create();
  pdfDoc.registerFontkit(fontkit);

  const fontBytes = fs.readFileSync("./fonts/Amiri-Bold.ttf");
  const arabicFont = await pdfDoc.embedFont(fontBytes);

  const fontBytesBold = fs.readFileSync("./fonts/Amiri-Bold.ttf");
  const arabicFontBold = await pdfDoc.embedFont(fontBytesBold);

  const fontSize = 10;
  const headerSize = 14;
  const titleSize = 12;

  const pageWidth = 595; // A4 width in points
  const pageHeight = 842; // A4 height in points
  const margin = 30;
  const contentWidth = pageWidth - 2 * margin;

  let page = pdfDoc.addPage([pageWidth, pageHeight]);

  let yPosition = pageHeight - margin;

  // Helper function to draw RTL text
  function drawRTLText(txt, rightX, y, options = {}) {
    const {
      font = arabicFont,
      size = fontSize,
      color = rgb(0, 0, 0),
    } = options;

    const reshaped = ArabicReshaper.convertArabic(String(txt || ""));
    const width = font.widthOfTextAtSize(reshaped, size);
    const x = rightX - width;

    page.drawText(reshaped, {
      x: Math.max(x, margin),
      y,
      size,
      font,
      color,
    });

    return size + 2;
  }

  // Helper function to draw LTR text
  function drawLTRText(txt, x, y, options = {}) {
    const {
      font = arabicFont,
      size = fontSize,
      color = rgb(0, 0, 0),
    } = options;

    const reshaped = ArabicReshaper.convertArabic(String(txt || ""));

    page.drawText(reshaped, {
      x,
      y,
      size,
      font,
      color,
    });

    return size + 2;
  }

  // Helper function to check if we need a new page
  function checkNewPage(requiredHeight) {
    if (yPosition - requiredHeight < margin) {
      page = pdfDoc.addPage([pageWidth, pageHeight]);
      yPosition = pageHeight - margin;

      // Draw footer on previous page
      drawPageFooter(pdfDoc.getPageCount() - 1);
    }
  }

  // Draw page footer
  function drawPageFooter(pageIndex) {
    const footerPage = pdfDoc.getPage(pageIndex);
    const footerText = ArabicReshaper.convertArabic(`الصفحة ${pageIndex + 1}`);
    footerPage.drawText(footerText, {
      x: pageWidth / 2 - arabicFont.widthOfTextAtSize(footerText, 8) / 2,
      y: margin - 20,
      size: 8,
      font: arabicFont,
      color: rgb(0.5, 0.5, 0.5),
    });
  }

  // Draw header with establishment info
  const estName = est?.est_name || "المؤسسة غير محددة";
  yPosition -= drawRTLText(estName, pageWidth - margin, yPosition, {
    font: arabicFontBold,
    size: headerSize,
  });

  // Draw title
  yPosition -= 5;
  yPosition -= drawRTLText(reportTitle, pageWidth - margin, yPosition, {
    font: arabicFontBold,
    size: titleSize,
  });

  // Draw date generated
  const now = new Date().toLocaleDateString("ar-SA");
  yPosition -= 5;
  yPosition -= drawRTLText(
    `تاريخ التقرير: ${now}`,
    pageWidth - margin,
    yPosition,
    {
      size: 9,
    },
  );

  yPosition -= 10;

  // Draw table header
  const rowHeight = 20;
  const columnPadding = 5;

  // Calculate column widths based on number of columns
  const columnWidth = contentWidth / columns.length;

  // Draw table header background
  checkNewPage(rowHeight + 10);

  page.drawRectangle({
    x: margin,
    y: yPosition - rowHeight,
    width: contentWidth,
    height: rowHeight,
    color: rgb(0.2, 0.2, 0.2),
  });

  // Draw column headers
  let headerX = pageWidth - margin;
  columns.forEach((col) => {
    const headerText = ArabicReshaper.convertArabic(col.label);
    const textWidth = arabicFontBold.widthOfTextAtSize(headerText, 9);
    const colX = headerX - textWidth - columnPadding;

    page.drawText(headerText, {
      x: Math.max(colX, margin),
      y: yPosition - rowHeight + 5,
      size: 9,
      font: arabicFontBold,
      color: rgb(1, 1, 1),
    });

    headerX -= columnWidth;
  });

  yPosition -= rowHeight + 5;

  // Draw table data rows
  data.forEach((row, rowIndex) => {
    checkNewPage(rowHeight);

    // Draw row border
    page.drawRectangle({
      x: margin,
      y: yPosition - rowHeight,
      width: contentWidth,
      height: rowHeight,
      color: rgb(1, 1, 1),
      borderColor: rgb(0.8, 0.8, 0.8),
      borderWidth: 0.5,
    });

    // Draw row data
    let cellX = pageWidth - margin;
    columns.forEach((col) => {
      const cellValue =
        col.key.split(".").reduce((acc, part) => acc && acc[part], row) ?? "";
      // Format value if needed
      let displayValue = cellValue;
      if (col.format) {
        displayValue = col.format(cellValue);
      }

      const cellText = ArabicReshaper.convertArabic(String(displayValue));
      const textWidth = arabicFont.widthOfTextAtSize(cellText, fontSize);
      const colX = cellX - textWidth - columnPadding;

      page.drawText(cellText, {
        x: Math.max(colX, margin + columnPadding),
        y: yPosition - rowHeight + 5,
        size: fontSize,
        font: arabicFont,
        color: rowIndex % 2 === 0 ? rgb(0, 0, 0) : rgb(0.1, 0.1, 0.1),
      });

      cellX -= columnWidth;
    });

    yPosition -= rowHeight;
  });

  // Draw footer on last page
  drawPageFooter(pdfDoc.getPageCount() - 1);

  const pdfBytes = await pdfDoc.save();
  return pdfBytes;
};
