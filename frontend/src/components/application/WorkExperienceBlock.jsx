import { useState } from "react";
import { calculateExperience } from "../../constants/calculateExperience";

function WorkExperienceBlock({ index, handleChange }) {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [duration, setDuration] = useState("");

  const updateDuration = (start, end) => {
    const value = calculateExperience(start, end);
    setDuration(value);
  };

  return (
    
    <div className="border border-gray-300 p-6 rounded-xl space-y-4">

      <h4 className="text-lg font-semibold text-pink-700">
        Experience {index}
      </h4>

      <div className="grid grid-cols-12 gap-4 items-end">

        {/* Experience Type */}
        <div className="col-span-3">
          <label className="font-medium">Work Experience Type</label>
          <select
            name={`work_${index}_type`}
            className="input mt-1"
            onChange={handleChange}
          >
            <option value="">Select</option>
            <option>Industry</option>
            <option>Research</option>
            <option>Teaching</option>
          </select>
        </div>

        {/* Organization */}
        <div className="col-span-3">
          <label className="font-medium">Organization Name</label>
          <input
            type="text"
            name={`work_${index}_organization`}
            maxLength="100"
            placeholder="Organization Name"
            className="input mt-1"
            onChange={handleChange}
          />
        </div>

        {/* Position */}
        <div className="col-span-3">
          <label className="font-medium">Position</label>
          <input
            type="text"
            name={`work_${index}_position`}
            maxLength="100"
            placeholder="Position"
            className="input mt-1"
            onChange={handleChange}
          />
        </div>

      </div>

      <div className="grid grid-cols-12 gap-4 items-end">

        {/* From Date */}
        <div className="col-span-3">
          <label className="font-medium">From Date</label>
          <input
            type="date"
            name={`work_${index}_from_date`}
            className="input mt-1"
            onChange={(e) => {
              setFromDate(e.target.value);
              updateDuration(e.target.value, toDate);
              handleChange(e);
            }}
          />
        </div>

        {/* To Date */}
        <div className="col-span-3">
          <label className="font-medium">To Date</label>
          <input
            type="date"
            name={`work_${index}_to_date`}
            className="input mt-1"
            onChange={(e) => {
              setToDate(e.target.value);
              updateDuration(fromDate, e.target.value);
              handleChange(e);
            }}
          />
        </div>

        {/* Duration */}
        <div className="col-span-3">
          <label className="font-medium">
            Experience Duration
          </label>
          <input
            type="text"
            value={duration}
            readOnly
            name={`work_${index}_experience_duration`}
            className="input mt-1"
          />
        </div>

        {/* Current Job */}
        <div className="col-span-3">
          <label className="font-medium">Current Job</label>
          <select
            name={`work_${index}_current_job`}
            className="input mt-1"
            onChange={handleChange}
          >
            <option value="">Select</option>
            <option>Yes</option>
            <option>No</option>
          </select>
        </div>

      </div>

      <div className="grid grid-cols-12 gap-4">

        {/* Nature of Work */}
        <div className="col-span-6">
          <label className="font-medium">Nature of Work</label>
          <input
            type="text"
            name={`work_${index}_nature_of_work`}
            maxLength="100"
            placeholder="Nature of Work"
            className="input mt-1"
            onChange={handleChange}
          />
        </div>

      </div>

    </div>
  );
}

export default WorkExperienceBlock;