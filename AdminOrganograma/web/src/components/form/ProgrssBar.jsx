  const ProgressBar = ({ step }) => {
    return (
      <div className="w-full mt-3 bg-gray-300 h-2 rounded relative my-2">
        <div className="w-full flex relative">
          <div className="w-[80%] absolute -top-2.5 right-0">
            <div
              className={`w-7 h-7 rounded-full flex justify-center items-center ${
                step >= 1 ? "bg-blue-500 text-white" : "bg-gray-300"
              }`}
            >
              1
            </div>
          </div>
        </div>
        <div className="w-full flex relative">
          <div className="w-[53%] absolute -top-2.5 right-0">
            <div
              className={`w-7 h-7 rounded-full flex justify-center items-center ${
                step >= 2 ? "bg-blue-500 text-white" : "bg-gray-300"
              }`}
            >
              2
            </div>
          </div>
        </div>
        <div className="w-full flex relative">
          <div className="w-[25%] absolute -top-2.5 right-0">
            <div
              className={`w-7 h-7 rounded-full flex justify-center items-center ${
                step >= 3 ? "bg-blue-500 text-white" : "bg-gray-300"
              }`}
            >
              3
            </div>
          </div>
        </div>
  
        <div
          className={`bg-blue-500 text-white h-full rounded transition-all duration-300 ${
            step === 1
              ? "w-[25%]"
              : step === 2
              ? "w-[53%]"
              : step === 3
              ? "w-[80%]"
              : "w-full"
          }`}
        ></div>
      </div>
    );
  };
  
  export default ProgressBar;
  