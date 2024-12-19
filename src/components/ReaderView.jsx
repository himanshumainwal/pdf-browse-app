import React from "react";
import { IoArrowBack } from "react-icons/io5";


const ReaderView = ({ pdf, onBack }) => {
    return (
        <div className="max-w-4xl mx-auto">
            <div className="flex justify-between">

                <div><h1 className="text-2xl font-bold mb-4">{pdf.name || "Untitled PDF"}</h1>
                    <p className="text-gray-700 mb-4">
                        <span className="font-semibold">Author:</span> {pdf.author || "Unknown"}
                    </p>
                    <p className="text-gray-700 mb-4">
                        <span className="font-semibold">Published:</span> {pdf.published || "Unknown"}
                    </p></div>

                <button
                    onClick={onBack}
                    className="mb-4 h-fit flex items-center px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white rounded"
                >
                    <IoArrowBack className="text-xl mr-2" />
                    Back to List
                </button>
            </div>


            <iframe
                src={pdf.link}
                title={pdf.name}
                className="w-full h-screen border rounded"
            ></iframe>
        </div>
    );
};

export default ReaderView;
