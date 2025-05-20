
'use client';

import { useEffect, useRef, useState } from 'react';
import { IoClose } from "react-icons/io5";

export default function OtpModal({ platformName, onClose, platformLogo }) {
  const inputRefs = useRef([]);
  const [otp, setOtp] = useState(new Array(6).fill(''));
  const [isVerifying, setIsVerifying] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [expandedItem, setExpandedItem] = useState(null);
  const [showLeagueInfo, setShowLeagueInfo] = useState(false); // NEW STATE

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
        }, 3000);
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
    const isSelected = selectedItems.includes(item);
    setSelectedItems((prev) =>
      isSelected ? prev.filter((i) => i !== item) : [...prev, item]
    );

    if (item === 'Finding Active Slates') {
      if (!isSelected) {
        // Expand and show info after delay
        setExpandedItem(item);
        setShowLeagueInfo(false); // reset
        setTimeout(() => setShowLeagueInfo(true), 500);
      } else {
        setExpandedItem(null);
        setShowLeagueInfo(false);
      }
    }
  };

  if (isVerifying) {
    return (
      <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-[#1b1b1b] text-white p-6 rounded-xl relative space-y-4">
          {/* Header with platform logo */}
          <div className="flex items-center mb-4 space-x-2">
            {platformLogo && (
              <img src={platformLogo} alt={`${platformName} logo`} className="w-6 h-6" />
            )}
            <h2 className="text-xl font-semibold">Downloading data</h2>
          </div>

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
                <div className="flex flex-col">
                  <span>{item}</span>
                  {/* Delayed display of "4 leagues found" */}
                  {item === 'Finding Active Slates' &&
                    selectedItems.includes(item) &&
                    showLeagueInfo && (
                      <span className="text-sm text-gray-400">
                        {leagues.length} leagues found
                      </span>
                    )}
                </div>
                <span className="text-xl">
                  {selectedItems.includes(item) ? '✔' : ''}
                </span>
              </div>

              {/* Delayed expansion of league list */}
              {item === 'Finding Active Slates' &&
                expandedItem === item &&
                showLeagueInfo && (
                  <div className="mt-2 ml-4 bg-[#101010] rounded-md p-3 space-y-2">
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

  // OTP modal (initial screen)
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

        {/* Header */}
        <div className="flex items-center mb-4 space-x-2">
          {platformLogo && (
            <img src={platformLogo} alt={`${platformName} logo`} className="w-6 h-6" />
          )}
          <h2 className="text-xl font-semibold">Connecting {platformName}</h2>
        </div>

        <p className="mb-4 text-gray-400 text-sm">
          Enter a 6-digit code sent to email@address.com
        </p>

        {/* OTP Input */}
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
