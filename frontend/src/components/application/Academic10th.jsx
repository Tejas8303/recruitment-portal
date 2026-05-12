import { years } from "../../constants/years";

function Academic10th({ handleChange }) {
  return (
    <div className="space-y-6">

      <hr className="border-blue-500" />

      <h4 className="text-lg font-semibold text-pink-700">
        10th/equivalent
      </h4>

      {/* First Row */}
      <div className="grid grid-cols-12 gap-4 items-end">

        {/* Exam Passed */}
        <div className="col-span-3">
          <label className="font-medium">Exam Passed</label>
          <input
            type="text"
            name="tenth_equi_exam_passed"
            value="10th/equivalent"
            readOnly
            className="input mt-1"
          />
        </div>

        {/* School Name */}
        <div className="col-span-3">
          <label className="font-medium">School Name*</label>
          <input
            type="text"
            name="tenth_equi_school_name"
            maxLength="200"
            placeholder="(200 char max) School Name"
            required
            className="input mt-1"
            onChange={handleChange}
          />
        </div>

        {/* Board Name */}
        <div className="col-span-3">
          <label className="font-medium">
            Board/University Name*
          </label>
          <input
            type="text"
            name="tenth_equi_board_name"
            maxLength="100"
            placeholder="(100 char max) Board/University Name"
            required
            className="input mt-1"
            onChange={handleChange}
          />
        </div>

        {/* Passing Year */}
        <div className="col-span-3">
          <label className="font-medium">Passing Year*</label>
          <select
            name="tenth_equi_passing_year"
            required
            className="input mt-1"
            onChange={handleChange}
          >
            <option value="">Select</option>
            {years.map((year) => (
              <option key={year}>{year}</option>
            ))}
          </select>
        </div>

      </div>

      {/* Second Row */}
      <div className="grid grid-cols-12 gap-4 items-end">

        {/* Percentage */}
        <div className="col-span-3">
          <label className="font-medium">
            Percentage/CGPA*
          </label>
          <input
            type="number"
            min="0"
            max="100"
            step=".01"
            name="tenth_equi_percentage"
            placeholder="Percentage/CGPA"
            required
            className="input mt-1"
            onChange={handleChange}
          />
        </div>

        {/* Out Of */}
        <div className="col-span-3">
          <label className="font-medium">Out of*</label>
          <select
            name="tenth_equi_out_of"
            required
            className="input mt-1"
            onChange={handleChange}
          >
            <option value="">Select</option>
            <option value="100">100</option>
            <option value="10">10</option>
            <option value="4">4</option>
          </select>
        </div>

        {/* Status */}
        <div className="col-span-3">
          <label className="font-medium">Status*</label>
          <select
            name="tenth_equi_complete_status"
            required
            className="input mt-1"
            onChange={handleChange}
          >
            <option value="">Select</option>
            <option value="Completed">Completed</option>
            <option value="Ongoing">Ongoing</option>
          </select>
        </div>

        {/* Notes */}
        <div className="col-span-3">
          <label className="font-medium">Notes If Any</label>
          <input
            type="text"
            name="tenth_equi_notes_if_any"
            maxLength="100"
            placeholder="(100 char max) Notes If Any"
            className="input mt-1"
            onChange={handleChange}
          />
        </div>

      </div>

    </div>
  );
}

export default Academic10th;