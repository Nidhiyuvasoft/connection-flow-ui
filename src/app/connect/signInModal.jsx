import { useState } from "react";
import { IoClose } from "react-icons/io5";

export default function SignInModal({ platformName, onClose, onSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="fixed inset-0 bg-opacity-70 flex items-center justify-center z-50">
      <div className="relative bg-[#111111] p-[32px] rounded-[6px] w-full max-w-[480px] text-white">
        <div className="flex justify-between items-center mb-[32px]">
          <h2 className="text-xl font-bold mb-0 text-center font-secondry">
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
        {/* <input
          type="text"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 mb-3 rounded bg-gray-800 text-white"
        />  */}
        <div className="relative mb-6 ">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
            <img src="/assets/email-icon.svg" alt="email-icon" />

          </div>
          <input type="text" id="input-group-1" className="bg-white/10  text-[#9D9D95] text-base font-normal rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)} />
        </div>
        {/* <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-4 rounded bg-gray-800 text-white"
        /> */}
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

