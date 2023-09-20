import React from "react";

const Password = () => {
  return (
    <div
      className="flex items-center justify-center w-screen h-screen"
      style={{
        backgroundColor: "rgba(2,200,5,0.1)",
      }}
    >
      <div className="relative ">
        <div className="absolute w-24 h-24 border-4 border-gray-200 border-dashed rounded-full"></div>

        <div className="absolute w-24 h-24 border-4 border-green-500 border-dashed rounded-full animate-spin border-t-transparent"></div>
      </div>
    </div>
  );
};

export default Password;
