import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: () => void;
}

export const Logo: React.FC<LogoProps> = ({ size = 'md', className = '', onClick }) => {
  // Size variations
  const circleSizes = {
    sm: 'w-8 h-8',
    md: 'w-11 h-11',
    lg: 'w-16 h-16',
  };

  const kingzTextSizes = {
    sm: 'text-2xl -ml-2 -mt-1',
    md: 'text-3xl -ml-3 -mt-1',
    lg: 'text-5xl -ml-4 -mt-2',
  };

  const logisticsTextSizes = {
    sm: 'text-[9px] tracking-[0.22em] font-extrabold',
    md: 'text-[11px] tracking-[0.28em] font-extrabold',
    lg: 'text-[14px] tracking-[0.32em] font-extrabold',
  };

  return (
    <div 
      onClick={onClick}
      className={`inline-flex flex-col items-start select-none ${onClick ? 'cursor-pointer group' : ''} ${className}`}
      title="Kingz Logistics — USA to Nigeria Shipping"
    >
      <div className="relative flex items-center">
        {/* Light-blue background circle */}
        <div className={`${circleSizes[size]} rounded-full bg-gradient-to-tr from-[#BFE3F7] to-[#8FCBEA] shadow-inner flex items-center justify-center transition-transform group-hover:scale-105`}>
          <div className="w-2.5 h-2.5 rounded-full bg-[#1D4F91]/20 transform -translate-x-1 -translate-y-1"></div>
        </div>
        
        {/* "Kingz" wordmark in brush-script overlapping circle */}
        <span className={`font-brand-script text-[#152A4E] font-bold leading-none ${kingzTextSizes[size]} drop-shadow-sm transition-colors group-hover:text-[#1D4F91]`}>
          Kingz
        </span>
      </div>

      {/* "LOGISTICS" tagline underneath */}
      <span className={`text-[#152A4E] uppercase ${logisticsTextSizes[size]} font-heading pl-1.5 -mt-0.5`}>
        LOGISTICS
      </span>
    </div>
  );
};
