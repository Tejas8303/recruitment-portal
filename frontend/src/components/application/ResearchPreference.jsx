const researchAreas = [
    "Chemical & Biochemical Engineering - CBE",
    "Chemistry - CHEM",
    "Civil & Environmental Engineering - CEE",
    "Computer Science and Engineering - CSE",
    "Electrical Engineering - EE",
    "Humanities and Social Sciences - HSS",
    "Mathematics - MATHS",
    "Mechanical Engineering - ME",
    "Metallurgical & Materials Engineering - MME",
    "Physics - PHY",
];

function ResearchPreference({ handleChange }) {
    return (
        <div className="space-y-6">

            <h3 className="text-2xl font-bold">
                Area of Research
            </h3>
            <hr className="border-blue-500" />
            
            <div className="flex "></div>

            <div className="grid grid-cols-12 gap-4">

                <div className="col-span-6">
                    <label className="font-medium">
                        First Preference*
                    </label>
                    <select
                        name="research_pref_1"
                        required
                        className="input mt-1"
                        onChange={handleChange}
                    >
                        <option value="">Select</option>
                        {researchAreas.map((area) => (
                            <option key={area}>{area}</option>
                        ))}
                    </select>
                </div>

                <div className="col-span-6">
                    <label className="font-medium">
                        Second Preference
                    </label>
                    <select
                        name="research_pref_2"
                        className="input mt-1"
                        onChange={handleChange}
                    >
                        <option value="">Select</option>
                        {researchAreas.map((area) => (
                            <option key={area}>{area}</option>
                        ))}
                    </select>
                </div>

                <div className="col-span-6">
                    <label className="font-medium">
                        Third Preference
                    </label>
                    <select
                        name="research_pref_3"
                        className="input mt-1"
                        onChange={handleChange}
                    >
                        <option value="">Select</option>
                        {researchAreas.map((area) => (
                            <option key={area}>{area}</option>
                        ))}
                    </select>
                </div>

                <div className="col-span-6">
                    <label className="font-medium">
                        Fourth Preference
                    </label>
                    <select
                        name="research_pref_4"
                        className="input mt-1"
                        onChange={handleChange}
                    >
                        <option value="">Select</option>
                        {researchAreas.map((area) => (
                            <option key={area}>{area}</option>
                        ))}
                    </select>
                </div>

            </div>
        </div>
    );
}

export default ResearchPreference;