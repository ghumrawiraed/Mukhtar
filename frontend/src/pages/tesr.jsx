import { useState } from "react";
import ReactPaginate from "react-paginate";

const DummyPaginatedTable = () => {
  // -----------------------------
  // Fake data (100 items)
  // -----------------------------
  const data = Array.from({ length: 100 }, (_, i) => ({
    id: i + 1,
    name: `User ${i + 1}`,
  }));

  const itemsPerPage = 10;

  const [page, setPage] = useState(1);

  // -----------------------------
  // Pagination logic (FRONTEND ONLY)
  // -----------------------------
  const offset = (page - 1) * itemsPerPage;
  const currentItems = data.slice(offset, offset + itemsPerPage);

  const pageCount = Math.ceil(data.length / itemsPerPage);

  // -----------------------------
  // Page click
  // -----------------------------
  const handlePageClick = (event) => {
    setPage(event.selected + 1);
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">
        ReactPaginate Demo (Frontend Only)
      </h1>

      {/* TABLE */}
      <table className="w-full border">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
          </tr>
        </thead>

        <tbody>
          {currentItems.map((item) => (
            <tr key={item.id}>
              <td className="border p-2">{item.id}</td>
              <td className="border p-2">{item.name}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* PAGINATION */}
      <div className="mt-4">
        <ReactPaginate
          pageCount={10}
          onPageChange={() => console.log("clicked")}
          renderOnZeroPageCount={null}
        />
      </div>
    </div>
  );
};

export default DummyPaginatedTable;
