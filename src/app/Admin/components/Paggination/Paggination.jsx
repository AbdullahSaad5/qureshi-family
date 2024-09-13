const Pagination = ({
  usersPerPage,
  totalUsers,
  paginate,
  currentPage,
  setCurrentPage,
  totalPages,
  handleRecordsChange,
}) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalUsers / usersPerPage); i++) {
    pageNumbers.push(i);
  }
  // Go to the next page
  const nextPage = () => {
    // console.log(`updated next page: 0-- cp ${currentPage}, tp ${totalPages}`);
    if (currentPage < totalPages) {
      // console.log(`updated next page: 1`);
      setCurrentPage(currentPage + 1);
    }
  };

  // Go to the previous page
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <nav>
      <ul className="mt-4 flex justify-center space-x-2">
        <li>
          {" "}
          <button
            onClick={prevPage}
            disabled={currentPage === 1}
            className={`rounded border px-4 py-2 ${
              currentPage > 1 && "active:bg-blue-400 bg-blue-300"
            }`}
          >
            Prev
          </button>
        </li>
        {pageNumbers.map((number) => (
          <li key={number}>
            <button
              onClick={() => paginate(number)}
              className={`rounded border px-4 py-2 ${
                currentPage === number
                  ? "border-blue-500 bg-blue-500 text-white"
                  : "text-gray-700 border-gray-300 hover:bg-gray-100 bg-white"
              }`}
            >
              {number}
            </button>
          </li>
        ))}
        <li>
          <button
            onClick={nextPage}
            disabled={currentPage === totalPages}
            className={`rounded border px-4 py-2 ${
              currentPage !== totalPages && "active:bg-blue-400  bg-blue-300"
            }`}
          >
            Next
          </button>
        </li>
        <li>
          <select
            id="recordsPerPage"
            value={usersPerPage}
            onChange={handleRecordsChange}
            className=" rounded border border-graydark ml-1 px-4 py-2 text-center text-black focus:border-primary focus-visible:outline-none"
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={30}>30</option>
          </select>
        </li>
      </ul>
    </nav>
  );
};
export default Pagination;
