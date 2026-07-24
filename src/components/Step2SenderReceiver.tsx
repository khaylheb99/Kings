import React from 'react';
import { BookingFormData, SenderDetails, ReceiverDetails } from '../types';
import { TEXAS_CITIES, NIGERIAN_STATES } from '../data/constants';
import { User, MapPin, Building, Phone, Mail, Calendar, Clock, ShieldAlert, CheckSquare, ArrowLeft, ArrowRight } from 'lucide-react';

interface Step2Props {
  formData: BookingFormData;
  updateFormData: (fields: Partial<BookingFormData>) => void;
  onNext: () => void;
  onBack: () => void;
}

export const Step2SenderReceiver: React.FC<Step2Props> = ({
  formData,
  updateFormData,
  onNext,
  onBack,
}) => {
  const isUsaToNg = formData.direction === 'USA_TO_NG';

  const updateSender = (fields: Partial<SenderDetails>) => {
    updateFormData({
      sender: { ...formData.sender, ...fields },
    });
  };

  const updateSenderAddress = (fields: Partial<SenderDetails['address']>) => {
    updateFormData({
      sender: {
        ...formData.sender,
        address: { ...formData.sender.address, ...fields },
      },
    });
  };

  const updateReceiver = (fields: Partial<ReceiverDetails>) => {
    updateFormData({
      receiver: { ...formData.receiver, ...fields },
    });
  };

  const updateReceiverAddress = (fields: Partial<ReceiverDetails['address']>) => {
    updateFormData({
      receiver: {
        ...formData.receiver,
        address: { ...formData.receiver.address, ...fields },
      },
    });
  };

  // Form Validation
  const isSenderValid =
    formData.sender.fullName.trim().length >= 2 &&
    formData.sender.phone.trim().length >= 7 &&
    formData.sender.email.trim().includes('@') &&
    formData.sender.address.street.trim().length >= 3 &&
    formData.sender.address.city.trim().length >= 2;

  const isReceiverValid =
    formData.receiver.fullName.trim().length >= 2 &&
    formData.receiver.phone.trim().length >= 7 &&
    formData.receiver.email.trim().includes('@') &&
    formData.receiver.address.street.trim().length >= 3 &&
    formData.receiver.address.city.trim().length >= 2;

  const isFormValid = isSenderValid && isReceiverValid && formData.customsConfirmed;

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Step Header */}
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-[#1D4F91]">
          Step 2 of 3
        </span>
        <h2 className="font-heading font-extrabold text-2xl text-[#152A4E]">
          Sender & Receiver Details
        </h2>
        <p className="text-sm text-gray-600 mt-1">
          Provide accurate contact and address details so our pickup team and destination drivers can reach both parties without delay.
        </p>
      </div>

      {/* SENDER SECTION */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-gray-200 shadow-2xs space-y-4">
        <div className="flex items-center gap-2 border-b border-gray-100 pb-3">
          <div className="p-2 rounded-xl bg-sky-100 text-[#152A4E]">
            <User className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-heading font-bold text-base text-[#152A4E]">
              Sender Information ({isUsaToNg ? 'USA Pickup' : 'Nigeria Origin'})
            </h3>
            <span className="text-xs text-gray-500">Person or business dispatching the shipment</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          
          {/* Full Name */}
          <div className="space-y-1">
            <label className="block text-xs font-bold text-[#152A4E]">
              Full Name <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={formData.sender.fullName}
                onChange={(e) => updateSender({ fullName: e.target.value })}
                placeholder="e.g. David Adebayo"
                className="w-full pl-9 pr-3.5 py-2 text-sm font-medium rounded-xl border border-gray-300 bg-white focus:ring-2 focus:ring-[#152A4E]"
              />
            </div>
          </div>

          {/* Company Name */}
          <div className="space-y-1">
            <label className="block text-xs font-bold text-[#152A4E]">
              Company Name <span className="text-gray-400 font-normal">(Optional)</span>
            </label>
            <div className="relative">
              <Building className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={formData.sender.companyName || ''}
                onChange={(e) => updateSender({ companyName: e.target.value })}
                placeholder="e.g. Texas Freight LLC"
                className="w-full pl-9 pr-3.5 py-2 text-sm font-medium rounded-xl border border-gray-300 bg-white focus:ring-2 focus:ring-[#152A4E]"
              />
            </div>
          </div>

          {/* Phone Number */}
          <div className="space-y-1">
            <label className="block text-xs font-bold text-[#152A4E]">
              Phone Number <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Phone className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="tel"
                value={formData.sender.phone}
                onChange={(e) => updateSender({ phone: e.target.value })}
                placeholder={isUsaToNg ? "+1 (832) 555-0192" : "+234 803 123 4567"}
                className="w-full pl-9 pr-3.5 py-2 text-sm font-medium rounded-xl border border-gray-300 bg-white focus:ring-2 focus:ring-[#152A4E]"
              />
            </div>
          </div>

          {/* Email Address */}
          <div className="space-y-1">
            <label className="block text-xs font-bold text-[#152A4E]">
              Email Address <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                value={formData.sender.email}
                onChange={(e) => updateSender({ email: e.target.value })}
                placeholder="david.adebayo@example.com"
                className="w-full pl-9 pr-3.5 py-2 text-sm font-medium rounded-xl border border-gray-300 bg-white focus:ring-2 focus:ring-[#152A4E]"
              />
            </div>
          </div>

        </div>

        {/* Sender Address */}
        <div className="pt-2 border-t border-gray-100 space-y-3">
          <div className="space-y-1">
            <label className="block text-xs font-bold text-[#152A4E]">
              Street Pickup Address <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <MapPin className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={formData.sender.address.street}
                onChange={(e) => updateSenderAddress({ street: e.target.value })}
                placeholder="e.g. 8900 Southwest Fwy, Suite 102"
                className="w-full pl-9 pr-3.5 py-2 text-sm font-medium rounded-xl border border-gray-300 bg-white focus:ring-2 focus:ring-[#152A4E]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            
            {/* City */}
            <div className="space-y-1">
              <label className="block text-xs font-bold text-[#152A4E]">
                City <span className="text-red-500">*</span>
              </label>
              {isUsaToNg ? (
                <select
                  value={formData.sender.address.city}
                  onChange={(e) => updateSenderAddress({ city: e.target.value })}
                  className="w-full px-3 py-2 text-sm font-medium rounded-xl border border-gray-300 bg-white"
                >
                  {TEXAS_CITIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                  <option value="Other Texas City">Other Texas City</option>
                </select>
              ) : (
                <input
                  type="text"
                  value={formData.sender.address.city}
                  onChange={(e) => updateSenderAddress({ city: e.target.value })}
                  placeholder="Lagos / Port Harcourt"
                  className="w-full px-3 py-2 text-sm font-medium rounded-xl border border-gray-300 bg-white"
                />
              )}
            </div>

            {/* State */}
            <div className="space-y-1">
              <label className="block text-xs font-bold text-[#152A4E]">
                State / Region <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.sender.address.state}
                onChange={(e) => updateSenderAddress({ state: e.target.value })}
                placeholder={isUsaToNg ? "Texas" : "Lagos State"}
                className="w-full px-3 py-2 text-sm font-medium rounded-xl border border-gray-300 bg-white"
              />
            </div>

            {/* ZIP / Postal Code */}
            <div className="space-y-1">
              <label className="block text-xs font-bold text-[#152A4E]">
                ZIP / Postal Code
              </label>
              <input
                type="text"
                value={formData.sender.address.zipCode}
                onChange={(e) => updateSenderAddress({ zipCode: e.target.value })}
                placeholder="77074"
                className="w-full px-3 py-2 text-sm font-medium rounded-xl border border-gray-300 bg-white"
              />
            </div>

          </div>

          {/* Pickup Window */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div className="space-y-1">
              <label className="block text-xs font-bold text-[#152A4E]">
                Preferred Pickup Date
              </label>
              <div className="relative">
                <Calendar className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="date"
                  value={formData.sender.preferredPickupDate}
                  onChange={(e) => updateSender({ preferredPickupDate: e.target.value })}
                  className="w-full pl-9 pr-3 py-2 text-sm font-medium rounded-xl border border-gray-300 bg-white"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-bold text-[#152A4E]">
                Pickup Time Window
              </label>
              <div className="relative">
                <Clock className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <select
                  value={formData.sender.pickupTimeWindow}
                  onChange={(e) => updateSender({ pickupTimeWindow: e.target.value })}
                  className="w-full pl-9 pr-3 py-2 text-sm font-medium rounded-xl border border-gray-300 bg-white"
                >
                  <option value="Morning (8am - 12pm)">Morning (8am - 12pm)</option>
                  <option value="Afternoon (12pm - 5pm)">Afternoon (12pm - 5pm)</option>
                  <option value="Evening (5pm - 8pm)">Evening (5pm - 8pm)</option>
                  <option value="Drop off at Houston Hub">Self Drop-off at Kingz Station</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* RECEIVER SECTION */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-gray-200 shadow-2xs space-y-4">
        <div className="flex items-center gap-2 border-b border-gray-100 pb-3">
          <div className="p-2 rounded-xl bg-emerald-100 text-[#2FAE60]">
            <MapPin className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-heading font-bold text-base text-[#152A4E]">
              Receiver Information ({isUsaToNg ? 'Nigeria Destination' : 'USA Address'})
            </h3>
            <span className="text-xs text-gray-500">Recipient taking delivery of the goods</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          
          {/* Full Name */}
          <div className="space-y-1">
            <label className="block text-xs font-bold text-[#152A4E]">
              Receiver Full Name <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={formData.receiver.fullName}
                onChange={(e) => updateReceiver({ fullName: e.target.value })}
                placeholder="e.g. Blessing Adebayo"
                className="w-full pl-9 pr-3.5 py-2 text-sm font-medium rounded-xl border border-gray-300 bg-white focus:ring-2 focus:ring-[#152A4E]"
              />
            </div>
          </div>

          {/* Phone Number */}
          <div className="space-y-1">
            <label className="block text-xs font-bold text-[#152A4E]">
              Receiver Phone Number <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Phone className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="tel"
                value={formData.receiver.phone}
                onChange={(e) => updateReceiver({ phone: e.target.value })}
                placeholder={isUsaToNg ? "+234 803 123 4567" : "+1 (832) 555-0192"}
                className="w-full pl-9 pr-3.5 py-2 text-sm font-medium rounded-xl border border-gray-300 bg-white focus:ring-2 focus:ring-[#152A4E]"
              />
            </div>
          </div>

          {/* Email Address */}
          <div className="space-y-1">
            <label className="block text-xs font-bold text-[#152A4E]">
              Receiver Email Address <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                value={formData.receiver.email}
                onChange={(e) => updateReceiver({ email: e.target.value })}
                placeholder="blessing.a@example.com"
                className="w-full pl-9 pr-3.5 py-2 text-sm font-medium rounded-xl border border-gray-300 bg-white focus:ring-2 focus:ring-[#152A4E]"
              />
            </div>
          </div>

          {/* Relationship to Sender */}
          <div className="space-y-1">
            <label className="block text-xs font-bold text-[#152A4E]">
              Relationship to Sender
            </label>
            <select
              value={formData.receiver.relationship || 'Family'}
              onChange={(e) => updateReceiver({ relationship: e.target.value })}
              className="w-full px-3 py-2 text-sm font-medium rounded-xl border border-gray-300 bg-white"
            >
              <option value="Family">Family Member</option>
              <option value="Business">Business Client / Partner</option>
              <option value="Self">Self (Relocation / Personal Shipment)</option>
              <option value="Friend">Friend</option>
              <option value="Other">Other</option>
            </select>
          </div>

        </div>

        {/* Receiver Delivery Address */}
        <div className="pt-2 border-t border-gray-100 space-y-3">
          <div className="space-y-1">
            <label className="block text-xs font-bold text-[#152A4E]">
              Street Delivery Address <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <MapPin className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={formData.receiver.address.street}
                onChange={(e) => updateReceiverAddress({ street: e.target.value })}
                placeholder="e.g. 14 Allen Avenue, Ikeja"
                className="w-full pl-9 pr-3.5 py-2 text-sm font-medium rounded-xl border border-gray-300 bg-white focus:ring-2 focus:ring-[#152A4E]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            
            {/* City */}
            <div className="space-y-1">
              <label className="block text-xs font-bold text-[#152A4E]">
                City / Town <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.receiver.address.city}
                onChange={(e) => updateReceiverAddress({ city: e.target.value })}
                placeholder="Ikeja / Lekki / Victoria Island"
                className="w-full px-3 py-2 text-sm font-medium rounded-xl border border-gray-300 bg-white"
              />
            </div>

            {/* State/Region Dropdown for Nigeria */}
            <div className="space-y-1">
              <label className="block text-xs font-bold text-[#152A4E]">
                State / Region <span className="text-red-500">*</span>
              </label>
              {isUsaToNg ? (
                <select
                  value={formData.receiver.address.state}
                  onChange={(e) => updateReceiverAddress({ state: e.target.value })}
                  className="w-full px-3 py-2 text-sm font-medium rounded-xl border border-gray-300 bg-white"
                >
                  {NIGERIAN_STATES.map((st) => (
                    <option key={st} value={st}>
                      {st}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type="text"
                  value={formData.receiver.address.state}
                  onChange={(e) => updateReceiverAddress({ state: e.target.value })}
                  placeholder="Texas"
                  className="w-full px-3 py-2 text-sm font-medium rounded-xl border border-gray-300 bg-white"
                />
              )}
            </div>

            {/* Country */}
            <div className="space-y-1">
              <label className="block text-xs font-bold text-[#152A4E]">
                Country
              </label>
              <input
                type="text"
                disabled
                value={isUsaToNg ? 'Nigeria' : 'USA'}
                className="w-full px-3 py-2 text-sm font-semibold rounded-xl border border-gray-200 bg-gray-100 text-gray-700"
              />
            </div>

          </div>
        </div>
      </div>

      {/* ID & CUSTOMS DECLARATION SECTION */}
      <div className="bg-sky-50/60 rounded-2xl p-4 sm:p-5 border border-sky-200 space-y-4">
        <div className="flex items-center gap-2">
          <ShieldAlert className="w-5 h-5 text-[#152A4E]" />
          <div>
            <h3 className="font-heading font-bold text-sm text-[#152A4E]">
              Customs Clearance & Identification Info
            </h3>
            <span className="text-xs text-gray-500">Required by US Customs & Border Protection and Nigeria Customs Service</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="block text-xs font-semibold text-[#152A4E]">
              Sender ID / Driver License No. <span className="text-gray-400">(Optional)</span>
            </label>
            <input
              type="text"
              value={formData.sender.senderIdNumber || ''}
              onChange={(e) => updateSender({ senderIdNumber: e.target.value })}
              placeholder="e.g. TX-98402120"
              className="w-full px-3 py-2 text-sm font-medium rounded-xl border border-gray-300 bg-white"
            />
          </div>

          <div className="space-y-1">
            <label className="block text-xs font-semibold text-[#152A4E]">
              Receiver ID / BVN / NIN <span className="text-gray-400">(Required for items &gt; $2,500)</span>
            </label>
            <input
              type="text"
              value={formData.receiver.receiverIdOrBvn || ''}
              onChange={(e) => updateReceiver({ receiverIdOrBvn: e.target.value })}
              placeholder="e.g. NIN or BVN 2223019280"
              className="w-full px-3 py-2 text-sm font-medium rounded-xl border border-gray-300 bg-white"
            />
          </div>
        </div>

        {/* Customs Confirmation Checkbox */}
        <label className="flex items-start gap-3 p-3 rounded-xl bg-white border border-sky-200 cursor-pointer hover:border-[#152A4E] transition-colors">
          <input
            type="checkbox"
            checked={formData.customsConfirmed}
            onChange={(e) => updateFormData({ customsConfirmed: e.target.checked })}
            className="mt-1 rounded-xs text-[#152A4E] focus:ring-[#152A4E] w-4 h-4"
          />
          <span className="text-xs text-gray-700 leading-snug">
            <strong className="text-[#152A4E]">Customs Compliance Declaration:</strong> I confirm that all listed contents comply with USA export and Nigerian import regulations, and do not contain cash, weapons, narcotics, counterfeit goods, or unapproved contraband.
          </span>
        </label>
      </div>

      {/* Bottom Action Bar */}
      <div className="pt-4 border-t border-gray-200 flex items-center justify-between">
        <button
          type="button"
          onClick={onBack}
          className="px-5 py-2.5 rounded-xl border border-gray-300 text-gray-700 font-heading font-semibold text-xs sm:text-sm hover:bg-gray-100 transition-all flex items-center gap-1.5 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back: Cargo Details</span>
        </button>

        <button
          type="button"
          disabled={!isFormValid}
          onClick={onNext}
          className={`px-8 py-3 rounded-xl font-heading font-bold text-sm transition-all flex items-center gap-2 cursor-pointer shadow-sm ${
            isFormValid
              ? 'bg-[#152A4E] hover:bg-[#1D4F91] text-white active:scale-98'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          <span>Next Step: Service & Payment</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};
