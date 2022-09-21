

function Address() {


  return (
    <div>
      <div className="pb-5 bg-[#000000] rounded-t border-b border-gray-400 overflow-visible">
        <span className="text-xl font-medium text-[#00ff01] block pb-3">
          Address
        </span>

        <div className="flex justify-center flex-col pt-3">
          <label className="text-xs text-[#00ff01] ">State</label>
          <input
            type="text"
            name="state"
            className="w-full h-6 bg-black text-white placeholder-[#00ff01] placeholder-opacity-25 text-sm border-b border-gray-600 py-4 hover:border-[#00ff01] focus:border-[#00ff01] rounded-md"
            placeholder="Your State"
          />
        </div>

        <div className="flex justify-center flex-col pt-3">
          <label className="text-xs text-[#00ff01] ">City</label>
          <input
            type="text"
            name="city"
            className="w-full h-6 bg-black text-white placeholder-[#00ff01] placeholder-opacity-25 text-sm border-b border-gray-600 py-4 hover:border-[#00ff01] focus:border-[#00ff01] rounded-md"
            placeholder="What city do you live in?"
          />
        </div>

        <div className="flex justify-center flex-col pt-3">
          <label className="text-xs text-[#00ff01] ">Line 1</label>
          <input
            type="text"
            name="line1"
            className="w-full h-6 bg-black text-white placeholder-[#00ff01] placeholder-opacity-25 text-sm border-b border-gray-600 py-4 hover:border-[#00ff01] focus:border-[#00ff01] rounded-md"
            placeholder="Your Address"
          />
        </div>

        <div className="flex justify-center flex-col pt-3">
          <label className="text-xs text-[#00ff01] ">Postal code</label>
          <input
            type="text"
            name="postal_code"
            className="w-full h-6 bg-black text-white placeholder-[#00ff01] placeholder-opacity-25 text-sm border-b border-gray-600 py-4 hover:border-[#00ff01] focus:border-[#00ff01] rounded-md"
            placeholder="What is your postal code?"
          />
        </div>
      </div>
    </div>
  );
}

export default Address;
