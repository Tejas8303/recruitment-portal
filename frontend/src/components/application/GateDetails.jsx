function GateDetails({ handleChange }) {
    return (
        <div className="space-y-6">

            <h3 className="text-2xl font-bold">
                GATE Exam Details
            </h3>
            <hr className="border-blue-500" />
            <div className="grid grid-cols-12 gap-4">

                <div className="col-span-4">
                    <label className="font-medium">
                        GATE Registration No.*
                    </label>
                    <input
                        type="text"
                        name="gate_registration_no"
                        maxLength="13"
                        placeholder="Gate Registration No."
                        className="input mt-1"
                        onChange={handleChange}
                    />
                </div>

                <div className="col-span-4">
                    <label className="font-medium">
                        GATE Paper Code*
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
                        GATE Score (out of 1000)*
                    </label>
                    <input
                        type="number"
                        name="gate_score"
                        className="input mt-1"
                        placeholder="GATE Score out of 1000"
                        onChange={handleChange}
                    />
                </div>

                <div className="col-span-4">
                    <label className="font-medium">
                        GATE Rank*
                    </label>
                    <input
                        type="number"
                        name="gate_rank"
                        className="input mt-1"
                        placeholder="Gate Rank"
                        onChange={handleChange}
                    />
                </div>

                <div className="col-span-4">
                    <label className="font-medium">
                        GATE Valid From*
                    </label>
                    <input
                        type="date"
                        name="gate_valid_from"
                        className="input mt-1"
                        onChange={handleChange}
                    />
                </div>

                <div className="col-span-4">
                    <label className="font-medium">
                        Valid Upto*
                    </label>
                    <input
                        type="date"
                        name="gate_valid_upto"
                        className="input mt-1"
                        onChange={handleChange}
                    />
                </div>

            </div>
        </div>
    );
}

export default GateDetails;