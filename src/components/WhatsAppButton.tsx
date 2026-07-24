import React, { useState } from 'react';
import { MessageCircle, X, Send, ShieldCheck } from 'lucide-react';

export const WhatsAppButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [msg, setMsg] = useState('');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    const encoded = encodeURIComponent(msg || "Hi Kingz Logistics, I'm inquiring about shipping cargo between Texas and Nigeria.");
    window.open(`https://wa.me/18325555464?text=${encoded}`, '_blank');
    setMsg('');
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      {/* Floating Chat Card */}
      {isOpen && (
        <div className="mb-3 w-80 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden animate-in fade-in slide-in-from-bottom-3 duration-200">
          <div className="bg-[#152A4E] text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-[#2FAE60] text-white flex items-center justify-center font-bold">
                <MessageCircle className="w-5 h-5" />
              </div>
              <div>
                <span className="font-heading font-bold text-sm text-white block leading-tight">
                  Kingz Support Desk
                </span>
                <span className="text-[11px] text-emerald-300 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-[#2FAE60]"></span>
                  Online • Texas & Lagos Teams
                </span>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-300 hover:text-white p-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-4 space-y-3 bg-sky-50/40 text-xs text-[#22262E]">
            <div className="bg-white p-3 rounded-xl border border-sky-100 shadow-2xs space-y-1">
              <p className="font-semibold text-[#152A4E]">
                Hello! How can Kingz Logistics help you today?
              </p>
              <p className="text-gray-500">
                Ask us about container schedules, RoRo car clearance, air freight rates, or custom pickup in Texas.
              </p>
            </div>

            <form onSubmit={handleSend} className="space-y-2">
              <textarea
                rows={2}
                value={msg}
                onChange={(e) => setMsg(e.target.value)}
                placeholder="Type your message or question..."
                className="w-full p-2.5 text-xs rounded-xl border border-gray-300 bg-white focus:ring-2 focus:ring-[#152A4E]"
              ></textarea>
              <button
                type="submit"
                className="w-full bg-[#2FAE60] hover:bg-emerald-600 text-white font-heading font-bold text-xs py-2.5 rounded-xl flex items-center justify-center gap-1.5 transition-colors shadow-xs cursor-pointer"
              >
                <span>Start WhatsApp Chat</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-[#2FAE60] hover:bg-emerald-600 text-white p-3.5 sm:p-4 rounded-full shadow-xl flex items-center gap-2 group transition-all duration-200 hover:scale-105 cursor-pointer ring-4 ring-emerald-400/30"
        title="Chat on WhatsApp"
      >
        <MessageCircle className="w-6 h-6 stroke-[2.2]" />
        <span className="hidden sm:inline font-heading font-bold text-xs pr-1">
          Chat With Us
        </span>
      </button>
    </div>
  );
};
