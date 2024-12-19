import React, { useEffect, useState } from "react";
import ListView from "./components/ListView";
import ReaderView from "./components/ReaderView";
import { CiSearch } from "react-icons/ci";


const App = () => {
  const [pdfs, setPdfs] = useState([]); // hold API data or Display
  const [selectedPdf, setSelectedPdf] = useState(null); // Selected PDF for ReaderView
  const [searchQuery, setSearchQuery] = useState(""); //  search query
  const [error, setError] = useState(""); // For Error

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Fetch data from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://api.npoint.io/dee51ea017d20efdfcc8");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setPdfs(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchData();
  }, []);

  const filteredPdfs = pdfs.filter((pdf) =>
    pdf.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination Logic
  const totalPages = Math.ceil(filteredPdfs.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPdfs = filteredPdfs.slice(startIndex, endIndex);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-6">PDF Showcase</h1>

      {error && <p className="text-red-500 text-center">{error}</p>}

      {selectedPdf ? (
        <ReaderView pdf={selectedPdf} onBack={() => setSelectedPdf(null)} />
      ) : (
        <>
          {/* Search Bar */}
          <div className="max-w-4xl mx-auto mb-6 px-2 rounded-xl flex items-center bg-white">
            <CiSearch className="text-xl" />
            <input
              type="text"
              placeholder="Search PDFs by name..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full p-2 border-none outline-none rounded-lg "
            />
          </div>

          {/* All PDF List View */}
          <ListView pdfs={currentPdfs} onPdfSelect={setSelectedPdf} />

          {/* Pagination Controls */}
          {filteredPdfs.length > itemsPerPage && (
            <div className="flex justify-center items-center mt-6 space-x-4">
              <button
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
                className={`px-4 py-2 rounded ${currentPage === 1 ? "bg-gray-300" : "bg-blue-500 hover:bg-blue-700 text-white"
                  }`}
              >
                Previous
              </button>
              <span>
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className={`px-4 py-2 rounded ${currentPage === totalPages
                  ? "bg-gray-300"
                  : "bg-blue-500 text-white hover:bg-blue-700"
                  }`}
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default App;
