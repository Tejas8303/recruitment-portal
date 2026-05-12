import { years } from "../../constants/years";
import { ugDegrees } from "../../constants/ugDegrees";
import { ugDisciplines } from "../../constants/ugDisciplines";

function Undergraduate({ handleChange }) {
  return (
    <div className="space-y-6">

      <h4 className="text-lg font-semibold text-pink-700">
        Undergraduate
      </h4>

      {/* Row 1 */}
      <div className="grid grid-cols-12 gap-4 items-end">

        {/* Exam Passed */}
        <div className="col-span-3">
          <label className="font-medium">Exam Passed</label>
          <input
            type="text"
            name="ug_exam_passed"
            value="Undergraduate"
            readOnly
            className="input mt-1"
          />
        </div>

        {/* UG Degree Name */}
        <div className="col-span-3">
          <label className="font-medium">
            UG Degree Name*
          </label>
          <select
            name="ug_degree_name"
            required
            className="input mt-1"
            onChange={handleChange}
          >
            <option value="">Select</option>
            {ugDegrees.map((degree) => (
              <option key={degree}>{degree}</option>
            ))}
          </select>
        </div>

        {/* Discipline */}
        <div className="col-span-3">
          <label className="font-medium">
            Discipline*
          </label>
          <select
            name="ug_discipline"
            required
            className="input mt-1"
            onChange={handleChange}
          >
            <option value="">Select</option>
            {ugDisciplines.map((discipline) => (
              <option key={discipline}>{discipline}</option>
            ))}
          </select>
        </div>

        {/* College Name */}
        <div className="col-span-3">
          <label className="font-medium">
            College Name*
          </label>
          <input
            type="text"
            name="ug_college_name"
            maxLength="100"
            placeholder="(100 char max) College Name"
            required
            className="input mt-1"
            onChange={handleChange}
          />
        </div>

      </div>

      {/* Row 2 */}
      <div className="grid grid-cols-12 gap-4 items-end">

        {/* University Name */}
        <div className="col-span-3">
          <label className="font-medium">
            University Name*
          </label>
          <input
            type="text"
            name="ug_university_name"
            maxLength="200"
            placeholder="(200 char max) University Name"
            required
            className="input mt-1"
            onChange={handleChange}
          />
        </div>

        {/* Passing Year */}
        <div className="col-span-3">
          <label className="font-medium">
            Passing Year*
          </label>
          <select
            name="ug_passing_year"
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

        {/* Percentage */}
        <div className="col-span-3">
          <label className="font-medium">
            Percentage/CGPA*
          </label>
          <input
            type="number"
            min="0"
            step=".01"
            name="ug_percentage"
            placeholder="Percentage/CGPA"
            required
            className="input mt-1"
            onChange={handleChange}
          />
        </div>

        {/* Out Of */}
        <div className="col-span-3">
          <label className="font-medium">
            Out of*
          </label>
          <select
            name="ug_out_of"
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

      </div>

      {/* Row 3 */}
      <div className="grid grid-cols-12 gap-4 items-end">

        {/* Status */}
        <div className="col-span-3">
          <label className="font-medium">
            Status*
          </label>
          <select
            name="ug_complete_status"
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
          <label className="font-medium">
            Notes If Any
          </label>
          <input
            type="text"
            name="ug_notes_if_any"
            maxLength="200"
            placeholder="(200 char max) Notes If Any"
            className="input mt-1"
            onChange={handleChange}
          />
        </div>

      </div>

    </div>
  );
}

export default Undergraduate;