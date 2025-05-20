import { useState } from "react";
import { IoClose } from "react-icons/io5";



export default function SignInModal({ platformName, onClose, onSuccess,platformLogo }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <div className="relative bg-[#111] p-6 rounded-xl w-full max-w-md text-white">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl"
          aria-label="Close"
        >
          <IoClose />
        </button>
        <div className="flex items-center justify-center mb-6 space-x-2">
         {platformLogo && (
            <img src={platformLogo} alt={`${platformName} logo`} className="w-6 h-6" />
          )}
         <h2 className="text-xl font-bold">Connecting {platformName}</h2>
        </div>
        
        <div className="relative mb-6 ">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
            <img src="/assets/email-icon.svg" alt="email-icon" />

          </div>
          <input type="text" id="input-group-1" className="bg-white/10  text-[#9D9D95] text-base font-normal rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="relative mb-6 ">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
            <img src="/assets/lock-icon.svg" alt="email-icon" sizes="16px" />

          </div>
          <input type="text" id="input-group-1" className="bg-white/10  text-[#9D9D95] text-base font-normal rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
            placeholder="password"
             value={password}
           onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button
          onClick={onSuccess}
          className="w-full bg-lime-400 text-black py-2 rounded-sm hover:bg-lime-500 font-regular text-base"
        >
          Sign in
        </button>
      </div>
    </div>
  );
}

