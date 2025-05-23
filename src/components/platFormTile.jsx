import Image from 'next/image';

export default function PlatformTile({ platform, selected, onClick }) {
  return (
    <button
      onClick={onClick}
      className="w-full bg-[#1b1b1b] px-4 py-3 rounded-lg flex items-center justify-between hover:bg-[#2c2c2c] transition"
    >
      <div className="flex items-center gap-4">
        <Image src={platform.logo} alt={platform.name} width={32} height={32} />
        <div>
          <p className="font-normal text-base text-[#FFFFF6] text-left">{platform.name}</p>
          {platform.note && <p className="text-xs text-[#9D9D95] font-normal ">{platform.note}</p>}
        </div>
      </div>

      <div>
        {selected ? (
          <div className="w-7 h-7 flex items-center justify-center bg-white/10 rounded-sm">
            <img className='w-4 h-4 ' src="/assets/checkmark-2.svg" alt="checkmark icon" />
          </div>
        ) : (
          <div className="w-7 h-7 flex items-center justify-center bg-white/10 rounded-sm " >
          <img className='w-4 h-4  ' src="/assets/plus-large.svg" alt ="plus icon"/>
          </div>
        )}
      </div>
      
    </button>
  );
}
