
const filteredListReport = require("../reports/filteredListReport");
const { models } = require("../config/db");

exports.generateReport = async (req, res) => {
  try {
    const { reportType, data, est } = req.body;
    console.log("reportType:", reportType);
    console.log("Data:", data);
    // console.log("est:", est);
    let pdfBuffer;

    switch (reportType) {

      case "employeeInfoForm":
        pdfBuffer = await employeeInfoFormReport(data, est);
        break;
      default:
        return res.status(400).json({ error: "Unknown report type" });
    }

    res.set({
      "Content-Type": "application/pdf",
      "Content-Disposition": "inline; filename=report.pdf",
    });

    res.send(pdfBuffer);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Report generation failed" });
  }
};

// =====================================
// Export Filtered List as PDF
// =====================================
exports.exportFilteredList = async (req, res) => {
  try {
    const { listType, searchFilter, est } = req.body;
    console.log("listType:", listType);
    console.log("searchFilter:", searchFilter);
    console.log("Available models:", Object.keys(models));
    console.log("Requested model:", listType);
    const Model = models[listType];
    console.log("Model:", Model);
    if (!Model) {
      return res.status(400).json({ error: "Unknown list type" });
    }

    // Build where clause based on search filter
    let where = {};
    if (searchFilter) {
      where = JSON.parse(searchFilter);
    }

    const include = Model.associations
      ? Object.values(Model.associations).map((assoc) => ({
          association: assoc,
        }))
      : [];
    console.log("Where clause:", where);
    console.log("Include associations:", include);

    // Fetch all matching records (no pagination limit)
    const records = await Model.findAll({
      where,
      include,
      order: [["id", "DESC"]],
      limit: 10000, // Safety limit to prevent huge exports
    });

    console.log(`Found ${records.length} records to export`);

    // Define columns and report title based on listType
    const reportConfig = getReportConfig(listType);

    // Generate PDF
    const pdfBuffer = await filteredListReport(
      records,
      est,
      reportConfig.title,
      reportConfig.columns,
    );

    // Generate filename
    const now = new Date();
    const dateStr = now.toISOString().split("T")[0];
    const filename = `${reportConfig.filename}_${dateStr}.pdf`;

    res.set({
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${filename}"`,
    });

    res.send(pdfBuffer);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Export failed", details: err.message });
  }
};

// Helper function to get report configuration based on list type
function getReportConfig(listType) {
  const configs = {

    employee_info_form: {
      title: "بيان معلومات من المستخدم/الأجير إلى رب العمل  ر4",
      filename: "employee_info_form",
      columns: [
        { key: "ID", label: "ت" },
        {
          key: "bayan_date",
          label: "تاريخ البيان",
          format: (val) =>
            val ? new Date(val).toLocaleDateString("en-GB") : "",
        },
        { key: "emp.first_name", label: "الاسم" },
        { key: "emp.family_name", label: "العائلة" },
        { key: "emp.nssf_no", label: "رقم الضمان" },  
      ],
    },

  };

  return (
    configs[listType] || {
      title: listType,
      filename: listType,
      columns: [{ key: "ID", label: "ت" }],
    }
  );
}
