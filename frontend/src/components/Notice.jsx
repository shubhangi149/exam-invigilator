import { AlertTriangle } from "lucide-react";

export default function Notice() {
  return (
    <div className="mt-6 bg-amber-50 border border-amber-200 rounded-2xl p-5">
      <div className="flex gap-3">
        <AlertTriangle className="text-amber-600" />

        <div>
          <h3 className="font-semibold text-amber-700">
            Important Notice
          </h3>

          <p className="text-sm text-slate-700 mt-1">
            Please mention your preferred city carefully.
          </p>
        </div>
      </div>
    </div>
  );
}
