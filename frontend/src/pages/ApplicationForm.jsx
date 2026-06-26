import { useState } from "react";
import axios from "axios";
import Header from "../components/Header";
import Notice from "../components/Notice";
import ContactSection from "../components/ContactSection";
import InputField from "../components/InputField";
import UploadCard from "../components/UploadCard";
import documents from "../data/documents";


export default function ApplicationForm() {
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const [formData, setFormData] = useState({
        name: "",
        mobile: "",
        email: "",
        city: "",
        current_city: "",
        education: "",
        dob: ""
    });

    const [files, setFiles] = useState({
        aadhaar_front: null,
        aadhaar_back: null,
        pan_card: null,
        passport_photo: null
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        // Clear error for this field when user starts typing
        if (errors[e.target.name]) {
            setErrors({
                ...errors,
                [e.target.name]: ""
            });
        }
    };

    const handleFileChange = (field, file) => {
        setFiles((prev) => ({ ...prev, [field]: file }));
        // Clear error for this file field
        if (errors[field]) {
            setErrors({
                ...errors,
                [field]: ""
            });
        }
    };

    const validateForm = () => {
        const newErrors = {};
        
        // Check all text fields
        if (!formData.name.trim()) newErrors.name = "Name is required";
        if (!formData.mobile.trim()) newErrors.mobile = "Mobile number is required";
        if (!formData.email.trim()) newErrors.email = "Email is required";
        if (!formData.city.trim()) newErrors.city = "Preferred city is required";
        if (!formData.current_city.trim()) newErrors.current_city = "Current city is required";
        if (!formData.education.trim()) newErrors.education = "Education qualification is required";
        if (!formData.dob.trim()) newErrors.dob = "Date of birth is required";
        
        // Check all file uploads
        if (!files.aadhaar_front) newErrors.aadhaar_front = "Aadhaar front is required";
        if (!files.aadhaar_back) newErrors.aadhaar_back = "Aadhaar back is required";
        if (!files.pan_card) newErrors.pan_card = "PAN card is required";
        if (!files.passport_photo) newErrors.passport_photo = "Passport photo is required";
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async () => {
        if (!validateForm()) {
            return;
        }

        try {
            setLoading(true);
            const payload = new FormData();
            payload.append("name", formData.name);
            payload.append("mobile", formData.mobile);
            payload.append("email", formData.email);
            payload.append("city", formData.city);
            payload.append("current_city", formData.current_city);
            payload.append("education", formData.education);
            payload.append("dob", formData.dob);
            payload.append("aadhaar_front", files.aadhaar_front);
            payload.append("aadhaar_back", files.aadhaar_back);
            payload.append("pan_card", files.pan_card);
            payload.append("passport_photo", files.passport_photo);

            const response = await axios.post(`${domain}/api/applications`, payload, { headers: { "Content-Type": "multipart/form-data" } });
            alert("Application submitted successfully");
            
            // Reset form after successful submission
            setFormData({
                name: "",
                mobile: "",
                email: "",
                city: "",
                current_city: "",
                education: "",
                dob: ""
            });
            setFiles({
                aadhaar_front: null,
                aadhaar_back: null,
                pan_card: null,
                passport_photo: null
            });
            setErrors({});
        } catch (error) {
            console.error(error);
            alert(error?.response?.data?.detail || "Submission failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-100 py-10 px-4">
            <div className="max-w-4xl mx-auto">

                <Header />
                <Notice />
                <ContactSection />

                <div className="bg-white rounded-3xl border border-gray-200 mt-6 p-6 md:p-8">
                    <h2 className="text-2xl font-bold mb-8">
                        Application Form
                    </h2>

                    <div className="space-y-6">
                        <InputField
                            label="Full Name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            error={errors.name}
                            required
                        />

                        <InputField
                            label="Mobile Number"
                            name="mobile"
                            value={formData.mobile}
                            onChange={handleChange}
                            error={errors.mobile}
                            required
                        />

                        <InputField
                            label="Email Address"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            error={errors.email}
                            required
                        />

                        <InputField
                            label="Preferred City"
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            error={errors.city}
                            required
                        />

                        <InputField
                            label="Current City"
                            name="current_city"
                            value={formData.current_city}
                            onChange={handleChange}
                            error={errors.current_city}
                            required
                        />

                        <InputField
                            label="Education Qualification"
                            name="education"
                            value={formData.education}
                            onChange={handleChange}
                            error={errors.education}
                            required
                        />

                        <InputField
                            label="Date of Birth"
                            name="dob"
                            value={formData.dob}
                            onChange={handleChange}
                            type="date"
                            max={new Date().toISOString().split("T")[0]}
                            error={errors.dob}
                            required
                        />
                    </div>

                    <div className="mt-12 space-y-6">
                        <UploadCard
                            title="Aadhaar Front"
                            onFileChange={(file) => handleFileChange("aadhaar_front", file)}
                            error={errors.aadhaar_front}
                            required
                        />

                        <UploadCard
                            title="Aadhaar Back"
                            onFileChange={(file) => handleFileChange("aadhaar_back", file)}
                            error={errors.aadhaar_back}
                            required
                        />

                        <UploadCard
                            title="PAN Card"
                            onFileChange={(file) => handleFileChange("pan_card", file)}
                            error={errors.pan_card}
                            required
                        />

                        <UploadCard
                            title="Passport Photo"
                            onFileChange={(file) => handleFileChange("passport_photo", file)}
                            error={errors.passport_photo}
                            required
                        />
                    </div>

                    <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className="w-full mt-8 bg-indigo-600 text-white py-4 rounded-xl"
                    >
                        {loading
                            ? "Submitting..."
                            : "Submit Application"}
                    </button>

                </div>

            </div>
        </div>
    );
}