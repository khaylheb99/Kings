import React, { useState } from 'react';
import { BookingFormData, ShipmentRecord } from './types';
import { DEFAULT_BOOKING_DATA, calculateShippingRates } from './data/constants';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ProgressTracker } from './components/ProgressTracker';
import { Step1ShipmentDetails } from './components/Step1ShipmentDetails';
import { Step2SenderReceiver } from './components/Step2SenderReceiver';
import { Step3ServiceSetup } from './components/Step3ServiceSetup';
import { ShipmentSummary } from './components/ShipmentSummary';
import { ConfirmationScreen } from './components/ConfirmationScreen';
import { TrackingModal } from './components/TrackingModal';
import { WhatsAppButton } from './components/WhatsAppButton';
import { ResourcesSection } from './components/ResourcesSection';
import { Logo } from './components/Logo';
import { Phone, Mail, MapPin, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function App() {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [formData, setFormData] = useState<BookingFormData>(DEFAULT_BOOKING_DATA);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [bookingRef, setBookingRef] = useState<string>('');
  const [isBookingSubmitted, setIsBookingSubmitted] = useState<boolean>(false);

  // Active view section
  const [activeSection, setActiveSection] = useState<'book' | 'resources'>('book');

  // Tracking modal state
  const [trackingModalOpen, setTrackingModalOpen] = useState<boolean>(false);
  const [selectedTrackingCode, setSelectedTrackingCode] = useState<string>('');

  // User submitted bookings list
  const [userBookings, setUserBookings] = useState<ShipmentRecord[]>([]);

  // Update Form State Helper
  const updateFormData = (fields: Partial<BookingFormData>) => {
    setFormData((prev) => ({ ...prev, ...fields }));
  };

  // Step Navigation
  const handleNextStep = () => {
    setCurrentStep((prev) => Math.min(3, prev + 1));
    window.scrollTo({ top: 400, behavior: 'smooth' });
  };

  const handleBackStep = () => {
    setCurrentStep((prev) => Math.max(1, prev - 1));
    window.scrollTo({ top: 400, behavior: 'smooth' });
  };

  const handleStepClick = (step: number) => {
    setCurrentStep(step);
  };

  // Submit Booking Handler
  const handleSubmitBooking = () => {
    setIsSubmitting(true);

    setTimeout(() => {
      // Generate tracking number e.g., KL-TEX-892410-NG
      const randomNum = Math.floor(100000 + Math.random() * 900000);
      const isUsaToNg = formData.direction === 'USA_TO_NG';
      const refCode = `KL-${isUsaToNg ? 'TEX' : 'NG'}-${randomNum}-${isUsaToNg ? 'NG' : 'USA'}`;
      
      setBookingRef(refCode);
      setIsSubmitting(false);
      setIsBookingSubmitted(true);

      // Add to user bookings
      const rates = calculateShippingRates(formData);
      const newRecord: ShipmentRecord = {
        trackingNumber: refCode,
        bookingDate: new Date().toISOString().split('T')[0],
        direction: formData.direction,
        method: formData.method,
        senderName: formData.sender.fullName,
        senderCity: `${formData.sender.address.city}, ${formData.sender.address.state}`,
        receiverName: formData.receiver.fullName,
        receiverCity: `${formData.receiver.address.city}, ${formData.receiver.address.country}`,
        status: 'Booked',
        estimatedDelivery: `${rates.estimatedDays} from dispatch`,
        currentLocation: isUsaToNg ? 'Houston Terminal - Consignment Registered' : 'Lagos Hub - Booking Verified',
        totalCost: rates.estimatedTotal,
        formData: formData,
        events: [
          {
            date: new Date().toISOString().split('T')[0],
            time: 'Just now',
            location: isUsaToNg ? 'Houston Station, TX' : 'Lagos Hub, Nigeria',
            status: 'Shipment Booked & Confirmed',
            description: `Booking request logged under reference ${refCode}. Dispatch team notified.`,
            completed: true,
          },
          {
            date: 'Pending',
            time: 'Upcoming',
            location: 'Origin Warehouse',
            status: 'Cargo Inspection & Weighing',
            description: 'Physical inspection and barcode labeling at Kingz Logistics station.',
            completed: false,
          },
          {
            date: 'Pending',
            time: 'Upcoming',
            location: 'International Ocean / Air Port',
            status: 'Export Customs Clearance',
            description: 'Vessel / Flight dispatch manifest approval.',
            completed: false,
          },
        ],
      };

      setUserBookings((prev) => [newRecord, ...prev]);
      window.scrollTo({ top: 300, behavior: 'smooth' });
    }, 1200);
  };

  // Reset Booking Form
  const handleResetForm = () => {
    setFormData(DEFAULT_BOOKING_DATA);
    setCurrentStep(1);
    setIsBookingSubmitted(false);
    setBookingRef('');
    setActiveSection('book');
  };

  // Open Tracking Modal
  const handleOpenTracking = (code?: string) => {
    setSelectedTrackingCode(code || '');
    setTrackingModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F3F4F6] font-body text-[#22262E] antialiased selection:bg-[#BFE3F7] selection:text-[#152A4E]">
      
      {/* App Header */}
      <Header
        onOpenTracking={handleOpenTracking}
        onResetForm={handleResetForm}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />

      {/* Hero Strip Section */}
      <Hero
        onOpenTracking={handleOpenTracking}
        onStartBooking={() => {
          setActiveSection('book');
          const element = document.getElementById('booking-form-section');
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }}
      />

      {/* Main Content Workspace */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8" id="booking-form-section">
        
        {activeSection === 'resources' ? (
          <ResourcesSection onStartBooking={() => setActiveSection('book')} />
        ) : isBookingSubmitted ? (
          <ConfirmationScreen
            formData={formData}
            bookingRef={bookingRef}
            onOpenTracking={handleOpenTracking}
            onResetForm={handleResetForm}
          />
        ) : (
          <div className="space-y-6">
            
            {/* Horizontal Step Progress Tracker */}
            <ProgressTracker
              currentStep={currentStep}
              totalSteps={3}
              onStepClick={handleStepClick}
            />

            {/* Two-Column Horizon Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
              
              {/* Left Column: Form Step Card (White Card with 16px radius) */}
              <div className="lg:col-span-7 bg-white rounded-2xl p-5 sm:p-8 shadow-xs border border-gray-200/90">
                {currentStep === 1 && (
                  <Step1ShipmentDetails
                    formData={formData}
                    updateFormData={updateFormData}
                    onNext={handleNextStep}
                  />
                )}

                {currentStep === 2 && (
                  <Step2SenderReceiver
                    formData={formData}
                    updateFormData={updateFormData}
                    onNext={handleNextStep}
                    onBack={handleBackStep}
                  />
                )}

                {currentStep === 3 && (
                  <Step3ServiceSetup
                    formData={formData}
                    updateFormData={updateFormData}
                    onSubmitBooking={handleSubmitBooking}
                    onBack={handleBackStep}
                    isSubmitting={isSubmitting}
                  />
                )}
              </div>

              {/* Right Column: Persistent Shipment Summary Sidebar Card */}
              <div className="lg:col-span-5 w-full">
                <ShipmentSummary formData={formData} currentStep={currentStep} />
              </div>

            </div>

          </div>
        )}

      </main>

      {/* Footer Section */}
      <footer className="bg-[#152A4E] text-white border-t border-sky-900/50 pt-12 pb-8 mt-16 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Col 1: Brand Info */}
            <div className="space-y-3">
              <Logo size="md" className="bg-white/95 p-2 rounded-xl shadow-xs" />
              <p className="text-sky-200 leading-relaxed pt-1">
                Kingz Logistics is Texas' trusted freight & courier partner, delivering peace of mind across the USA and Nigeria with speed, safety, and care.
              </p>
              <div className="flex items-center gap-2 text-emerald-400 font-semibold pt-1">
                <ShieldCheck className="w-4 h-4" />
                <span>100% On-Time & Loss-Free Guarantee</span>
              </div>
            </div>

            {/* Col 2: Texas Hub */}
            <div className="space-y-2">
              <h4 className="font-heading font-bold text-sm text-white uppercase tracking-wider">
                Texas Dispatch Hub
              </h4>
              <div className="space-y-1.5 text-sky-200">
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-[#BFE3F7] shrink-0 mt-0.5" />
                  <span>8900 Southwest Fwy, Suite 102, Houston, TX 77074</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-[#BFE3F7] shrink-0" />
                  <span>+1 (832) 555-KINGZ</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-[#BFE3F7] shrink-0" />
                  <span>ship@kingzlogistics.com</span>
                </div>
              </div>
            </div>

            {/* Col 3: Lagos Hub */}
            <div className="space-y-2">
              <h4 className="font-heading font-bold text-sm text-white uppercase tracking-wider">
                Nigeria Center
              </h4>
              <div className="space-y-1.5 text-sky-200">
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-[#BFE3F7] shrink-0 mt-0.5" />
                  <span>14 Allen Avenue, Ikeja, Lagos, Nigeria</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-[#BFE3F7] shrink-0" />
                  <span>+234 803 555 KINGZ</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-[#BFE3F7] shrink-0" />
                  <span>lagos@kingzlogistics.com</span>
                </div>
              </div>
            </div>

            {/* Col 4: Core Services */}
            <div className="space-y-2">
              <h4 className="font-heading font-bold text-sm text-white uppercase tracking-wider">
                Services
              </h4>
              <ul className="space-y-1 text-sky-200">
                <li>• Container Shipping (Sea Freight)</li>
                <li>• RoRo Vehicle & Car Freight</li>
                <li>• Air Cargo Express (5-7 Days)</li>
                <li>• Texas Local Pickup & Distribution</li>
                <li>• Customs Clearance & Documentation</li>
              </ul>
            </div>
          </div>

          <div className="pt-6 border-t border-sky-900/60 flex flex-col sm:flex-row items-center justify-between gap-2 text-sky-300 text-[11px]">
            <span>© {new Date().getFullYear()} Kingz Logistics Inc. All rights reserved. Registered in Texas, USA.</span>
            <div className="flex items-center gap-4">
              <button onClick={() => setActiveSection('resources')} className="hover:text-white underline">
                Customs Regulations
              </button>
              <button onClick={() => handleOpenTracking()} className="hover:text-white underline">
                Live Tracking Portal
              </button>
              <button onClick={handleResetForm} className="hover:text-white underline">
                Book Shipment
              </button>
            </div>
          </div>

        </div>
      </footer>

      {/* Live Interactive Tracking Modal */}
      <TrackingModal
        isOpen={trackingModalOpen}
        onClose={() => setTrackingModalOpen(false)}
        initialTrackingNumber={selectedTrackingCode}
        userBookings={userBookings}
      />

      {/* Floating WhatsApp Support Widget */}
      <WhatsAppButton />

    </div>
  );
}
