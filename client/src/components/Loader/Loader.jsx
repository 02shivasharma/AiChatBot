import React from 'react';

const SpinnerLoader = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
      <p className="ml-2 text-gray-600">Generating response...</p>
    </div>
  );
};

export default SpinnerLoader;