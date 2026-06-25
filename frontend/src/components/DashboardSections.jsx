import {
    MapPin,
    GraduationCap,
    CheckCircle,
    Eye,
    ChevronRight,
    FileCheck,
    Phone,
    MessageCircle,
    Mail,
    Star,
    PlusCircle,
} from "lucide-react";

export default function DashboardSections({
    examLocations,
    responsibilities,
    applicationSteps,
    keyHighlights,
    openApplicationForm,
}) {
    return (
        <>
            {/* Locations */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-8">
                <div className="flex items-center gap-3 mb-5">
                    <div className="w-10 h-10 bg-linear-to-r from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center">
                        <MapPin size={18} className="text-white" />
                    </div>

                    <h2 className="text-xl font-bold text-gray-800">
                        Exam Centre Locations
                    </h2>

                    <span className="px-2 py-1 bg-gray-100 rounded-lg text-xs font-medium text-gray-600">
                        {examLocations.length}+ Cities
                    </span>
                </div>

                <div className="flex flex-wrap gap-2">
                    {examLocations.map((location, idx) => (
                        <span
                            key={idx}
                            className="px-3 py-1.5 bg-gray-50 hover:bg-indigo-50 rounded-lg text-sm text-gray-700 transition-all duration-200 flex items-center gap-1 border border-gray-100"
                        >
                            <MapPin
                                size={12}
                                className="text-indigo-400"
                            />
                            {location}
                        </span>
                    ))}
                </div>
            </div>

            {/* Eligibility + Responsibilities */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">

                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <div className="flex items-center gap-3 mb-5">
                        <div className="w-10 h-10 bg-linear-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                            <GraduationCap
                                size={18}
                                className="text-white"
                            />
                        </div>

                        <h2 className="text-xl font-bold text-gray-800">
                            Eligibility Criteria
                        </h2>
                    </div>

                    <div className="space-y-3">
                        {[
                            {
                                label: "Age",
                                value: "21 Years & Above",
                            },
                            {
                                label: "Qualification",
                                value: "Graduate (Mandatory)",
                            },
                            {
                                label: "Gender",
                                value: "Male & Female",
                            },
                            {
                                label: "Experience",
                                value: "Freshers & Experienced Welcome",
                            },
                            {
                                label: "Project Duration",
                                value: "20-25 Days",
                            },
                        ].map((item, idx) => (
                            <div
                                key={idx}
                                className="flex items-center gap-2 p-2"
                            >
                                <CheckCircle
                                    size={16}
                                    className="text-green-500"
                                />

                                <span className="text-gray-700">
                                    <span className="font-semibold">
                                        {item.label}:
                                    </span>{" "}
                                    {item.value}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <div className="flex items-center gap-3 mb-5">
                        <div className="w-10 h-10 bg-linear-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                            <Eye
                                size={18}
                                className="text-white"
                            />
                        </div>

                        <h2 className="text-xl font-bold text-gray-800">
                            Roles & Responsibilities
                        </h2>
                    </div>

                    <div className="space-y-3">
                        {responsibilities.map((resp, idx) => (
                            <div
                                key={idx}
                                className="flex items-start gap-2 p-2"
                            >
                                <ChevronRight
                                    size={16}
                                    className="text-purple-500 mt-0.5"
                                />

                                <span className="text-gray-700 text-sm">
                                    {resp}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Application Process + Contact */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">

                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <div className="flex items-center gap-3 mb-5">
                        <div className="w-10 h-10 bg-linear-to-r from-green-500 to-teal-500 rounded-xl flex items-center justify-center">
                            <FileCheck
                                size={18}
                                className="text-white"
                            />
                        </div>

                        <h2 className="text-xl font-bold text-gray-800">
                            Application Process
                        </h2>
                    </div>

                    <div className="space-y-4">
                        {applicationSteps.map((step, idx) => (
                            <div
                                key={idx}
                                className="flex items-center gap-3"
                            >
                                <div className="w-8 h-8 bg-linear-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                                    {idx + 1}
                                </div>

                                <span className="text-gray-700">
                                    {step}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <div className="flex items-center gap-3 mb-5">
                        <div className="w-10 h-10 bg-linear-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
                            <Phone
                                size={18}
                                className="text-white"
                            />
                        </div>

                        <h2 className="text-xl font-bold text-gray-800">
                            Contact Details
                        </h2>
                    </div>

                    <p className="text-gray-600">
                        HR:
                        <span className="font-semibold text-gray-800">
                            {" "}
                            Pratik Yeola
                        </span>
                    </p>

                    <div className="mt-3 space-y-2">
                        <a
                            href="tel:7767933022"
                            className="flex items-center gap-2 text-indigo-600"
                        >
                            <Phone size={14} />
                            7767933022
                        </a>

                        <a
                            href="https://wa.me/7972200682"
                            className="flex items-center gap-2 text-green-600"
                        >
                            <MessageCircle size={14} />
                            7972200682
                        </a>

                        <a
                            href="mailto:careers@sulai.com"
                            className="flex items-center gap-2 text-gray-600"
                        >
                            <Mail size={14} />
                            careers@sulai.com
                        </a>
                    </div>
                </div>
            </div>

            {/* Highlights */}
            <div className="bg-linear-to-r from-indigo-50 to-purple-50 rounded-2xl p-6 mb-8">

                <div className="flex items-center gap-3 mb-5">
                    <div className="w-10 h-10 bg-linear-to-r from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center">
                        <Star
                            size={18}
                            className="text-white"
                        />
                    </div>

                    <h2 className="text-xl font-bold text-gray-800">
                        Why Join Us?
                    </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                    {keyHighlights.map((item, idx) => (
                        <div
                            key={idx}
                            className={`bg-linear-to-r ${item.color} rounded-xl p-3 text-center text-white shadow-md hover:scale-105 transition-all`}
                        >
                            <item.icon
                                size={20}
                                className="mx-auto mb-2"
                            />

                            <p className="text-xs font-semibold">
                                {item.text}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">

                <h3 className="font-semibold text-gray-800 mb-4 text-center">
                    Quick Actions
                </h3>

                <div className="flex justify-center">
                    <button
                        onClick={openApplicationForm}
                        className="px-6 py-3 bg-linear-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold hover:scale-105 transition-all flex items-center gap-2"
                    >
                        <PlusCircle size={18} />
                        Apply Now
                    </button>
                </div>
            </div>
        </>
    );
}