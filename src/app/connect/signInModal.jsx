// import { useState } from "react";

// export default function SignInModal({ platformName, onClose, onSuccess }) {

//   const [email,setEmail] = useState('');
//   const[password,setPassword] = useState('');
//   console.log(email,"email");
//   console.log(password,"password")
//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
//       <div className="bg-[#111] p-6 rounded-xl w-full max-w-md text-white">
//         <h2 className="text-xl font-bold mb-4 text-center">Sign in to {platformName}</h2>
//         <input
//           type="text"
//           placeholder="Email Adress"
//           value={email}
//           onChange={(e)=>setEmail(e.target.value)}
//           className="w-full p-2 mb-3 rounded bg-gray-800 text-white"
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e)=>setPassword(e.target.value)}
//           className="w-full p-2 mb-4 rounded bg-gray-800 text-white"
//         />
//         <button
//           onClick={onSuccess}
//           className="w-full bg-lime-400 text-black py-2 rounded hover:bg-lime-500 font-semibold"
//         >
//           Sign In
//         </button>
       
//       </div>
//     </div>
//   );
// }


import { useState } from "react";
import { IoClose } from "react-icons/io5"; // <-- close icon

export default function SignInModal({ platformName, onClose, onSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <div className="relative bg-[#111] p-6 rounded-xl w-full max-w-md text-white">
        {/* Close icon using react-icons */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl"
          aria-label="Close"
        >
          <IoClose />
        </button>

        <h2 className="text-xl font-bold mb-4 text-center">
          Connecting {platformName}
        </h2>

        <input
          type="text"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 mb-3 rounded bg-gray-800 text-white"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-4 rounded bg-gray-800 text-white"
        />
        <button
          onClick={onSuccess}
          className="w-full bg-lime-400 text-black py-2 rounded hover:bg-lime-500 font-semibold"
        >
          Sign in
        </button>
      </div>
    </div>
  );
}

