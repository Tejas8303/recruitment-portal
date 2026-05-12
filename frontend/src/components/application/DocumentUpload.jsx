function DocumentUpload({ handleFileChange }) {
  return (
    <div className="space-y-6">

      <h3 className="text-2xl font-bold text-gray-800">
        Upload Documents
      </h3>

      <div className="grid grid-cols-12 gap-6">

        {/* ID Proof */}
        <div className="col-span-6 flex flex-col">
          <label className="mb-2 font-medium">ID Proof (PDF)*</label>
          <input
            type="file"
            name="id_proof"
            accept=".pdf"
            onChange={handleFileChange}
            className="border border-gray-300 rounded-lg p-2 cursor-pointer
            file:mr-4 file:py-2 file:px-4 file:rounded-md
            file:border-0 file:text-sm file:font-semibold
            file:bg-blue-50 file:text-blue-700
            hover:file:bg-blue-100"
          />
        </div>

        {/* Photo */}
        <div className="col-span-6 flex flex-col">
          <label className="mb-2 font-medium">Personal Photo (JPG)*</label>
          <input
            type="file"
            name="photo"
            accept=".jpg,.jpeg"
            onChange={handleFileChange}
            className="border border-gray-300 rounded-lg p-2 cursor-pointer
            file:mr-4 file:py-2 file:px-4 file:rounded-md
            file:border-0 file:text-sm file:font-semibold
            file:bg-blue-50 file:text-blue-700
            hover:file:bg-blue-100"
          />
        </div>

        {/* Caste Certificate */}
        <div className="col-span-6 flex flex-col">
          <label className="mb-2 font-medium">Caste Certificate</label>
          <input
            type="file"
            name="caste"
            accept=".pdf"
            onChange={handleFileChange}
            className="border border-gray-300 rounded-lg p-2 cursor-pointer
            file:mr-4 file:py-2 file:px-4 file:rounded-md
            file:border-0 file:text-sm file:font-semibold
            file:bg-blue-50 file:text-blue-700
            hover:file:bg-blue-100"
          />
        </div>

        {/* GATE / NET */}
        <div className="col-span-6 flex flex-col">
          <label className="mb-2 font-medium">GATE / NET Score</label>
          <input
            type="file"
            name="gate_score_doc"
            accept=".pdf"
            onChange={handleFileChange}
            className="border border-gray-300 rounded-lg p-2 cursor-pointer
            file:mr-4 file:py-2 file:px-4 file:rounded-md
            file:border-0 file:text-sm file:font-semibold
            file:bg-blue-50 file:text-blue-700
            hover:file:bg-blue-100"
          />
        </div>

        {/* Academic */}
        <div className="col-span-6 flex flex-col">
          <label className="mb-2 font-medium">Academic / Experience</label>
          <input
            type="file"
            name="academic_docs"
            accept=".pdf"
            onChange={handleFileChange}
            className="border border-gray-300 rounded-lg p-2 cursor-pointer
            file:mr-4 file:py-2 file:px-4 file:rounded-md
            file:border-0 file:text-sm file:font-semibold
            file:bg-blue-50 file:text-blue-700
            hover:file:bg-blue-100"
          />
        </div>

        {/* Payment Receipt */}
        <div className="col-span-6 flex flex-col">
          <label className="mb-2 font-medium">Payment Receipt*</label>
          <input
            type="file"
            name="payment_receipt"
            accept=".pdf"
            onChange={handleFileChange}
            className="border border-gray-300 rounded-lg p-2 cursor-pointer
            file:mr-4 file:py-2 file:px-4 file:rounded-md
            file:border-0 file:text-sm file:font-semibold
            file:bg-blue-50 file:text-blue-700
            hover:file:bg-blue-100"
          />
        </div>

      </div>
    </div>
  );
}

export default DocumentUpload;