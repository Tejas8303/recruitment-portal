import { useState } from "react";
import PersonalInfo from "../components/application/PersonalInfo";
import PaymentInfo from "../components/application/PaymentInfo";
import Academic10th from "../components/application/Academic10th";
import Academic12th from "../components/application/Academic12th";
import Undergraduate from "../components/application/Undergraduate";
import PostgraduateSection from "../components/application/PostgraduateSection";
import WorkExperienceBlock from "../components/application/WorkExperienceBlock";
import ResearchPreference from "../components/application/ResearchPreference";
import GateDetails from "../components/application/GateDetails";
import NetDstDetails from "../components/application/NetDstDetails";
import DocumentUpload from "../components/application/DocumentUpload";
import Declaration from "../components/application/Declaration";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api/axios";

function ApplicationForm() {
    const [formData, setFormData] = useState({});
    const { projectId } = useParams();
    const [files, setFiles] = useState({});
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const form = e.target;
            const formDataObj = new FormData(form);

            // convert to normal object
            const formValues = {};
            formDataObj.forEach((value, key) => {
                formValues[key] = value;
            });

            console.log("FORM VALUES:", formValues);

            const data = new FormData();
            data.append("projectId", projectId);
            data.append("applicantName", formValues.personal_full_name);
            data.append("formData", JSON.stringify(formValues));

            // append files
            Object.keys(files).forEach((key) => {
                data.append(key, files[key]);
            });

            await API.post("/applications", data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            alert("Application Submitted Successfully!");
            navigate("/dashboard");

        } catch (error) {
            console.log("Backend error:", error.response?.data);
            alert("Submission failed. Please check the required fields.");
        }
    };

    const handleFileChange = (e) => {
        setFiles({
            ...files,
            [e.target.name]: e.target.files[0],
        });
    };

    return (
        <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto mb-8">
               <button 
                  onClick={() => navigate("/dashboard")}
                  className="flex items-center text-sm font-medium text-slate-500 hover:text-indigo-600 transition-colors"
               >
                  <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  Back to Dashboard
               </button>
            </div>
            <form
                onSubmit={handleSubmit}
                className="max-w-6xl mx-auto bg-white p-8 md:p-12 rounded-3xl shadow-xl space-y-12 border border-slate-100"
            >
                <div className="text-center pb-8 border-b border-slate-100">
                   <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-indigo-100 text-indigo-600 mb-6">
                     <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                     </svg>
                   </div>
                   <h1 className="text-4xl font-extrabold text-slate-800 tracking-tight">
                       PhD Application Registration
                   </h1>
                   <p className="mt-4 text-lg text-slate-500 max-w-2xl mx-auto">
                       Please fill out all the required information below carefully to submit your application.
                   </p>
                </div>

                <PersonalInfo
                    formData={formData}
                    handleChange={handleChange}
                />

                <PaymentInfo handleChange={handleChange} />

                <div className="pt-8 mt-8 border-t border-slate-100">
                   <h3 className="text-2xl font-bold text-slate-800 mb-6 flex items-center">
                       <span className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-sm mr-3">1</span>
                       Academic Qualifications
                   </h3>
                </div>

                <Academic10th handleChange={handleChange} />
                <Academic12th handleChange={handleChange} />
                <Undergraduate handleChange={handleChange} />
                
                <PostgraduateSection
                    title="Postgraduate I"
                    exampassed="Postgraduate"
                    prefix="pg1"
                    handleChange={handleChange}
                />

                <PostgraduateSection
                    title="Postgraduate II"
                    exampassed="Postgraduate"
                    prefix="pg2"
                    handleChange={handleChange}
                />

                <PostgraduateSection
                    title="Any Other Degree"
                    exampassed="UG/PG"
                    prefix="other_degree"
                    handleChange={handleChange}
                />
                
                <div className="pt-8 mt-8 border-t border-slate-100">
                   <h3 className="text-2xl font-bold text-slate-800 mb-6 flex items-center">
                       <span className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-sm mr-3">2</span>
                       Work Experience
                   </h3>
                </div>
                
                <WorkExperienceBlock index={1} handleChange={handleChange} />
                <WorkExperienceBlock index={2} handleChange={handleChange} />
                <WorkExperienceBlock index={3} handleChange={handleChange} />

                <div className="pt-8 mt-8 border-t border-slate-100">
                   <h3 className="text-2xl font-bold text-slate-800 mb-6 flex items-center">
                       <span className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-sm mr-3">3</span>
                       Research & Other Details
                   </h3>
                </div>
                
                <ResearchPreference />
                <GateDetails />
                <NetDstDetails />
                <DocumentUpload handleFileChange={handleFileChange} />
                <Declaration />

            </form>
        </div>
    );
}

export default ApplicationForm;