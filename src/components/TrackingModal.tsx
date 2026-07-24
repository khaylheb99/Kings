import React, { useState, useEffect } from 'react';
import { SAMPLE_SHIPMENTS } from '../data/constants';
import { ShipmentRecord } from '../types';
import { Search, X, CheckCircle2, Clock, MapPin, Truck, ShieldCheck, ArrowRight, Anchor, Plane, Package, Copy, Check } from 'lucide-react';

interface TrackingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTrackingNumber?: string;
  userBookings?: ShipmentRecord[];
}

export const TrackingModal: React.FC<TrackingModalProps> = ({
  isOpen,
  onClose,
  initialTrackingNumber = '',
  userBookings = [],
}) => {
  const [searchQuery, setSearchQuery] = useState(initialTrackingNumber);
  const [activeShipment, setActiveShipment] = useState<ShipmentRecord | null>(null);
  const [copied, setCopied] = useState(false);

  // Combine static sample shipments with dynamically booked shipments
  const allShipments = [...userBookings, ...SAMPLE_SHIPMENTS];

  useEffect(() => {
    if (initialTrackingNumber) {
      setSearchQuery(initialTrackingNumber);
      const found = allShipments.find(
        (s) => s.trackingNumber.toLowerCase() === initialTrackingNumber.trim().toLowerCase()
      );
      setActiveShipment(found || allShipments[0]);
    } else if (!activeShipment) {
      setActiveShipment(allShipments[0]);
    }
  }, [initialTrackingNumber, isOpen]);

  if (!isOpen) return null;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    const found = allShipments.find(
      (s) => s.trackingNumber.toLowerCase() === searchQuery.trim().toLowerCase()
    );
    if (found) {
      setActiveShipment(found);
    } else {
      setActiveShipment(null);
    }
  };

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getMethodIcon = (method: string) => {
    switch (method) {
      case 'container':
        return <Anchor className="w-5 h-5 text-[#152A4E]" />;
      case 'air':
        return <Plane className="w-5 h-5 text-[#152A4E]" />;
      case 'roro':
        return <Truck className="w-5 h-5 text-[#152A4E]" />;
      default:
        return <Package className="w-5 h-5 text-[#152A4E]" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-200 flex flex-col">
        
        {/* Modal Header */}
        <div className="bg-[#152A4E] text-white p-5 sm:p-6 flex items-center justify-between sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-sky-500/20 border border-sky-300/30 text-[#BFE3F7]">
              <Search className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-heading font-extrabold text-xl text-white">
                Live Shipment Tracking Portal
              </h3>
              <p className="text-xs text-sky-200">
                Kingz Logistics Real-Time Freight & Courier Monitoring
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/10 text-gray-300 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Search Bar */}
        <div className="p-4 sm:p-6 bg-sky-50/60 border-b border-sky-100 space-y-3">
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Enter Tracking Reference e.g. KL-TEX-892410-NG"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-4 pr-10 py-3 text-sm font-mono font-medium rounded-xl border border-gray-300 bg-white focus:outline-hidden focus:ring-2 focus:ring-[#152A4E]"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
            <button
              type="submit"
              className="bg-[#152A4E] hover:bg-[#1D4F91] text-white px-6 py-3 rounded-xl font-heading font-bold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-xs"
            >
              SEARCH
            </button>
          </form>

          {/* Preset Buttons */}
          <div className="flex items-center gap-2 text-xs flex-wrap">
            <span className="text-gray-500 font-medium">Quick Select:</span>
            {allShipments.slice(0, 4).map((s) => (
              <button
                key={s.trackingNumber}
                onClick={() => {
                  setSearchQuery(s.trackingNumber);
                  setActiveShipment(s);
                }}
                className={`font-mono text-[11px] px-2.5 py-1 rounded-lg border transition-all ${
                  activeShipment?.trackingNumber === s.trackingNumber
                    ? 'bg-[#152A4E] text-white border-[#152A4E] font-bold'
                    : 'bg-white text-[#152A4E] border-gray-300 hover:border-sky-300'
                }`}
              >
                {s.trackingNumber}
              </button>
            ))}
          </div>
        </div>

        {/* Shipment Details View */}
        <div className="p-5 sm:p-6 space-y-6 flex-1 overflow-y-auto">
          {activeShipment ? (
            <div className="space-y-6">
              
              {/* Header Status Bar */}
              <div className="bg-gray-50 p-4 sm:p-5 rounded-2xl border border-gray-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-extrabold text-lg sm:text-xl text-[#152A4E]">
                      {activeShipment.trackingNumber}
                    </span>
                    <button
                      onClick={() => handleCopy(activeShipment.trackingNumber)}
                      className="p-1 rounded-md hover:bg-gray-200 text-gray-500"
                      title="Copy"
                    >
                      {copied ? <Check className="w-4 h-4 text-[#2FAE60]" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                  <span className="text-xs text-gray-500 block mt-0.5">
                    Route: {activeShipment.senderCity} → {activeShipment.receiverCity}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <span className="text-[10px] uppercase font-bold text-gray-400 block">Status</span>
                    <span className="font-heading font-extrabold text-sm text-[#2FAE60] bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 inline-block">
                      {activeShipment.status}
                    </span>
                  </div>
                  <div className="text-right pl-3 border-l border-gray-200">
                    <span className="text-[10px] uppercase font-bold text-gray-400 block">Est. Delivery</span>
                    <span className="font-semibold text-xs text-[#152A4E]">
                      {activeShipment.estimatedDelivery}
                    </span>
                  </div>
                </div>
              </div>

              {/* Current Location Note */}
              <div className="p-3.5 bg-sky-50 rounded-xl border border-sky-200 flex items-center gap-3 text-xs text-[#152A4E]">
                <MapPin className="w-5 h-5 text-[#1D4F91] shrink-0" />
                <div>
                  <strong className="block">Current Logistics Milestone:</strong>
                  <span>{activeShipment.currentLocation}</span>
                </div>
              </div>

              {/* Progress Timeline */}
              <div className="space-y-4 pt-2">
                <h4 className="font-heading font-bold text-sm text-[#152A4E] uppercase tracking-wider">
                  Shipment Event Timeline & Progress
                </h4>

                <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-gray-200">
                  {activeShipment.events.map((event, idx) => (
                    <div key={idx} className="relative flex items-start gap-4">
                      
                      {/* Event Dot */}
                      <div
                        className={`absolute -left-6 top-0.5 w-5 h-5 rounded-full border-2 flex items-center justify-center text-white ${
                          event.completed
                            ? 'bg-[#2FAE60] border-[#2FAE60]'
                            : 'bg-white border-gray-300'
                        }`}
                      >
                        {event.completed && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>

                      {/* Event Details */}
                      <div className="flex-1 bg-white p-3.5 rounded-xl border border-gray-200/80 shadow-2xs">
                        <div className="flex items-center justify-between text-xs font-semibold text-gray-500 mb-1">
                          <span className="text-[#1D4F91] font-bold">{event.location}</span>
                          <span>{event.date} • {event.time}</span>
                        </div>
                        <h5 className="font-heading font-bold text-sm text-[#152A4E]">
                          {event.status}
                        </h5>
                        <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                          {event.description}
                        </p>
                      </div>

                    </div>
                  ))}
                </div>
              </div>

            </div>
          ) : (
            <div className="text-center py-12 space-y-3">
              <Package className="w-12 h-12 text-gray-300 mx-auto" />
              <h4 className="font-heading font-bold text-lg text-[#152A4E]">
                No Shipment Found for "{searchQuery}"
              </h4>
              <p className="text-xs text-gray-500 max-w-sm mx-auto">
                Please check your tracking code or select one of the demo references above to view simulated tracking status.
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between text-xs">
          <span className="text-gray-500">
            Kingz Logistics Houston Center • Hotline: +1 (832) 555-KINGZ
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-[#152A4E] text-white font-semibold hover:bg-[#1D4F91] transition-colors"
          >
            Close Portal
          </button>
        </div>

      </div>
    </div>
  );
};
