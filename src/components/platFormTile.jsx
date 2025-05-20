// import Image from 'next/image';

// export default function PlatformTile({ platform, selected, onClick }) {
//   return (
//     <button
//       onClick={onClick}
//       className="w-full bg-[#1b1b1b] px-4 py-3 rounded-lg flex items-center justify-between hover:bg-[#2c2c2c] transition"
//     >
//       <div className="flex items-center gap-4">
//         <Image src={platform.logo} alt={platform.name} width={32} height={32} />
//         <div>
//           <p className="font-medium">{platform.name}</p>
//           {platform.note && <p className="text-xs text-gray-400">{platform.note}</p>}
//         </div>
//       </div>
//     </button>
//   );
// }

import Image from 'next/image';
import { FaCheck, FaPlus } from 'react-icons/fa';

export default function PlatformTile({ platform, selected, onClick }) {
  return (
    <button
      onClick={onClick}
      className="w-full bg-[#1b1b1b] px-4 py-3 rounded-lg flex items-center justify-between hover:bg-[#2c2c2c] transition"
    >
      <div className="flex items-center gap-4">
        <Image src={platform.logo} alt={platform.name} width={32} height={32} />
        <div>
          <p className="font-medium">{platform.name}</p>
          {platform.note && <p className="text-xs text-gray-400">{platform.note}</p>}
        </div>
      </div>

      {/* Right side icon */}
      <div>
        {selected ? (
          <FaCheck className="text-lime-400" size={16} />
        ) : (
          <FaPlus className="text-white" size={16} />
        )}
      </div>
    </button>
  );
}
