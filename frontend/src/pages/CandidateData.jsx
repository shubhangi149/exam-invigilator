import { useEffect, useState } from "react";
import axios from "axios";
import { Search, Trash2, FileSpreadsheet, Eye, ExternalLink } from "lucide-react";
import * as XLSX from "xlsx";
import { domain } from "../data/constant";

export default function CandidateData() {
    const [search, setSearch] = useState("");
    const [selectedCandidate, setSelectedCandidate] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(true);
    const [candidates, setCandidates] = useState([]);

    const deleteCandidate = async (id) => {
        try {

            const token = localStorage.getItem("access_token");
            await axios.delete(
                `${domain}/api/applications/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            fetchCandidates();
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchCandidates();
    }, []);

    const fetchCandidates = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem("access_token");
            const response = await axios.get(
                `${domain}/api/applications`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            console.log("Raw API Response:", response.data);
            const formattedData = response.data.data.map(
                (item) => ({
                    id: item.id,
                    name: item.name,
                    mobileNo: item.mobile,
                    emailId: item.email,
                    city: item.city,
                    dob: item.dob,
                    education: item.education,
                    currentCity: item.current_city,
                    aadharFront: item.documents?.aadhaar_front?.secure_url || "",
                    aadharBack: item.documents?.aadhaar_back?.secure_url || "",
                    panCard: item.documents?.pan_card?.secure_url || "",
                    passportPhoto: item.documents?.passport_photo?.secure_url || "",
                    status: item.status || "PENDING",
                    mailStatus: "N/A"
                })
            );

            setCandidates(formattedData);

        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const exportToExcel = () => {
        const exportData = candidates.map((candidate) => ({
            "Timestamp": new Date().toLocaleString(),
            "Name": candidate.name,
            "Mobile No": candidate.mobileNo,
            "Email - Id": candidate.emailId,
            "City": candidate.city,
            "DOB": candidate.dob,
            "Education": candidate.education,
            "Mention Your Current City": candidate.currentCity,
            "Addhar card front": candidate.aadharFront,
            "Addhar Back Side": candidate.aadharBack,
            "Pan Card": candidate.panCard,
            "Passport Photo": candidate.passportPhoto,
            "Email Id": candidate.emailIdOptional,
            "Status": candidate.status,
            "mail status": candidate.mailStatus
        }));

        const ws = XLSX.utils.json_to_sheet(exportData);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Candidates");
        XLSX.writeFile(wb, `candidates_data_${new Date().toISOString().split('T')[0]}.xlsx`);
    };

    const viewDocuments = (candidate) => {
        setSelectedCandidate(candidate);
        setShowModal(true);
    };

    const filteredCandidates = candidates.filter((candidate) =>
        Object.values(candidate)
            .join(" ")
            .toLowerCase()
            .includes(search.toLowerCase())
    );

    // Function to get status color
    const getStatusColor = (status) => {
        switch (status) {
            case "Approved": return "bg-green-100 text-green-700";
            case "Rejected": return "bg-red-100 text-red-700";
            case "Pending": return "bg-yellow-100 text-yellow-700";
            default: return "bg-gray-100 text-gray-700";
        }
    };

    // Function to get mail status color
    const getMailStatusColor = (status) => {
        switch (status) {
            case "Delivered": return "bg-green-100 text-green-700";
            case "Failed": return "bg-red-100 text-red-700";
            case "Sent": return "bg-blue-100 text-blue-700";
            default: return "bg-gray-100 text-gray-700";
        }
    };

    if (loading) {
        return (
            <div className="p-10 text-center">
                Loading candidates...
            </div>
        );
    }
    
    return (
        <div className="bg-white rounded-3xl shadow-sm p-6">
            {/* Header with Excel Button */}
            <div className="flex justify-between items-start mb-6 flex-wrap gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-slate-800">Candidate Data</h2>
                    <p className="text-slate-500 mt-1">View and manage candidate records</p>
                </div>

                <button
                    onClick={exportToExcel}
                    className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-xl hover:bg-green-700 transition-colors"
                >
                    <FileSpreadsheet size={18} />
                    Export to Excel
                </button>
            </div>

            {/* Search */}
            <div className="relative mb-6">
                <Search
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                    type="text"
                    placeholder="Search by Name, Mobile, Email, City or Status..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
            </div>

            {/* Table - Horizontal Scroll for Mobile */}
            <div className="overflow-x-auto">
                <table className="w-full min-w-300">
                    <thead>
                        <tr className="bg-slate-50 border-b">
                            <th className="text-left p-4">Name</th>
                            <th className="text-left p-4">Mobile No</th>
                            <th className="text-left p-4">Email - Id</th>
                            <th className="text-left p-4">City</th>
                            <th className="text-left p-4">DOB</th>
                            <th className="text-left p-4">Education</th>
                            <th className="text-left p-4">Current City</th>
                            <th className="text-left p-4">Documents</th>
                            <th className="text-left p-4">Status</th>
                            <th className="text-left p-4">Mail Status</th>
                            <th className="text-left p-4">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredCandidates.map((candidate) => (
                            <tr key={candidate.id} className="border-b hover:bg-slate-50">
                                <td className="p-4 font-medium">{candidate.name}</td>
                                <td className="p-4">{candidate.mobileNo}</td>
                                <td className="p-4">{candidate.emailId}</td>
                                <td className="p-4">{candidate.city}</td>
                                <td className="p-4">{candidate.dob}</td>
                                <td className="p-4 max-w-50 truncate" title={candidate.education}>
                                    {candidate.education}
                                </td>
                                <td className="p-4">{candidate.currentCity}</td>
                                <td className="p-4">
                                    <button
                                        onClick={() => viewDocuments(candidate)}
                                        className="bg-blue-100 text-blue-600 px-3 py-2 rounded-lg hover:bg-blue-200 transition-colors flex items-center gap-2"
                                    >
                                        <Eye size={16} />
                                        View Docs
                                    </button>
                                </td>
                                <td className="p-4">
                                    <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(candidate.status)}`}>
                                        {candidate.status}
                                    </span>
                                </td>
                                <td className="p-4">
                                    <span className={`px-3 py-1 rounded-full text-sm ${getMailStatusColor(candidate.mailStatus)}`}>
                                        {candidate.mailStatus}
                                    </span>
                                </td>
                                <td className="p-4">
                                    <button
                                        onClick={() => deleteCandidate(candidate.id)}
                                        className="bg-red-100 text-red-600 p-2 rounded-lg hover:bg-red-200 transition-colors"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="mt-4 text-sm text-slate-500">
                Total Records: {filteredCandidates.length}
            </div>

            {/* Documents Modal - Only Links Section */}
            {showModal && selectedCandidate && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="sticky top-0 bg-white border-b p-6 flex justify-between items-center">
                            <div>
                                <h3 className="text-2xl font-bold text-slate-800">
                                    {selectedCandidate.name}'s Documents
                                </h3>
                                <p className="text-slate-500 mt-1">
                                    Mobile: {selectedCandidate.mobileNo} | Email: {selectedCandidate.emailId}
                                </p>
                            </div>
                            <button
                                onClick={() => setShowModal(false)}
                                className="text-slate-500 hover:text-slate-700 text-2xl"
                            >
                                ×
                            </button>
                        </div>

                        <div className="p-6">
                            {/* Candidate Information */}
                            <div className="bg-slate-50 rounded-xl p-4 mb-6">
                                <h4 className="font-semibold text-slate-800 mb-3">Candidate Information</h4>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                    <div>
                                        <p className="text-sm text-slate-500">Name</p>
                                        <p className="font-medium">{selectedCandidate.name}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-slate-500">Mobile No</p>
                                        <p className="font-medium">{selectedCandidate.mobileNo}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-slate-500">Email ID</p>
                                        <p className="font-medium">{selectedCandidate.emailId}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-slate-500">City</p>
                                        <p className="font-medium">{selectedCandidate.city}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-slate-500">DOB</p>
                                        <p className="font-medium">{selectedCandidate.dob}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-slate-500">Education</p>
                                        <p className="font-medium">{selectedCandidate.education}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-slate-500">Current City</p>
                                        <p className="font-medium">{selectedCandidate.currentCity}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Documents Links Section */}
                            <h4 className="font-semibold text-slate-800 mb-4">Documents Links</h4>
                            <div className="space-y-3">
                                {/* Aadhar Card Front Link */}
                                <div className="border rounded-lg p-4 hover:bg-slate-50 transition-colors">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="font-medium text-slate-800">Aadhar Card (Front)</p>
                                            <p className="text-sm text-slate-500 mt-1 break-all">{selectedCandidate.aadharFront}</p>
                                        </div>
                                        <a
                                            href={selectedCandidate.aadharFront}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-2 text-blue-600 hover:text-blue-700"
                                        >
                                            <ExternalLink size={18} />
                                            Open
                                        </a>
                                    </div>
                                </div>

                                {/* Aadhar Card Back Link */}
                                <div className="border rounded-lg p-4 hover:bg-slate-50 transition-colors">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="font-medium text-slate-800">Aadhar Card (Back)</p>
                                            <p className="text-sm text-slate-500 mt-1 break-all">{selectedCandidate.aadharBack}</p>
                                        </div>
                                        <a
                                            href={selectedCandidate.aadharBack}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-2 text-blue-600 hover:text-blue-700"
                                        >
                                            <ExternalLink size={18} />
                                            Open
                                        </a>
                                    </div>
                                </div>

                                {/* PAN Card Link */}
                                <div className="border rounded-lg p-4 hover:bg-slate-50 transition-colors">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="font-medium text-slate-800">PAN Card</p>
                                            <p className="text-sm text-slate-500 mt-1 break-all">{selectedCandidate.panCard}</p>
                                        </div>
                                        <a
                                            href={selectedCandidate.panCard}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-2 text-blue-600 hover:text-blue-700"
                                        >
                                            <ExternalLink size={18} />
                                            Open
                                        </a>
                                    </div>
                                </div>

                                {/* Passport Size Photo Link */}
                                <div className="border rounded-lg p-4 hover:bg-slate-50 transition-colors">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="font-medium text-slate-800">Passport Size Photo</p>
                                            <p className="text-sm text-slate-500 mt-1 break-all">{selectedCandidate.passportPhoto}</p>
                                        </div>
                                        <a
                                            href={selectedCandidate.passportPhoto}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-2 text-blue-600 hover:text-blue-700"
                                        >
                                            <ExternalLink size={18} />
                                            Open
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}