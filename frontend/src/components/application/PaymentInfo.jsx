function PaymentInfo({ handleChange }) {
  return (
    <div className="space-y-6">

      <hr className="border-blue-500" />

      <h2 className="text-2xl font-bold">Payment info</h2>

      <p>
        Go to Payment and put the Payment Reference No. after successful Payment!!
      </p>

      <p className="text-red-600 font-medium">
        Save the PDF of the transaction, you need to attach later.!!
      </p>

      <div className="space-y-2">
        <p>Payment Amount</p>
        <p>1. General/EWS/OBC-NCL: Rs. 1000</p>
        <p>2. SC/ST/PwD/Women: Rs. 500</p>
      </div>

      <p>
        Link for payment:{" "}
        <a
          href="https://www.onlinesbi.sbi/sbicollect/icollecthome.htm"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline"
        >
          https://www.onlinesbi.sbi/sbicollect/icollecthome.htm
        </a>
      </p>

      {/* Payment Fields */}
      <div className="grid grid-cols-12 gap-4 items-center mt-6">

        {/* Payment Method */}
        <label className="label">
          Payment Method*
        </label>
        <div className="field">
          <select
            name="payment_method"
            required
            className="input"
            onChange={handleChange}
          >
            <option value="">Select</option>
            <option value="SBI Collect">SBI Collect</option>
          </select>
        </div>

        {/* Payment Reference Number */}
        <label className="label">
          Payment Reference Number*
        </label>
        <div className="field">
          <input
            type="text"
            name="payment_reference_number"
            maxLength="100"
            placeholder="(100 char max) payment_reference_number"
            required
            className="input"
            onChange={handleChange}
          />
        </div>

        {/* Amount */}
        <label className="label">
          Amount*
        </label>
        <div className="field">
          <select
            name="payment_amount"
            required
            className="input"
            onChange={handleChange}
          >
            <option value="">Select</option>
            <option value="1000">1000</option>
            <option value="500">500</option>
          </select>
        </div>

      </div>

    </div>
  );
}

export default PaymentInfo;