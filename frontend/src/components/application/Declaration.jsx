function Declaration({ handleChange }) {
  return (
    <div className="space-y-6">

      <h3 className="text-2xl font-bold">
        Declaration
      </h3>

      <label className="flex gap-3 items-start">
        <input
          type="checkbox"
          name="declaration"
          required
          onChange={handleChange}
        />

        <span className="text-sm">
          I hereby declare that the entries made in this application
          form are correct to the best of my knowledge and belief.
          If selected for admission, I promise to abide by the rules
          and regulations of the Institute.
        </span>
      </label>

      <button
        type="submit"
        className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700"
      >
        Submit Application
      </button>

    </div>
  );
}

export default Declaration;