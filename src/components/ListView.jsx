import React from "react";

const ListView = ({ pdfs, onPdfSelect }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {pdfs.length > 0 ? (
                pdfs.map((pdf, index) => (
                    <div
                        key={index}
                        className="bg-white p-4 rounded-lg shadow hover:shadow-2xl cursor-pointer"

                    >
                        <h2 className="text-lg font-bold mb-2">{pdf.name || "Untitled"}</h2>
                        <p className="text-sm text-gray-600 mb-1">
                            <span className="font-semibold">Author:</span> {pdf.author || "Unknown"}
                        </p>
                        <p className="text-sm text-gray-600 mb-4">
                            <span className="font-semibold">Published:</span> {pdf.published || "Unknown"}
                        </p>
                        <button onClick={() => onPdfSelect(pdf)} className="text-blue-500 hover:underline">Read PDF</button>
                    </div>
                ))
            ) : (
                <p className="text-center text-gray-500">No PDFs found.</p>
            )}
        </div>
    );
};

export default ListView;
