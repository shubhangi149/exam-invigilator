import {
    PlusCircle,
} from "lucide-react";

export default function DashboardHero({
    username,
    stats,
    openApplicationForm,
    isGuest = false,
    title = "Dashboard",
}) {
    return (
        <>
            {/* Top Action */}
            <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <h1 className="text-2xl font-bold text-gray-800">
                    {title}
                </h1>

                <button
                    onClick={openApplicationForm}
                    className="px-6 py-3 bg-linear-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-indigo-200 transition-all duration-300 hover:scale-105 flex items-center gap-2 w-full sm:w-auto justify-center"
                >
                    <PlusCircle size={20} />
                    Open Application Form
                </button>
            </div>

            {/* Hero Section */}
            <div className="relative overflow-hidden bg-[linear-gradient(90deg,#071845_0%,#122B73_50%,#54439E_100%)] rounded-2xl p-8 mb-8 text-white shadow-xl">

                <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -mr-48 -mt-48"></div>

                <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -ml-48 -mb-48"></div>

                <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">

                    <div>
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full text-sm font-semibold mb-5 backdrop-blur-md border border-white/10">

                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>

                                <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                            </span>

                            URGENT HIRING
                        </div>

                        <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
                            Exam Lab Invigilator
                        </h1>

                        <p className="text-lg text-white/90 mb-4">
                            Be a part of a fair & transparent examination process
                        </p>

                        <div className="w-32 h-px bg-white/20 mb-4"></div>

                        <p className="text-base text-white/80">
                            Welcome{" "}
                        </p>

                        <p className="text-white/80 mt-1">
                            You can apply for exam invigilator position here.
                        </p>
                    </div>

                    <div className="hidden lg:flex items-center justify-center">
                        <img
                            src="exam-invigilator.png"
                            alt="Exam Invigilator"
                            className="w-87.5 h-auto object-contain"
                        />
                    </div>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {stats.map((stat, idx) => (
                    <div
                        key={idx}
                        className="group bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                    >
                        <div
                            className={`w-12 h-12 bg-linear-to-r ${stat.color} rounded-xl flex items-center justify-center mb-3 transition-all duration-300 group-hover:scale-110`}
                        >
                            <stat.icon
                                size={20}
                                className="text-white"
                            />
                        </div>

                        <p className="text-2xl font-bold text-gray-800">
                            {stat.value}
                        </p>

                        <p className="text-sm text-gray-500 mt-1">
                            {stat.label}
                        </p>
                    </div>
                ))}
            </div>
        </>
    );
}