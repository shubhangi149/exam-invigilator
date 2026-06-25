import { UploadCloud, CheckCircle, X } from "lucide-react";
import { useState } from "react";

export default function UploadCard({ title, onFileChange }) {
    const [fileName, setFileName] = useState("");
    const handleFileSelect = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const MAX_FILE_SIZE = 2 * 1024 * 1024;
        if (file.size > MAX_FILE_SIZE) {
            alert("File size must be less than 2 MB");
            return;
        }
        setFileName(file.name);
        onFileChange(file);
    };
    const clearFile = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setFileName("");
        onFileChange(null);
    };


    return (
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
            <h3 className="font-semibold text-lg text-slate-800 mb-2">{title}</h3>
            <p className="text-sm text-slate-500 mb-5">JPG, PNG or PDF • Max 2 MB</p>
            <label className="flex flex-col items-center justify-center border-2 border-dashed border-slate-300 rounded-xl p-8 cursor-pointer hover:border-indigo-500 hover:bg-indigo-50 transition">
                {
                    !fileName ? (
                        <>
                            <UploadCloud
                                size={42}
                                className="text-indigo-600 mb-3"
                            />
                            <span className="font-medium text-slate-700">
                                Click to Upload
                            </span>
                        </>
                    ) : (
                        <>
                            <CheckCircle
                                size={42}
                                className="text-green-600 mb-3"
                            />
                            <p className="font-semibold text-green-700 text-center break-all">
                                {fileName}
                            </p>
                            <span className="text-sm text-slate-500 mt-2">
                                Click to change file
                            </span>
                            <button
                                type="button"
                                onClick={clearFile}
                                className="mt-4 flex items-center gap-2 px-3 py-2 text-red-600 border border-red-200 rounded-lg hover:bg-red-50"
                            >
                                <X size={16} />
                                Remove File
                            </button>
                        </>
                    )
                }
                <input
                    type="file"
                    className="hidden"
                    accept=".jpg,.jpeg,.png,.pdf"
                    onChange={handleFileSelect}
                />
            </label>

        </div>
    );
}