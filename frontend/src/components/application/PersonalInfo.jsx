import { states } from "../../constants/states";
import { countries } from "../../constants/countries"

function PersonalInfo({ formData, handleChange }) {
  return (
    <div className="border border-gray-300 rounded-xl p-6 space-y-6">
      <h3 className="text-xl font-semibold">
        Personal Information
      </h3>

      <div className="grid grid-cols-12 gap-4 items-center">

        {/* Full Name */}
        <label className="label">Full Name*</label>
        <div className="field">
          <input
            type="text"
            name="personal_full_name"
            required
            className="input"
            value={formData.personal_full_name || ""}
            onChange={handleChange}
          />
        </div>

        {/* Gender */}
        <label className="label">Gender*</label>
        <div className="field">
          <select
            name="personal_gender"
            required
            className="input"
            onChange={handleChange}
          >
            <option value="">Select</option>
            <option>Male</option>
            <option>Female</option>
            <option>Others</option>
          </select>
        </div>

        {/* Father's Name */}
        <label className="label">Father's Name*</label>
        <div className="field">
          <input
            type="text"
            name="personal_fathers_name"
            pattern="[A-Za-z\s]+"
            required
            className="input"
            onChange={handleChange}
          />
        </div>

        {/* Date of Birth */}
        <label className="label">Date of Birth*</label>
        <div className="field">
          <input
            type="date"
            name="personal_date_of_birth"
            required
            className="input"
            onChange={handleChange}
          />
        </div>

        {/* Birth Category */}
        <label className="label">Birth Category*</label>
        <div className="field">
          <select
            name="personal_birth_category"
            required
            className="input"
            onChange={handleChange}
          >
            <option value="">Select</option>
            <option value="General">General/OBC(Creamy layer)</option>
            <option value="EWS">Economically Weaker Section</option>
            <option value="OBC_NCL">OBC(Non Creamy)</option>
            <option value="SC">Scheduled Caste</option>
            <option value="ST">Scheduled Tribes</option>
          </select>
        </div>

        {/* Address */}
        <label className="label">Address*</label>
        <div className="field">
          <input
            type="text"
            name="personal_address"
            maxLength="200"
            placeholder="(200 char max) Personal Address"
            required
            className="input"
            onChange={handleChange}
          />
        </div>

        {/* State */}
        <label className="label">State*</label>
        <div className="field">
          <select
            name="personal_state"
            required
            className="input"
            onChange={handleChange}
          >
            <option value="">Select</option>
            {states.map((state) => (
              <option key={state}>{state}</option>
            ))}
          </select>
        </div>



        {/* Pincode */}
        <label className="label">Pincode*</label>
        <div className="field">
          <input
            type="number"
            name="personal_pincode"
            pattern="^[0-9]{6}$"
            maxLength="6"
            required
            className="input"
            onChange={handleChange}
          />
        </div>

        <label className="label">Nationality*</label>
        <div className="field">
          <select
            name="personal_country"
            required
            className="input"
            onChange={handleChange}
          >
            {countries.map((state) => (
              <option key={state}>{state}</option>
            ))}
          </select>
        </div>

        {/* Contact */}
        <label className="label">Contact*</label>
        <div className="field">
          <input
            type="text"
            name="personal_contact"
            pattern="[4-9]{1}[0-9]{9}"
            maxLength="10"
            required
            className="input"
            onChange={handleChange}
          />
        </div>

        {/* Email */}
        <label className="label">Email*</label>
        <div className="field">
          <input
            type="email"
            name="personal_email"
            required
            className="input"
            onChange={handleChange}
          />
        </div>

        {/* Marital Status */}
        <label className="label">Marital Status*</label>
        <div className="field">
          <select
            name="personal_marital_status"
            required
            className="input"
            onChange={handleChange}
          >
            <option value="">Select</option>
            <option>Married</option>
            <option>Unmarried</option>
          </select>
        </div>

        {/* PwD */}
        <label className="label">
          Physically Handicapped (PwD)*
        </label>
        <div className="field">
          <select
            name="personal_disable_status"
            required
            className="input"
            onChange={handleChange}
          >
            <option value="">Select</option>
            <option>Yes</option>
            <option>No</option>
          </select>
        </div>

      </div>
    </div>
  );
}

export default PersonalInfo;