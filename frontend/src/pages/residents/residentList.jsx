import { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
const PaginateComponent = ReactPaginate.default || ReactPaginate;
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { confirmAlert } from "react-confirm-alert";

import {
  fetchResidents,
  deleteResident,
} from "../../redux/resident/residentSlice";

import Search from "../../components/search/Search";
import "react-confirm-alert/src/react-confirm-alert.css";

const ResidentList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const itemsPerPage = 15;

  const { residents, totalPages, loading } = useSelector(
    (state) => state.resident,
  );

  // -----------------------------
  // FETCH DATA (BACKEND PAGINATION)
  // -----------------------------
  useEffect(() => {
    dispatch(
      fetchResidents({
        page,
        limit: itemsPerPage,
        search,
      }),
    );
  }, [dispatch, page, search]);

  // -----------------------------
  // SEARCH RESET PAGE
  // -----------------------------
  useEffect(() => {
    setPage(1);
  }, [search]);

  // -----------------------------
  // DELETE
  // -----------------------------
  const delResident = async (id) => {
    await dispatch(deleteResident(id));
    dispatch(fetchResidents({ page, limit: itemsPerPage, search }));
  };

  const confirmDelete = (id) => {
    confirmAlert({
      customUI: ({ onClose }) => (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-96 text-center">
            <h1 className="text-lg font-bold mb-4">حذف مقيم</h1>
            <p className="mb-6">هل أنت متأكد؟</p>

            <div className="flex justify-center gap-4">
              <button
                onClick={onClose}
                className="px-4 py-2 bg-gray-300 rounded"
              >
                إلغاء
              </button>

              <button
                onClick={() => {
                  delResident(id);
                  onClose();
                }}
                className="px-4 py-2 bg-red-600 text-white rounded"
              >
                حذف
              </button>
            </div>
          </div>
        </div>
      ),
    });
  };

  // -----------------------------
  // PAGE CHANGE
  // -----------------------------
  const handlePageClick = (event) => {
    setPage(event.selected + 1);
  };
  console.log("totalPages:", residents.totalPages);
  return (
    <div className="w-[80%] mx-auto mt-20 p-6">
      {/* HEADER */}
      <div className="flex items-center gap-4 mb-4">
        <h1 className="text-xl font-bold">لائحة المقيمين</h1>

        <Link
          to="/resident/add"
          className="px-4 py-2 bg-red-700 text-white rounded"
        >
          إضافة مقيم
        </Link>

        <Search value={search} onChange={(e) => setSearch(e.target.value)} />
      </div>
      {/* TABLE */}
      <div className="overflow-x-auto border rounded">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <table className="min-w-full text-sm">
            <thead>
              <tr>
                <th>#</th>
                <th>رقم السجل</th>
                <th>الإسم</th>
                <th>الأب</th>
                <th>العائلة</th>
                <th>تاريخ الميلاد</th>
                <th>إجراءات</th>
              </tr>
            </thead>

            <tbody>
              {residents?.data?.map((resident, index) => (
                <tr key={resident.ID}>
                  <td>{(page - 1) * itemsPerPage + index + 1}</td>
                  <td>{resident.record_no}</td>
                  <td>{resident.first_name}</td>
                  <td>{resident.father_name}</td>
                  <td>{resident.family_name}</td>
                  <td>
                    {new Date(resident.birthdate).toLocaleDateString("en-GB")}
                  </td>

                  <td className="flex gap-3">
                    <Link to={`/resident/${resident.ID}`}>
                      <FaEdit className="text-green-600" />
                    </Link>

                    <button onClick={() => confirmDelete(resident.ID)}>
                      <FaTrashAlt className="text-red-600" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      {/* PAGINATION */}
      {residents.totalPages > 0 && (
        <PaginateComponent
          breakLabel="..."
          nextLabel="Next"
          previousLabel="Prev"
          onPageChange={handlePageClick}
          pageCount={residents.totalPages || 0}
          forcePage={page - 1}
          containerClassName="flex justify-center gap-2 mt-4"
          pageClassName="px-2 py-1 border rounded"
          activeClassName="bg-blue-600 text-white"
          previousClassName="px-2 py-1 border rounded"
          nextClassName="px-2 py-1 border rounded"
          disabledClassName="opacity-40"
        />
      )}
    </div>
  );
};

export default ResidentList;
