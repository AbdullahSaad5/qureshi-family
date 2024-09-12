const Pagination = ({
  usersPerPage,
  totalUsers,
  paginate,
  currentPage,
  setCurrentPage,
  totalPages,
}) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalUsers / usersPerPage); i++) {
    pageNumbers.push(i);
  }
  // Go to the next page
  const nextPage = () => {
    if (currentPage < totalPages) {
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
            className="rounded border px-4 py-2"
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
          className="rounded border px-4 py-2"
        >
          Next
        </button>
        </li>
      </ul>
    </nav>
  );
};
export default Pagination;
