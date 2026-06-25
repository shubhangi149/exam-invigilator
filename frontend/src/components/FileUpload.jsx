function FileUpload({
    label,
    register,
    name,
    errors,
}) {
    return (
        <div className="bg-white p-5 rounded-xl shadow">
            <label className="font-medium block mb-3">
                {label}
            </label>

            <p className="text-gray-600 text-sm mb-3">
                Upload 1 supported file: PDF, document or image. Max 10 MB.
            </p>

            <input
                type="file"
                accept="image/*,.pdf"
                {...register(name, {
                    required: `${label} is required`,
                })}
            />
            {errors[name] && (
                <p className="text-red-500 text-sm mt-2">
                    {errors[name].message}
                </p>
            )}
        </div>
    );
}

export default FileUpload;