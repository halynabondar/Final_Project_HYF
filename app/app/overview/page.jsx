'use client'
import React, { useState } from "react";

const OverviewPage = () => {
  const [quetions, setQeustions ] = useState(
    Array.from({length:40},(_,i)=> ({
      id:i+1,
      answered:false,
    }))
  );
  const handleQuestionClick =(id)=>{
    console.log(`Question ${id} cliecked.`);
    
  }
  return (
    <div className="flex items-center justify-center min-h-screen p-10 ">
      <div className="flex max-w-7xl space-x-6">
        {/* Left Section: Text */}
        <div className="w-1/2">
          <h1 className="text-2xl font-bold mb-4">Din spørgsmåloversigt</h1>
          <p>
            Spørgsmåloversigten giver dig et overblik over dine besvarede og
            ubesvarede spørgsmål. Du skal trykke på et nummer for at gå til
            spørgsmålet.
          </p>
          <div>
            <div className="flex items-center mb-2">
              <div className="w-6 h-6 border border-gray-500 mr-2"></div>
              <span>Ikke besvaret</span>
            </div>
            <div className="flex items-center">
              <div className="w-6 h-6 bg-gray-400 mr-2"></div>
              <span>Besvaret</span>
            </div>
          </div>
        </div>

        {/* Right Section: Grid */}
        <div className="w-1/2">
          <div
            className="grid gap-1"
            style={{
              gridTemplateColumns: "repeat(10, 3rem)", 
              gridTemplateRows: "repeat(4, 3rem)",  
            }}
          >
            {Array.from({ length: 40 }, (_, i) => (
              <button
                key={i}
                className="w-full h-full border border-gray-500 rounded text-center flex items-center justify-center"
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverviewPage;