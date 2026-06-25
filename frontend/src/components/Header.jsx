import { Briefcase } from "lucide-react";

export default function Header() {
  return (
    <div className="bg-white rounded-3xl border border-gray-200 overflow-hidden">
      <div className="h-2 bg-indigo-600"></div>

      <div className="p-8">
        <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-semibold">
          <Briefcase size={16} />
          HIRING NOW
        </div>

        <h1 className="text-4xl font-bold text-slate-800 mt-4">
          Exam Lab Invigilator
        </h1>

        <p className="text-slate-500 mt-3">
          Complete the application form below to apply.
        </p>
      </div>
    </div>
  );
}