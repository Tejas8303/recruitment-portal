import { years } from "../../constants/years";
import { ugDisciplines } from "../../constants/ugDisciplines";

function PostgraduateSection({ title,exampassed, prefix, handleChange }) {
  return (
    <div className="space-y-6">

      <h4 className="text-lg font-semibold text-pink-700">
        {title}
      </h4>

      {/* Row 1 */}
      <div className="grid grid-cols-12 gap-4 items-end">

        {/* Exam Passed */}
        <div className="col-span-3">
          <label className="font-medium">Exam Passed</label>
          <input
            type="text"
            name={`${prefix}_exam_passed`}
            value={exampassed}
            readOnly
            className="input mt-1"
          />
        </div>

        {/* Degree Name */}
        <div className="col-span-3">
          <label className="font-medium">
            Degree Name
          </label>
          <input
            type="text"
            name={`${prefix}_degree_name`}
            placeholder="Degree Name"
            className="input mt-1"
            onChange={handleChange}
          />
        </div>

        {/* Discipline */}
        <div className="col-span-3">
          <label className="font-medium">
            Discipline
          </label>
          <select
            name={`${prefix}_discipline`}
            className="input mt-1"
            onChange={handleChange}
          >
            <option value="">Select</option>
            {ugDisciplines.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </div>

        {/* College */}
        <div className="col-span-3">
          <label className="font-medium">
            College Name
          </label>
          <input
            type="text"
            name={`${prefix}_college_name`}
            maxLength="100"
            placeholder="College Name"
            className="input mt-1"
            onChange={handleChange}
          />
        </div>

      </div>

      {/* Row 2 */}
      <div className="grid grid-cols-12 gap-4 items-end">

        {/* University */}
        <div className="col-span-3">
          <label className="font-medium">
            University Name
          </label>
          <input
            type="text"
            name={`${prefix}_university_name`}
            maxLength="100"
            placeholder="University Name"
            className="input mt-1"
            onChange={handleChange}
          />
        </div>

        {/* Passing Year */}
        <div className="col-span-3">
          <label className="font-medium">
            Passing Year
          </label>
          <select
            name={`${prefix}_passing_year`}
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
            Percentage/CGPA
          </label>
          <input
            type="number"
            step=".01"
            name={`${prefix}_percentage`}
            placeholder="Percentage/CGPA"
            className="input mt-1"
            onChange={handleChange}
          />
        </div>

        {/* Out Of */}
        <div className="col-span-3">
          <label className="font-medium">
            Out of
          </label>
          <select
            name={`${prefix}_out_of`}
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
            Complete Status
          </label>
          <select
            name={`${prefix}_complete_status`}
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
            name={`${prefix}_notes_if_any`}
            maxLength="100"
            placeholder="Notes"
            className="input mt-1"
            onChange={handleChange}
          />
        </div>

      </div>

    </div>
  );
}

export default PostgraduateSection;