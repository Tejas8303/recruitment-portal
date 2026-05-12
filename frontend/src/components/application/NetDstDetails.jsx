function NetDstDetails({ handleChange }) {
    return (
        <div className="space-y-6">

            <h3 className="text-2xl font-bold">
                NET / DST Exam Details
            </h3>
            <hr className="border-blue-500" />
            <div className="grid grid-cols-12 gap-4">

                <div className="col-span-4">
                    <label className="font-medium">
                        JRF Qualified Status*
                    </label>
                    <select
                        name="jrf_status"
                        className="input mt-1"
                        onChange={handleChange}
                    >
                        <option value="">Select</option>
                        <option>Yes</option>
                        <option>No</option>
                    </select>
                </div>

                <div className="col-span-4">
                    <label className="font-medium">
                        JRF Valid From
                    </label>
                    <input
                        type="date"
                        name="jrf_valid_from"
                        className="input mt-1"
                        onChange={handleChange}
                    />
                </div>

                <div className="col-span-4">
                    <label className="font-medium">
                        JRF Valid Upto
                    </label>
                    <input
                        type="date"
                        name="jrf_valid_upto"
                        className="input mt-1"
                        onChange={handleChange}
                    />
                </div>

                <div className="col-span-4">
                    <label className="font-medium">
                        Roll No.
                    </label>
                    <input
                        type="text"
                        name="gate_registration_no"
                        maxLength="13"
                        className="input mt-1"
                        onChange={handleChange}
                    />
                </div>

                <div className="col-span-4">
                    <label className="font-medium">
                        Subject
                    </label>
                    <input
                        type="text"
                        name="gate_paper_code"
                        className="input mt-1"
                        onChange={handleChange}
                    />
                </div>

                <div className="col-span-4">
                    <label className="font-medium">
                        Marks obtained
                    </label>
                    <input
                        type="number"
                        name="gate_score"
                        className="input mt-1"
                        onChange={handleChange}
                    />
                </div>

                <div className="col-span-4">
                    <label className="font-medium">
                        DST Qualified Status*
                    </label>
                    <select
                        name="jrf_status"
                        className="input mt-1"
                        onChange={handleChange}
                    >
                        <option value="">Select</option>
                        <option>Yes</option>
                        <option>No</option>
                    </select>
                </div>

                <div className="col-span-4">
                    <label className="font-medium">
                        DST Valid From
                    </label>
                    <input
                        type="date"
                        name="jrf_valid_from"
                        className="input mt-1"
                        onChange={handleChange}
                    />
                </div>

                <div className="col-span-4">
                    <label className="font-medium">
                        DST Valid Upto
                    </label>
                    <input
                        type="date"
                        name="jrf_valid_upto"
                        className="input mt-1"
                        onChange={handleChange}
                    />
                </div>


            </div>
        </div>
    );
}

export default NetDstDetails;