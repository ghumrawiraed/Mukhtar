import ReactDOM from "react-dom"; // 1. Import ReactDOM
import { FaTimes, FaDownload } from "react-icons/fa";

const PDFPreviewModal = ({
  pdfUrl,
  onClose,
  downloadFileName = "report.pdf",
  title = "معاينة التقرير",
}) => {
  if (!pdfUrl) return null;

  const handleClose = () => {
    URL.revokeObjectURL(pdfUrl);
    onClose();
  };

  // 2. Wrap the JSX inside ReactDOM.createPortal
  return ReactDOM.createPortal(
    <div className="fixed inset-0 w-screen h-screen bg-black/70 z-[99999] flex items-center justify-center">
      <div className="bg-white dark:bg-gray-800 w-full h-full max-w-none shadow-xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
          <h2 className="text-lg font-bold text-gray-800 dark:text-white">
            {title}
          </h2>

          <div className="flex items-center gap-2">
            <a
              href={pdfUrl}
              download={downloadFileName}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#701414] text-white hover:bg-[#9c4343] transition"
            >
              <FaDownload size={14} />
              تحميل
            </a>

            <button
              onClick={handleClose}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-600 text-white hover:bg-gray-700 transition"
            >
              <FaTimes size={14} />
              إغلاق
            </button>
          </div>
        </div>

        {/* PDF */}
        <iframe
          src={pdfUrl}
          title="PDF Preview"
          className="flex-1 w-full h-full bg-white border-none"
        />
      </div>
    </div>,
    document.body, // 3. Target the document body directly
  );
};

export default PDFPreviewModal;
