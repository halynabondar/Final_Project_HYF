import React from "react";

const OverviewPage = () => {
  return (
    <div className="p-6">
     
      <h1 className="text-2xl font-bold mb-4">Din spørgsmåloversigt</h1>

      
      <p className="text-gray-600 mb-6">
        Spørgsmåloversigten giver dig et overblik over dine besvarede og
        ubesvarede spørgsmål. Du skal trykke på et nummer for at gå til
        spørgsmålet.
      </p>

    
      <div className="mb-4">
        <div className="flex items-center mb-2">
          <div className="w-6 h-6 border border-gray-500 mr-2"></div>
          <span>Ikke besvaret</span>
        </div>
        <div className="flex items-center">
          <div className="w-6 h-6 bg-gray-400 mr-2"></div>
          <span>Besvaret</span>
        </div>
      </div>

      
      <div className="grid grid-cols-5 gap-4 mb-6">
        {Array.from({ length: 40 }, (_, i) => (
          <button
            key={i}
            className="w-12 h-12 border border-gray-500 rounded text-center"
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default OverviewPage;
