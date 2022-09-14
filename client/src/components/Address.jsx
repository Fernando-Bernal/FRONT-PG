

function Address() {


  return (
    <div>
      <div className="pb-5 bg-[#2f3436] rounded-t border-b border-gray-400 overflow-visible">
        <span className="text-xl font-medium text-gray-100 block pb-3">
          Address
        </span>

        <div className="flex justify-center flex-col pt-3">
          <label className="text-xs text-gray-400 ">State</label>
          <input
            type="text"
            name="state"
            className="focus:outline-none w-full h-6 bg-gray-800 text-white placeholder-gray-300 text-sm border-b border-gray-600 py-4"
            placeholder="Arizona"
          />
        </div>

        <div className="flex justify-center flex-col pt-3">
          <label className="text-xs text-gray-400 ">City</label>
          <input
            type="text"
            name="city"
            className="focus:outline-none w-full h-6 bg-gray-800 text-white placeholder-gray-300 text-sm border-b border-gray-600 py-4"
            placeholder="Tucson"
          />
        </div>

        <div className="flex justify-center flex-col pt-3">
          <label className="text-xs text-gray-400 ">Line 1</label>
          <input
            type="text"
            name="line1"
            className="focus:outline-none w-full h-6 bg-gray-800 text-white placeholder-gray-300 text-sm border-b border-gray-600 py-4"
            placeholder="North Stone Avenue & W Alturas St"
          />
        </div>

        <div className="flex justify-center flex-col pt-3">
          <label className="text-xs text-gray-400 ">Postal code</label>
          <input
            type="text"
            name="postal_code"
            className="focus:outline-none w-full h-6 bg-gray-800 text-white placeholder-gray-300 text-sm border-b border-gray-600 py-4"
            placeholder="AZ85705"
          />
        </div>
      </div>
    </div>
  );
}

export default Address;
