export default function InputField({label, name, value, onChange, type = "text"}) {
    return (
        <div>
            <label className="block font-medium text-slate-700 mb-2">{label}</label>

            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={`Enter ${label}`}
                className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
        </div>
    );
}