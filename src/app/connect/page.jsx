'use client';
import { useState } from 'react';
import PlatformTile from '@/components/PlatformTile';
import SignInModal from './signInModal';
import OtpModal from './OtpModal';

const platforms = [
  { id: 'sleeper', name: 'Sleeper', logo: '/logos/sleeper.png' },
  { id: 'espn', name: 'ESPN', logo: '/logos/espn.png', note: '2FA required' },
  { id: 'yahoo', name: 'Yahoo', logo: '/logos/yahoo.png' },
  { id: 'cbs', name: 'CBS', logo: '/logos/cbs.png' },
  { id: 'nfl', name: 'NFL.com', logo: '/logos/nfl.png' },
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
    // switch to OTP modal
    setStage('otp');
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      {/* Show Connect Page only when no modal is visible */}
      {!showModal && (
        <div className="w-full max-w-2xl p-6">
          <h1 className="text-2xl font-bold text-center mb-2">
            Select platforms to connect to Stacked
          </h1>
          <p className="text-sm text-center text-gray-400 mb-6">
            Connect tools to manage your Leagues. Add at least one now, you can always add more later.
          </p>

          <div className="bg-[#111] rounded-xl p-6 space-y-4">
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
            className={`w-full mt-6 py-3 font-semibold rounded transition ${
              selected.length === 0
                ? 'bg-gray-700 cursor-not-allowed'
                : 'bg-lime-400 text-black hover:bg-lime-500'
            }`}
          >
            Continue
          </button>
        </div>
      )}

      {/* Show SignInModal in place of page */}
      {showModal && stage === 'signin' && (
        <SignInModal
          platformName={activePlatform}
          onClose={handleClose}
          onSuccess={handleSignInSuccess}
        />
      )}

      {/* Show OtpModal in place of page */}
      {showModal && stage === 'otp' && (
        <OtpModal
          platformName={activePlatform}
          onClose={handleClose}
        />
      )}
    </div>
  );
}
