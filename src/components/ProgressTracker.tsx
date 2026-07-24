import React from 'react';
import { Check, Package, UserCheck, ShieldCheck } from 'lucide-react';

interface ProgressTrackerProps {
  currentStep: number;
  totalSteps: number;
  onStepClick: (step: number) => void;
}

export const ProgressTracker: React.FC<ProgressTrackerProps> = ({
  currentStep,
  totalSteps = 3,
  onStepClick,
}) => {
  const steps = [
    {
      number: 1,
      title: 'Shipment Details',
      subtitle: 'Cargo, Weight & Specs',
      icon: Package,
    },
    {
      number: 2,
      title: 'Sender & Receiver',
      subtitle: 'Addresses & ID Info',
      icon: UserCheck,
    },
    {
      number: 3,
      title: 'Setup the Service',
      subtitle: 'Speed, Insurance & Payment',
      icon: ShieldCheck,
    },
  ];

  return (
    <div className="w-full bg-white dark:bg-slate-800 rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-200/80 dark:border-slate-700 mb-6 transition-colors">
      <div className="relative flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        
        {/* Background Connecting Line (Desktop) */}
        <div className="hidden sm:block absolute top-1/2 left-12 right-12 h-1 bg-gray-200 dark:bg-slate-700 -translate-y-1/2 z-0">
          <div
            className="h-full bg-gradient-to-r from-[#152A4E] dark:from-sky-500 to-[#1D4F91] dark:to-sky-400 transition-all duration-300"
            style={{
              width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%`,
            }}
          ></div>
        </div>

        {/* Step Items */}
        {steps.map((step) => {
          const isCompleted = step.number < currentStep;
          const isActive = step.number === currentStep;
          const StepIcon = step.icon;

          return (
            <div
              key={step.number}
              onClick={() => {
                if (step.number <= currentStep || isCompleted) {
                  onStepClick(step.number);
                }
              }}
              className={`relative z-10 flex items-center gap-3 sm:gap-4 p-2 sm:p-0 rounded-xl transition-all ${
                step.number <= currentStep ? 'cursor-pointer' : 'cursor-not-allowed opacity-80'
              }`}
            >
              {/* Number Circle / Check Circle */}
              <div
                className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center font-heading font-bold text-sm sm:text-base transition-all shadow-xs shrink-0 ${
                  isCompleted
                    ? 'bg-[#2FAE60] text-white shadow-emerald-200'
                    : isActive
                    ? 'bg-[#152A4E] dark:bg-sky-500 text-white ring-4 ring-[#BFE3F7] dark:ring-sky-900/60'
                    : 'bg-gray-100 dark:bg-slate-700 text-gray-500 dark:text-slate-400 border border-gray-200 dark:border-slate-600'
                }`}
              >
                {isCompleted ? (
                  <Check className="w-5 h-5 stroke-[3]" />
                ) : (
                  <span>{step.number}</span>
                )}
              </div>

              {/* Title & Subtitle */}
              <div className="flex flex-col">
                <span
                  className={`text-xs uppercase tracking-wider font-bold ${
                    isActive
                      ? 'text-[#1D4F91] dark:text-sky-400'
                      : isCompleted
                      ? 'text-[#2FAE60]'
                      : 'text-gray-400 dark:text-slate-500'
                  }`}
                >
                  Step 0{step.number}
                </span>
                <span
                  className={`font-heading font-bold text-sm sm:text-base leading-tight ${
                    isActive
                      ? 'text-[#152A4E] dark:text-white'
                      : isCompleted
                      ? 'text-gray-800 dark:text-slate-200'
                      : 'text-gray-500 dark:text-slate-400'
                  }`}
                >
                  {step.title}
                </span>
                <span className="text-xs text-gray-500 dark:text-slate-400 hidden md:inline font-normal">
                  {step.subtitle}
                </span>
              </div>

              {/* Active Step Indicator Underline for Mobile */}
              {isActive && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#152A4E] dark:bg-sky-400 rounded-full sm:hidden"></div>
              )}
            </div>
          );
        })}

      </div>
    </div>
  );
};
