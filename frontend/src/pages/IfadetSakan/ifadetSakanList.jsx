
import { useEffect, useState } from "react";
import {
  FaEdit,
  FaTrashAlt,
  FaPrint,
  FaUserEdit,
  FaFilePdf,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import Search from "../../components/search/Search";
import IfadetSakanService from "../../services/IfadetSakanService";
import {
  generateReport,
  exportFilteredList,
} from "../../services/reportService";

import { useSelector, useDispatch } from "react-redux";
import PDFPreviewModal from "../../components/pdfPreview/pdfPreviewModal";

function IfadetSakanList() {
  const [IfadetSakanCerts, setIfadetSakanCerts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [exporting, setExporting] = useState(false);

  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);

  const itemsPerPage = 8;
  const dispatch = useDispatch();


  const [pdfUrl, setPdfUrl] = useState(null);



  // ===============================
  // FETCH DATA
  // ===============================
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const res = await IfadetSakanService.getAllOrders(
          page,
          itemsPerPage,
          search,
        );

        // Log to see the structure: is it { data: [...], pages: 5 }?
        console.log("Response from server:", res.data);

        // Extract from the backend response structure
        const { data, pages } = res.data;

        setIfadetSakanCerts(data || []); // Set only the array
        setPageCount(pages || 0); // Set the total pages
      } catch (error) {
        console.error("Fetch Error:", error);
        setIfadetSakanCerts([]);
      } finally {
        setLoading(false);
      }
    };

    const delayDebounceFn = setTimeout(() => {
      fetchData();
    }, 100);

    return () => clearTimeout(delayDebounceFn);
  }, [page, search]); // Re-run when page or search changes

  // Remove the extra closing brackets that were here!

  const handlePageClick = (event) => {
    setPage(event.selected + 1);
  };

  // ===============================
  // DELETE
  // ===============================
  const handleDelete = async (id) => {
    try {
      await IfadetSakanService.deleteOrders(id);

      ifadetSakanCerts((prev) => prev.filter((item) => item.ID !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const confirmDelete = (id) => {
    confirmAlert({
      customUI: ({ onClose }) => (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-96 text-center">
            <h1 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
              حذف إفادة
            </h1>

            <p className="text-gray-700 dark:text-gray-300 mb-6">
              هل انت متأكد انك تريد حذف الإفادة؟
            </p>

            <div className="flex justify-center gap-4">
              <button
                onClick={onClose}
                className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500 transition"
              >
                إلغاء
              </button>

              <button
                onClick={() => {
                  handleDelete(id);
                  onClose();
                }}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
              >
                حذف
              </button>
            </div>
          </div>
        </div>
      ),
    });
  };
  console.log("orders certs:", IfadetSakanCerts);

  // ===============================
  // EXPORT FILTERED DATA
  // ===============================
  const handleExportPDF = async () => {
    try {
      setExporting(true);

      const filter = search
        ? JSON.stringify({
            status: { $like: `%${search}%` },
          })
        : "{}";

      const url = await exportFilteredList("orders", filter);

      setPdfUrl(url);
    } catch (error) {
      console.error(error);
      alert("فشل تصدير البيانات");
    } finally {
      setExporting(false);
    }
  };

  // ===============================
  // RENDER
  // ===============================
  return (
    <div className="w-[70%] rounded-lg shadow-2xl mt-21 mx-auto  p-6 backdrop-blur-md border border-slate-900">
      <div className="flex">
        <h1 className="!text-2xl font-bold text-gray-900 dark:text-white mb-2 mx-4 pt-2">
          لائحة إفادات السكن
        </h1>

        <Link
          to="/ifadet-sakan/add"
          className="mt-1 ml-1 px-4 py-2 bg-[#701414] text-white rounded-lg hover:bg-[#9c4343] transition shadow"
        >
          إضافة
        </Link>

        <button
          onClick={handleExportPDF}
          disabled={exporting}
          title="لائحة إفادات السكن"
          className="mt-1 ml-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition shadow flex items-center gap-2"
        >
          <FaFilePdf size={16} />
          {exporting ? "جاري التصدير..." : "تصدير PDF"}
        </button>

        <Search
          value={search}
          onChange={(e) => {
            setPage(1);
            setSearch(e.target.value);
          }}
        />
      </div>

      <div className="overflow-x-auto rounded-2xl border border-slate-700 mt-2">
        {loading ? (
          <p>Loading...</p>
        ) : IfadetSakanCerts.length === 0 ? (
          <p className="text-gray-400 mt-2">-- No certificates found...</p>
        ) : (
          <table className="min-w-full text-sm text-left text-gray-500 dark:text-gray-200 mt-2">
            <thead className="text-[11px] uppercase bg-gray-50 text-black dark:bg-gray-900 dark:text-gray-200">
              <tr>
                <th className="px-6 py-3">S/N</th>
                <th className="px-6 py-3">تاريخ الإفادة</th>
                <th className="px-6 py-3">اسم الموظف</th>
                <th className="px-6 py-3">رقم الضمان</th>
                <th className="px-6 py-3">الرقم المالي</th>
                <th className="px-6 py-3">الوضع</th>
                <th className="px-6 py-3">المدة</th>
                <th className="px-6 py-3">Actions</th>
              </tr>
            </thead>

            <tbody>
              { ifadetSakanCerts.map((cert, index) => {
                const { ID = {} } = cert;
                const {
                  first_name = "",
                  family_name = "",
                  nssf_no = "",
                  financial = "",
                } = emp;

                return (
                  <tr
                    key={ID}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600"
                  >
                    <td className="px-3 py-2">
                      {(page - 1) * itemsPerPage + index + 1}
                    </td>
                    <td className="px-3 py-2">
                      {request_date
                        ? new Date(request_date).toLocaleDateString("en-GB")
                        : ""}
                    </td>
                    <td className="px-3 py-2">
                      {`${first_name} ${family_name}`}{" "}
                    </td>
                    <td className="px-3 py-2">{nssf_no}</td>
                    <td className="px-3 py-2">{financial}</td>
                    <td className="px-3 py-2">{status}</td>
                    <td className="px-3 py-2">{duration}</td>
                    <td className="px-3 py-2 flex items-center gap-3">
                      <Link to={`/orders/${ID}`} title="Edit">
                        <FaEdit
                          size={20}
                          className="text-green-600 hover:text-green-800"
                        />
                      </Link>

                      <button onClick={() => confirmDelete(ID)} title="Delete">
                        <FaTrashAlt
                          size={18}
                          className="text-red-600 hover:text-red-800"
                        />
                      </button>
                      <Link to={`/employee/${emp.ID}`} title="Edit Employee">
                        <FaUserEdit
                          size={20}
                          className="text-blue-600 hover:text-blue-800"
                        />
                      </Link>
                      <button
                        type="button"
                        onClick={() => generateReport("orders", cert, est)}
                        className="px-4 py-2 text-gray-700 bg-gray-200 hover:bg-gray-300 rounded-lg"
                      >
                        <FaPrint
                          size={18}
                          className="text-gray-400 hover:text-gray-500"
                        />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      <ReactPaginate
        breakLabel="..."
        nextLabel="Next"
        previousLabel="Prev"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        pageCount={pageCount}
        containerClassName="flex items-center justify-center space-x-1 mt-4"
        pageClassName="px-2 py-1 border rounded text-gray-600 hover:bg-gray-200"
        activeClassName="bg-blue-600 text-white"
        previousClassName="px-2 py-1 border rounded"
        nextClassName="px-2 py-1 border rounded"
        disabledClassName="opacity-40 cursor-not-allowed"
      />

      <PDFPreviewModal
        pdfUrl={pdfUrl}
        onClose={() => setPdfUrl(null)}
        downloadFileName="ifadetSakan.pdf"
        title="معاينة لائحة إفادات السكن"
      />
    </div>
  );
}

export default IfadetSakanList;

