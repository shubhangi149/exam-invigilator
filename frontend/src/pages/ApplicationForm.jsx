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
    };

    const handleFileChange = (field, file) => {
        setFiles((prev) => ({ ...prev, [field]: file }));
    };

    const handleSubmit = async () => {
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

            const response = await axios.post("http://localhost:5000/api/applications", payload, { headers: { "Content-Type": "multipart/form-data" } });
            alert("Application submitted successfully");
        } catch (error) {
            console.error(error);
            alert(error?.response?.data?.detail || "Submission failed");
        } finally {
            setLoading(false);
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
                        />

                        <InputField
                            label="Mobile Number"
                            name="mobile"
                            value={formData.mobile}
                            onChange={handleChange}
                        />

                        <InputField
                            label="Email Address"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                        />

                        <InputField
                            label="Preferred City"
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                        />

                        <InputField
                            label="Current City"
                            name="current_city"
                            value={formData.current_city}
                            onChange={handleChange}
                        />

                        <InputField
                            label="Education Qualification"
                            name="education"
                            value={formData.education}
                            onChange={handleChange}
                        />

                        <InputField
                            label="Date of Birth"
                            name="dob"
                            value={formData.dob}
                            onChange={handleChange}
                            type="date"
                            max={new Date().toISOString().split("T")[0]}
                        />
                    </div>

                    <div className="mt-12 space-y-6">
                        <UploadCard
                            title="Aadhaar Front"
                            onFileChange={(file) => handleFileChange("aadhaar_front", file)}
                        />

                        <UploadCard
                            title="Aadhaar Back"
                            onFileChange={(file) => handleFileChange("aadhaar_back", file)}
                        />

                        <UploadCard
                            title="PAN Card"
                            onFileChange={(file) => handleFileChange("pan_card", file)}
                        />

                        <UploadCard
                            title="Passport Photo"
                            onFileChange={(file) => handleFileChange("passport_photo", file)}
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