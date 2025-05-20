'use client';

import { useEffect, useRef, useState } from 'react';
import { IoClose } from "react-icons/io5";

export default function OtpModal({ platformName, onClose, platformLogo }) {
  const inputRefs = useRef([]);
  const [otp, setOtp] = useState(new Array(6).fill(''));
  const [isVerifying, setIsVerifying] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [expandedItem, setExpandedItem] = useState(null);
  const [showLeagueInfo, setShowLeagueInfo] = useState(false);
  const [leagueStatusList, setLeagueStatusList] = useState([]);
  const [currentLeagueIndex, setCurrentLeagueIndex] = useState(0);

  const checklistItems = [
    'Connecting to platform',
    'Finding Active Slates',
    'Downloading Drafts',
    'Calculating Exposures / Data',
  ];

  const defaultLeagues = [
    { name: 'League Delta' },
    { name: 'League Alpha' },
    { name: 'League Gamma' },
    { name: 'League Beta' },
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
        
        setIsVerifying(true);
      }
    } else {
      e.target.value = '';
    }
  };


  const toggleItem = (item) => {
    const isSelected = selectedItems.includes(item);
    setSelectedItems((prev) =>
      isSelected ? prev.filter((i) => i !== item) : [...prev, item]
    );

    if (item === 'Finding Active Slates') {
      if (!isSelected) {
        setExpandedItem(item);
        setShowLeagueInfo(false);
        setLeagueStatusList([]);
        setCurrentLeagueIndex(0);
        setTimeout(() => {
          setShowLeagueInfo(true);
        }, 3000);
      } else {
        setExpandedItem(null);
        setShowLeagueInfo(false);
        setLeagueStatusList([]);
        setCurrentLeagueIndex(0);
      }
    }
  };

  useEffect(() => {
    if (!showLeagueInfo || currentLeagueIndex >= defaultLeagues.length) return;

    const timer = setTimeout(() => {
      setLeagueStatusList((prev) => [
        ...prev,
        { name: defaultLeagues[currentLeagueIndex].name, status: 'done' },
      ]);
      setCurrentLeagueIndex((prev) => prev + 1);
    }, 3000);

    return () => clearTimeout(timer);
  }, [currentLeagueIndex, showLeagueInfo]);

  if (isVerifying) {
    return (
      <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-[#1b1b1b] text-white p-6 rounded-xl relative space-y-4">
         
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
                  {item === 'Finding Active Slates' &&
                    selectedItems.includes(item) &&
                    showLeagueInfo && (
                      <span className="text-sm text-gray-400">
                        {defaultLeagues.length} leagues found
                      </span>
                    )}
                </div>
                <span className="text-xl">
                  {selectedItems.includes(item) ? '✔' : ''}
                </span>
              </div>

              {item === 'Finding Active Slates' &&
                expandedItem === item &&
                showLeagueInfo && (
                  <div className="mt-2 ml-4 bg-[#101010] rounded-md p-3 space-y-2">
                    {defaultLeagues.map((league, index) => {
                      const isLoaded = leagueStatusList.some((l) => l.name === league.name);
                      const isCurrentLoading = index === currentLeagueIndex;

                      return (
                        <div
                          key={league.name}
                          className="flex justify-between items-center border-b border-gray-700 py-2"
                        >
                          <div>
                            <p className={`text-sm ${isLoaded ? 'text-green-400' : 'text-white'}`}>
                              {league.name}
                            </p>
                          </div>
                          {isLoaded ? (
                            <span className="text-green-400 text-sm">✔</span>
                          ) : isCurrentLoading ? (
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          ) : null}
                        </div>
                      );
                    })}
                  </div>
                )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  
  return (
    <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-[#1b1b1b] text-white p-6 rounded-xl relative">
       
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl"
          aria-label="Close"
        >
          <IoClose />
        </button>

       
        <div className="flex items-center mb-4 space-x-2">
          {platformLogo && (
            <img src={platformLogo} alt={`${platformName} logo`} className="w-6 h-6" />
          )}
          <h2 className="text-xl font-semibold">Connecting {platformName}</h2>
        </div>

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
            />
          ))}
        </div>
      </div>
    </div>
  );
}
