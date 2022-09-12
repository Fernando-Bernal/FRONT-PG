

function Address() {


  return (
    <div>
      <div className="pb-5 bg-[#2f3436] rounded-t border-b border-gray-400 overflow-visible">
        <span className="text-xl font-medium text-gray-100 block pb-3">
          Address
        </span>

        <div className="flex justify-center flex-col pt-3">
          <label className="text-xs text-gray-400 ">Name on City</label>
          <input
            type="text"
            name="city"
            className="focus:outline-none w-full h-6 bg-gray-800 text-white placeholder-gray-300 text-sm border-b border-gray-600 py-4"
            placeholder="Arizona"
          />
        </div>

        <div className="flex justify-center flex-col pt-3">
          <label className="text-xs text-gray-400 ">Line 1</label>
          <input
            type="text"
            name="line1"
            className="focus:outline-none w-full h-6 bg-gray-800 text-white placeholder-gray-300 text-sm border-b border-gray-600 py-4"
            placeholder="Line 1"
          />
        </div>

        <div className="flex justify-center flex-col pt-3">
          <label className="text-xs text-gray-400 ">Line 2</label>
          <input
            type="text"
            name="line2"
            className="focus:outline-none w-full h-6 bg-gray-800 text-white placeholder-gray-300 text-sm border-b border-gray-600 py-4"
            placeholder="Line 2"
          />
        </div>

        <div className="flex justify-center flex-col pt-3">
          <label className="text-xs text-gray-400 ">Name on state</label>
          <input
            type="text"
            name="state"
            className="focus:outline-none w-full h-6 bg-gray-800 text-white placeholder-gray-300 text-sm border-b border-gray-600 py-4"
            placeholder="state"
          />
        </div>
      </div>
    </div>
  );
}

export default Address;
