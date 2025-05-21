'use client';

import { useRef, useState } from 'react';
import { IoClose } from "react-icons/io5"; // <-- Import the close icon
// import {underdog} from "../../assets/images/underdog.png"
import clippath from "../../assets/images/clip-path-group.svg"
import checkmark from "../../assets/images/checkmark-2.svg"
import Image from 'next/image';

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
      <div className="fixed inset-0 z-50 overlay-box flex items-center justify-center p-4">
        <div className="w-full max-w-[480px] bg-[#030303] text-white p-[32px] rounded-[6px] relative space-y-4">
          <div className='flex gap-3 mb-[32px]'>
            <Image src={clippath} alt='underdog' />
            <h2 className="text-lg font-semibold m-0">Downloading data</h2>
          </div>
          {checklistItems.map((item, index) => (
            <div key={index}>
              <div
                onClick={() => toggleItem(item)}
                className={`cursor-pointer min-h-[80px] p-[24px] rounded flex items-center justify-between transition-colors ${
                  selectedItems.includes(item)
                    ? 'bg-[#141414] text-[#B5FF4D]'
                    : 'bg-[#141414] text-gray-500'
                }`}
              >
                <span className='text-base font-normal text-[#9D9D95]'>{item}</span>
                <span className="  bg-[#141414] ">
                  <div className='w-[32px] h-[32px] flex justify-center items-center rounded-[4px] '>
                  {selectedItems.includes(item) ? <Image src={checkmark} alt='not-found'/> : ''}
                  </div>
                </span>
              </div>

              {item === 'Finding Active Slates' && expandedItem === item && (
                <div className="mt-2 bg-[#101010] rounded-md p-[24px] space-y-[12px] dotted-bg">
                  <div className='bg-[#1F1F1F] p-[12px]'>
                  <div className="flex items-center justify-between">
                    <p className="text-white text-sm font-medium">Loading Leagues</p>
                  </div>
                  {leagues.map((league) => (
                    <div
                      key={league.name}
                      className="flex justify-between items-center border-b border-[#404040] py-2"
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
  <div className="fixed inset-0 z-50 overlay-box flex items-center justify-center p-4">
    <div className="w-full max-w-[480px] bg-[#030303] text-white p-[32px] rounded-[6px] relative">

      {/* Close button */}
      <div className="flex justify-between items-center mb-[32px]">
         <h2 className="text-xl font-bold mb-0 text-center font-secondry text-[#FFFFF6]">
        Connecting {platformName}
      </h2>
      <button
        onClick={onClose}
        className=" text-gray-400 hover:text-white text-2xl"
        aria-label="Close"
      >
        <IoClose />
      </button>

     
      </div>
      <p className="mb-[16px] text-[#9D9D95] text-base font-normal">
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
            className="w-[62px] h-20 text-center text-[40px] rounded bg-white/10  focus:outline-none"
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




