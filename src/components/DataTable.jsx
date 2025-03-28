import { useEffect, useState } from "react";
import {useDispatch, useSelector } from "react-redux";
import {setData, setSearchQuery, toggleSortOrder, setCurrentPage} from "../redux/dataSlice";
import '../styles/DataTable.css';

const DataTable = () => {
  const dispatch = useDispatch();
  const {tableData, searchQuery, sortOrder, currentPage, itemsPerPage } = useSelector((state) => state.data);
  const [loading, setLoading] = useState(false);

  // Fetch Data from API
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const response = await fetch("https://jsonplaceholder.typicode.com/posts");
      const result = await response.json();
      dispatch(setData(result));
      setLoading(false);
    };
    fetchData();
  }, [dispatch]);

  // Search & Sort by ID
  const filteredData = searchQuery ? tableData.filter((item) =>
        item.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      ).sort((a, b) => (sortOrder === "asc" ? a.id - b.id : b.id - a.id))
  : [...tableData].sort((a, b) => (sortOrder === "asc" ? a.id - b.id : b.id - a.id));


  // Pagination logic
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirst, indexOfLast);

  const handlePrev = () => {
    if (currentPage > 1) dispatch(setCurrentPage(currentPage - 1));
  };

  const handleNext = () => {
    if (currentPage < totalPages) dispatch(setCurrentPage(currentPage + 1));
  };

  return (
    <div className="table-container">
      <input
        type="text"
        placeholder="Search by title..."
        value={searchQuery}
        onChange={(e) => dispatch(setSearchQuery(e.target.value))}
      />
      <button onClick={() => dispatch(toggleSortOrder())}>
        Sort by ID ({sortOrder})
      </button>

      {loading ? ( <p>Loading...</p>) 
      : (
        <>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.title}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="pagination">
            <button className="btn-pagination" onClick={handlePrev} disabled={currentPage === 1}>
              {"<"}
            </button>

            {currentPage > 1 && (
              <button onClick={() => dispatch(setCurrentPage(currentPage - 1))}>
                {currentPage - 1}
              </button>
            )}

            <button className="active">{currentPage}</button>

            <button className="btn-pagination" onClick={handleNext} disabled={currentPage === totalPages}>
              {">"}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default DataTable;
