import React, { useState } from 'react';
import { Logo } from './Logo';
import { Phone, Search, ShieldCheck, ChevronDown, Package, Anchor, Plane, Truck, ArrowRight, Menu, X, Sun, Moon } from 'lucide-react';

interface HeaderProps {
  onOpenTracking: (trackingNumber?: string) => void;
  onResetForm: () => void;
  activeSection: string;
  setActiveSection: (sec: string) => void;
  isDarkMode?: boolean;
  onToggleDarkMode?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenTracking,
  onResetForm,
  activeSection,
  setActiveSection,
  isDarkMode = false,
  onToggleDarkMode,
}) => {
  const [quickTrackInput, setQuickTrackInput] = useState('');
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleTrackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (quickTrackInput.trim()) {
      onOpenTracking(quickTrackInput.trim());
      setQuickTrackInput('');
    } else {
      onOpenTracking();
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-xs">
      {/* Top Banner Bar */}
      <div className="bg-[#152A4E] text-white text-xs py-1.5 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-1 text-center sm:text-left">
          <div className="flex items-center gap-4 text-sky-200">
            <span className="flex items-center gap-1.5 font-medium text-white">
              <ShieldCheck className="w-3.5 h-3.5 text-[#2FAE60]" />
              Trusted USA ↔ Nigeria Freight Partner
            </span>
            <span className="hidden md:inline">•</span>
            <span className="hidden md:inline text-sky-100">
              Houston Hub: 8900 Southwest Fwy, Houston, TX
            </span>
          </div>
          <div className="flex items-center gap-4">
            <a href="tel:+18325555464" className="flex items-center gap-1 hover:text-sky-300 transition-colors">
              <Phone className="w-3 h-3 text-[#BFE3F7]" />
              <span className="font-semibold text-white">+1 (832) 555-KINGZ</span>
            </a>
            <span className="text-sky-300 hidden sm:inline">|</span>
            <span className="text-emerald-400 font-semibold text-[11px] hidden sm:inline">
              ⚡ Next Container Vessel Loading: Friday
            </span>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4">
        {/* Left: Brand Logo */}
        <Logo size="md" onClick={() => { onResetForm(); setActiveSection('book'); }} />

        {/* Center: Desktop Nav Items */}
        <nav className="hidden lg:flex items-center space-x-8 text-sm font-medium text-[#22262E]">
          <button
            onClick={() => { onResetForm(); setActiveSection('book'); }}
            className={`transition-colors hover:text-[#1D4F91] ${activeSection === 'book' ? 'text-[#152A4E] font-bold border-b-2 border-[#152A4E] pb-1' : ''}`}
          >
            Home
          </button>

          {/* Services Dropdown */}
          <div 
            className="relative"
            onMouseEnter={() => setServicesDropdownOpen(true)}
            onMouseLeave={() => setServicesDropdownOpen(false)}
          >
            <button className="flex items-center gap-1 py-1 transition-colors hover:text-[#1D4F91]">
              Services
              <ChevronDown className="w-4 h-4 text-gray-500" />
            </button>

            {servicesDropdownOpen && (
              <div className="absolute top-full left-0 w-64 bg-white border border-gray-100 shadow-xl rounded-xl p-2 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                <div className="p-2 border-b border-gray-100 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Kingz Core Shipping Lines
                </div>
                <a href="#booking" onClick={() => setServicesDropdownOpen(false)} className="flex items-start gap-3 p-2.5 hover:bg-sky-50 rounded-lg transition-colors group">
                  <Anchor className="w-5 h-5 text-[#152A4E] mt-0.5 group-hover:scale-110 transition-transform" />
                  <div>
                    <div className="text-sm font-semibold text-[#152A4E]">Container Freight</div>
                    <div className="text-xs text-gray-500">Commercial & Household Goods</div>
                  </div>
                </a>
                <a href="#booking" onClick={() => setServicesDropdownOpen(false)} className="flex items-start gap-3 p-2.5 hover:bg-sky-50 rounded-lg transition-colors group">
                  <Truck className="w-5 h-5 text-[#152A4E] mt-0.5 group-hover:scale-110 transition-transform" />
                  <div>
                    <div className="text-sm font-semibold text-[#152A4E]">RoRo Vehicle Shipping</div>
                    <div className="text-xs text-gray-500">Cars, Trucks, Heavy Machinery</div>
                  </div>
                </a>
                <a href="#booking" onClick={() => setServicesDropdownOpen(false)} className="flex items-start gap-3 p-2.5 hover:bg-sky-50 rounded-lg transition-colors group">
                  <Plane className="w-5 h-5 text-[#152A4E] mt-0.5 group-hover:scale-110 transition-transform" />
                  <div>
                    <div className="text-sm font-semibold text-[#152A4E]">Air Cargo Express</div>
                    <div className="text-xs text-gray-500">Fast 5-7 Day Transit</div>
                  </div>
                </a>
                <a href="#booking" onClick={() => setServicesDropdownOpen(false)} className="flex items-start gap-3 p-2.5 hover:bg-sky-50 rounded-lg transition-colors group">
                  <Package className="w-5 h-5 text-[#152A4E] mt-0.5 group-hover:scale-110 transition-transform" />
                  <div>
                    <div className="text-sm font-semibold text-[#152A4E]">Texas Local Delivery</div>
                    <div className="text-xs text-gray-500">Pickup across Houston & Texas</div>
                  </div>
                </a>
              </div>
            )}
          </div>

          <button 
            onClick={() => setActiveSection('resources')} 
            className={`transition-colors hover:text-[#1D4F91] ${activeSection === 'resources' ? 'text-[#152A4E] font-bold border-b-2 border-[#152A4E] pb-1' : ''}`}
          >
            Resources & Customs
          </button>

          <button 
            onClick={() => onOpenTracking()} 
            className="flex items-center gap-1.5 text-[#1D4F91] font-semibold hover:text-[#152A4E] transition-colors"
          >
            <Search className="w-4 h-4" />
            Track Shipment
          </button>
        </nav>

        {/* Right: Quick Action Buttons & Header Search */}
        <div className="hidden md:flex items-center space-x-3">
          <form onSubmit={handleTrackSubmit} className="relative">
            <input
              type="text"
              placeholder="Track number e.g. KL-892410"
              value={quickTrackInput}
              onChange={(e) => setQuickTrackInput(e.target.value)}
              className="w-44 xl:w-52 pl-3 pr-8 py-1.5 text-xs rounded-lg border border-gray-300 dark:border-slate-600 bg-gray-50 dark:bg-slate-800 text-gray-900 dark:text-slate-100 focus:bg-white dark:focus:bg-slate-900 focus:outline-hidden focus:ring-2 focus:ring-[#152A4E] transition-all"
            />
            <button
              type="submit"
              className="absolute right-1 top-1/2 -translate-y-1/2 p-1 text-gray-500 dark:text-gray-400 hover:text-[#152A4E] dark:hover:text-sky-300"
              title="Quick Search"
            >
              <Search className="w-3.5 h-3.5" />
            </button>
          </form>

          {/* Dark Mode Toggle Button */}
          {onToggleDarkMode && (
            <button
              onClick={onToggleDarkMode}
              className="p-2 rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 text-gray-700 dark:text-slate-200 hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors flex items-center justify-center cursor-pointer"
              title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
              aria-label="Toggle theme"
            >
              {isDarkMode ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-[#152A4E]" />
              )}
            </button>
          )}

          <button
            onClick={() => { onResetForm(); setActiveSection('book'); }}
            className="bg-[#152A4E] dark:bg-sky-600 hover:bg-[#1D4F91] dark:hover:bg-sky-500 text-white px-4 py-2 rounded-xl text-xs font-semibold shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
          >
            Book Shipment
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-2 lg:hidden">
          {onToggleDarkMode && (
            <button
              onClick={onToggleDarkMode}
              className="p-2 rounded-lg border border-gray-200 dark:border-slate-700 text-gray-700 dark:text-slate-200 hover:bg-gray-100 dark:hover:bg-slate-800"
              title={isDarkMode ? "Light Mode" : "Dark Mode"}
            >
              {isDarkMode ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-[#152A4E]" />}
            </button>
          )}
          <button
            onClick={() => onOpenTracking()}
            className="p-2 text-[#152A4E] dark:text-sky-300 hover:bg-sky-50 dark:hover:bg-slate-800 rounded-lg"
            title="Track"
          >
            <Search className="w-5 h-5" />
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-gray-700 hover:bg-gray-100 rounded-lg"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-gray-200 px-4 py-4 space-y-3 animate-in slide-in-from-top duration-200">
          <button
            onClick={() => { onResetForm(); setActiveSection('book'); setMobileMenuOpen(false); }}
            className="block w-full text-left font-semibold text-[#152A4E] py-2 border-b border-gray-100"
          >
            Home & Shipment Form
          </button>
          <button
            onClick={() => { onOpenTracking(); setMobileMenuOpen(false); }}
            className="block w-full text-left font-semibold text-[#1D4F91] py-2 border-b border-gray-100"
          >
            Track Existing Shipment
          </button>
          <button
            onClick={() => { setActiveSection('resources'); setMobileMenuOpen(false); }}
            className="block w-full text-left font-semibold text-gray-700 py-2 border-b border-gray-100"
          >
            Customs & Guidelines
          </button>
          <div className="pt-2">
            <button
              onClick={() => { onResetForm(); setActiveSection('book'); setMobileMenuOpen(false); }}
              className="w-full bg-[#152A4E] text-white py-2.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2"
            >
              Start New Shipment Booking
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
