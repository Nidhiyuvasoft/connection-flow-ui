'use client';

import { useRef, useState } from 'react';
import { IoClose } from "react-icons/io5"; // <-- Import the close icon

export default function OtpModal({ platformName, onClose }) {
  const inputRefs = useRef([]);
  const [otp, setOtp] = useState(new Array(6).fill(''));
  const [isVerifying, setIsVerifying] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [expandedItem, setExpandedItem] = useState(null);

  const checklistItems = [
    'Connecting to platform',
    'Finding Active Slates',
    'Downloading Drafts',
    'Calculating Exposures / Data',
  ];

  const leagues = [
    { name: 'League Delta', status: 'done' },
    { name: 'League Alpha', status: 'loading', progress: 64, timeLeft: '15s' },
    { name: 'League Gamma', status: 'pending' },
    { name: 'League Beta', status: 'pending' },
  ];

  const handleChange = (e, index) => {
    const value = e.target.value;

    if (/^\d$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (index < 5) {
        inputRefs.current[index + 1]?.focus();
      } else {
        setTimeout(() => {
          setIsVerifying(true);
        }, 300);
      }
    } else {
      e.target.value = '';
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && otp[index] === '') {
      if (index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  const toggleItem = (item) => {
    setSelectedItems((prev) =>
      prev.includes(item)
        ? prev.filter((i) => i !== item)
        : [...prev, item]
    );

    if (item === 'Finding Active Slates') {
      setExpandedItem((prev) => (prev === item ? null : item));
    }
  };

  if (isVerifying) {
    return (
      <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-[#1b1b1b] text-white p-6 rounded-xl relative space-y-4">
          <h2 className="text-lg font-semibold">Downloading data</h2>

          {checklistItems.map((item, index) => (
            <div key={index}>
              <div
                onClick={() => toggleItem(item)}
                className={`cursor-pointer p-3 rounded flex items-center justify-between transition-colors ${
                  selectedItems.includes(item)
                    ? 'bg-[#111] text-green-500'
                    : 'bg-[#1a1a1a] text-gray-500'
                }`}
              >
                <span>{item}</span>
                <span className="text-xl">
                  {selectedItems.includes(item) ? '✔' : ''}
                </span>
              </div>

              {item === 'Finding Active Slates' && expandedItem === item && (
                <div className="mt-2 ml-4 bg-[#101010] rounded-md p-3 space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="text-white text-sm font-medium">Loading Leagues</p>
                    <div className="relative group ml-2">
                      <p className="text-xs text-blue-400 underline cursor-pointer">
                        Michael Chiang
                      </p>
                      <div className="absolute left-0 mt-2 hidden group-hover:block z-50 bg-[#2a2a2a] text-white text-xs p-3 rounded-md shadow-lg w-72">
                        <p className="font-semibold">
                          Michael Chiang{' '}
                          <span className="text-gray-400 font-normal">9 hr. ago</span>
                        </p>
                        <p className="mt-1 text-gray-300 leading-snug">
                          Until the sync gets to this section it should just be 'Loading
                          Leagues' with no sub divs like the others
                        </p>
                      </div>
                    </div>
                  </div>

                  {leagues.map((league) => (
                    <div
                      key={league.name}
                      className="flex justify-between items-center border-b border-gray-700 py-2"
                    >
                      <div>
                        <p
                          className={`text-sm ${
                            league.status === 'done'
                              ? 'text-green-400'
                              : 'text-white'
                          }`}
                        >
                          {league.name}
                        </p>
                        {league.status === 'loading' && (
                          <p className="text-xs text-gray-400">
                            {league.progress}% • {league.timeLeft} left
                          </p>
                        )}
                      </div>
                      {league.status === 'done' ? (
                        <span className="text-green-400 text-sm">✔</span>
                      ) : league.status === 'loading' ? (
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      ) : null}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  // return (
  //   <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
  //     <div className="w-full max-w-md bg-[#1b1b1b] text-white p-6 rounded-xl relative">
        
  //       <h2 className="text-xl font-semibold mb-2 flex items-center">
  //         Connecting {platformName}
  //       </h2>
  //       <p className="mb-4 text-gray-400 text-sm">
  //         Enter a 6-digit code sent to email@address.com
  //       </p>

  //       <div className="flex justify-between gap-2">
  //         {otp.map((digit, i) => (
  //           <input
  //             key={i}
  //             ref={(el) => (inputRefs.current[i] = el)}
  //             type="text"
  //             maxLength={1}
  //             inputMode="numeric"
  //             pattern="[0-9]*"
  //             className="w-10 h-12 text-center text-xl rounded bg-black border border-gray-600 focus:outline-none"
  //             value={digit}
  //             onChange={(e) => handleChange(e, i)}
  //             onKeyDown={(e) => handleKeyDown(e, i)}
  //           />
  //         ))}
  //       </div>
  //     </div>
  //   </div>
  // );

  

return (
  <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
    <div className="w-full max-w-md bg-[#1b1b1b] text-white p-6 rounded-xl relative">

      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl"
        aria-label="Close"
      >
        <IoClose />
      </button>

      <h2 className="text-xl font-semibold mb-2 flex items-center">
        Connecting {platformName}
      </h2>
      <p className="mb-4 text-gray-400 text-sm">
        Enter a 6-digit code sent to email@address.com
      </p>

      <div className="flex justify-between gap-2">
        {otp.map((digit, i) => (
          <input
            key={i}
            ref={(el) => (inputRefs.current[i] = el)}
            type="text"
            maxLength={1}
            inputMode="numeric"
            pattern="[0-9]*"
            className="w-10 h-12 text-center text-xl rounded bg-black border border-gray-600 focus:outline-none"
            value={digit}
            onChange={(e) => handleChange(e, i)}
            onKeyDown={(e) => handleKeyDown(e, i)}
          />
        ))}
      </div>
    </div>
  </div>
);

}




