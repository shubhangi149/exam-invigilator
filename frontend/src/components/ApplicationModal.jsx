import { X } from "lucide-react";
import ApplicationForm from "../pages/ApplicationForm";

export default function ApplicationModal({
    isOpen,
    onClose,
}) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-100 flex items-center justify-center p-4">

            <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-2xl">

                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-all z-10"
                >
                    <X size={20} />
                </button>

                <ApplicationForm />
            </div>
        </div>
    );
}