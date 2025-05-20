'use client';
import { useState } from 'react';
import PlatformTile from '@/components/PlatformTile';
import SignInModal from './signInModal';
import OtpModal from './OtpModal';

const platforms = [
  { id: 'sleeper', name: 'Sleeper', logo: '/assets/icon-1.png' },
  { id: 'espn', name: 'ESPN', logo: '/assets/icon-2.png', note: '2FA required' },
  { id: 'yahoo', name: 'Yahoo', logo: '/assets/icon-3.png' },
  { id: 'cbs', name: 'CBS', logo: '/assets/icon-4.png' },
  { id: 'nfl', name: 'NFL.com', logo: '/assets/icon-5.png' },
];

export default function ConnectPage() {
  const [selected, setSelected] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [activePlatform, setActivePlatform] = useState(null);
  const [stage, setStage] = useState(null);

  const togglePlatform = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleContinue = () => {
    if (selected.length > 0) {
      setActivePlatform(selected[0]);
      setStage('signin');
      setShowModal(true);
    }
  };

  const handleClose = () => {
    setShowModal(false);
    setStage(null);
    setActivePlatform(null);
  };

  const handleSignInSuccess = () => {
   
    setStage('otp');
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      {!showModal && (
        <div className="w-full  p-6 max-w-[380px]">
          <h1 className="text-3xl font-bold text-center mb-2 text-[#FFFFF6]">
            Select platforms to connect to Stacked
          </h1>
          <p className="text-base text-center text-[#9D9D95] mb-6 font-normal">
            Connect tools to manage your Leagues. Add at least one now, you can always add more later.
          </p>

          <div className=" rounded-md  space-y-3">
            {platforms.map((platform) => (
              <PlatformTile
                key={platform.id}
                platform={platform}
                selected={selected.includes(platform.id)}
                onClick={() => togglePlatform(platform.id)}
              />
            ))}
          </div>

          <button
            onClick={handleContinue}
            disabled={selected.length === 0}
            className={`w-full mt-6 py-3 font-regular text-[#030303] text-base bg-lime-400 rounded-sm transition ${selected.length === 0
                ? 'bg-gray-700 cursor-not-allowed'
                : 'bg-lime-400 text-[#030303] hover:bg-lime-500'
              }`}
          >
            Continue
          </button>
        </div>
      )}

     
      {showModal && stage === 'signin' && (

        <SignInModal
          platformName={platforms.find(p => p.id === activePlatform)?.name}
          platformLogo={platforms.find(p => p.id === activePlatform)?.logo}
          onClose={handleClose}
          onSuccess={handleSignInSuccess}
        />
      )}

      
      {showModal && stage === 'otp' && (
        <OtpModal
          
          platformName={platforms.find(p => p.id === activePlatform)?.name}
          platformLogo={platforms.find(p => p.id === activePlatform)?.logo}
          onClose={handleClose}
        />
      )}
    </div>
  );
}
