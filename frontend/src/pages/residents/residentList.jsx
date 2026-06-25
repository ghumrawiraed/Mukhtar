import  { useState, useEffect } from "react";
import { FaEdit, FaTrashAlt,  FaFilePdf } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import {
  fetchResidents,
  deleteResident,
} from "../../redux/resident/residentSlice";
import { useDispatch, useSelector } from "react-redux";
import { confirmAlert } from "react-confirm-alert";
import { exportFilteredList} from "../../services/reportService";

import "react-confirm-alert/src/react-confirm-alert.css";
import Search from "../../components/search/Search";

import {
  FILTER_RESIDENTS,
  selectFilteredResidents,
} from "../../redux/resident/residentFilterSlice";

import { selectUserID } from "../../redux/auth/authSlice";
import ReactPaginate from "react-paginate";
import PDFPreviewModal from "../../components/pdfPreview/pdfPreviewModal";



const ResidentList = () => {
  const [search, setSearch] = useState("");
  const filteredResidents = useSelector(selectFilteredResidents);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userID = useSelector(selectUserID);

  const [exporting, setExporting] = useState(false);
  const [pdfUrl, setPdfUrl] = useState(null);
console.log("SELECT FILTERED RESIDENTS ---->:", filteredResidents);
  const delResident = async (id) => {
    console.log("ID:", id);
    await dispatch(deleteResident(id));
    await dispatch(fetchResidents());
    navigate(-1);
  };
  
 

  const confirmDelete = (id) => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-96 text-center">
              <h1 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                حذف موظف
              </h1>
              <p className="text-gray-700 dark:text-gray-300 mb-6">
                هل انت متأكد انك تريد حذف الموظف؟
              </p>
              <div className="flex justify-center gap-4">
                <button
                  onClick={onClose}
                  className="px-4 py-2 bg-gray-300 text-white rounded hover:bg-gray-400 transition"
                >
                  إلغاء
                </button>

                <button
                  onClick={() => {
                    delResident(id);
                    onClose();
                  }}
                  className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
                >
                  حذف
                </button>
              </div>
            </div>
          </div>
        );
      },
    });
  };

  const { residents, loading, error } = useSelector((state) => state.resident);

  useEffect(() => {
    console.log("Effect running");
    dispatch(fetchResidents());
  }, [dispatch]);

 //   Begin Pagination
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 15;
 
  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(filteredResidents.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(filteredResidents.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, filteredResidents]);

  const handlePageClick = (event) => {
    const newOffset =
      (event.selected * itemsPerPage) % filteredResidents.length;
    setItemOffset(newOffset);
  };
  //   End Pagination 

  useEffect(() => {
    console.log("FROM USEEFFECT:", residents);
    if (residents && residents.data.length > 0) {
      dispatch(FILTER_RESIDENTS({ residents, search }));
    }
  }, [residents, search, dispatch]);

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
  
        const url = await exportFilteredList("resident_list", filter, est);
  
        setPdfUrl(url);
      } catch (error) {
        console.error(error);
        alert("فشل تصدير البيانات");
      } finally {
        setExporting(false);
      }
    };

  return (
     <div className="w-[80%] rounded-lg shadow-2xl mt-21 mx-auto  p-6 backdrop-blur-md border border-slate-900">
      <div className="flex">
        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white mb-2 mx-4 pt-2">
          لائحة المقيمين
        </h1>
        <Link
          to="/resident/add"
          className="mt-1 ml-1  px-4 py-2 bg-[#701414] text-white font-normal rounded-lg dark:hover:bg-[#9c4343] transition duration-200 shadow"
        >
          إضافة مقيم
        </Link>

        <button
          onClick={handleExportPDF}
          disabled={exporting}
          title="لوائح المقيمين"
          className="mt-1 ml-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition shadow flex items-center gap-2"
        >
          <FaFilePdf size={16} />
          {exporting ? "جاري التصدير..." : "تصدير PDF"}
        </button>

        <Search value={search} onChange={(e) => setSearch(e.target.value)} />
      </div>
      <div className="overflow-x-auto rounded-2xl border border-slate-700 mt-2">
        {!residents ? (
          <p>Loading...</p>
        ) : residents.length === 0 ? (
          <p className="text-gray-400 mt-2">
            -- No residents found, please add one...
          </p>
        ) : (
          <table className="min-w-full text-sm text-left text-gray-500 dark:text-gray-200 mt-2">
            <thead className="text-[11px] uppercase bg-gray-50/50 text-black dark:bg-gray-900 dark:text-gray-200 ">
              <tr>
                <th scope="col" className="px-6 py-3">
                  S/N
                </th>
                <th scope="col" className="px-6 py-3">
                  رقم السجل
                </th>
                <th scope="col" className="px-6 py-3">
                  الأسم
                </th>
                <th scope="col" className="px-6 py-3">
                  اسم الأب
                </th>
                <th scope="col" className="px-6 py-3">
                  الشهرة
                </th>
                <th scope="col" className="px-6 py-3">
                  تاريخ الميلاد
                </th>
                <th scope="col" className="px-6 py-3">
                  العنوان
                </th>                
             
              </tr>
            </thead>
            <tbody>
              {currentItems.map((resident, index) => {
                const {
                  ID,
                  record_no,
                  first_name,
                  middle_name,
                  family_name,
                  birthdate,                 
                  
                } = resident;
                return (
                  <tr
                    key={ID}
                    className=" text-black bg-white/50 border-b dark:bg-gray-800/60 dark:text-gray-50 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600"
                  >
                    <td className="px-3 py-2">{itemOffset + index + 1}</td>
                    <td className="px-3 py-2">{record_no}</td>
                    <td className="px-3 py-2">{first_name}</td>
                    <td className="px-3 py-2">{middle_name}</td>
                    <td className="px-3 py-2">{family_name}</td>
                    <td className="px-3 py-2">
                      {" "}
                      {new Date(birthdate).toLocaleDateString("en-GB")}
                    </td>

                    
                    <td className="px-3 py-2 flex items-center gap-3">
                      <Link to={`/resident/${ID}`} title="Edit Resident">
                        <FaEdit
                          size={20}
                          className="text-green-600 hover:text-green-800"
                        />
                      </Link>

                      <button
                        title="Delete Resident"
                        onClick={() => confirmDelete(ID)}
                      >
                        <FaTrashAlt
                          size={18}
                          className="text-red-600 hover:text-red-800"
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
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        pageCount={pageCount}
        previousLabel="Prev"
        renderOnZeroPageCount={null}
        containerClassName="flex items-center justify-center space-x-1 mt-4"
        pageClassName="px-2 py-0.5 border border-gray-600 rounded text-gray-300 hover:bg-gray-700"
        activeClassName="bg-blue-600 text-white"
        previousClassName="px-2 py-0.5 border border-gray-600 rounded text-gray-300 hover:bg-gray-700"
        nextClassName="px-2 py-0.5 border border-gray-600 rounded text-gray-300 hover:bg-gray-700"
        breakClassName="px-2 py-0.5 text-gray-400"
        disabledClassName="opacity-40 cursor-not-allowed"
      />
       <PDFPreviewModal
        pdfUrl={pdfUrl}
        onClose={() => setPdfUrl(null)}
        downloadFileName="ResidentList.pdf"
        title="لائحة المقيمين"
      />
    </div> 
    
  );
};

export default ResidentList;
