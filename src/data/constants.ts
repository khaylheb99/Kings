import { BookingFormData, RateCalculation, ShipmentRecord, ShippingMethod, ServiceSpeed } from '../types';

export const TEXAS_CITIES = [
  'Houston',
  'Dallas',
  'Fort Worth',
  'Austin',
  'San Antonio',
  'El Paso',
  'Arlington',
  'Sugar Land',
  'Katy',
  'Pearland',
  'Spring',
  'Woodlands',
  'McAllen',
  'Lubbock',
  'Corpus Christi'
];

export const NIGERIAN_STATES = [
  'Lagos',
  'Abuja (FCT)',
  'Rivers (Port Harcourt)',
  'Oyo (Ibadan)',
  'Kano',
  'Anambra (Onitsha/Awka)',
  'Edo (Benin City)',
  'Enugu',
  'Delta (Warri/Asaba)',
  'Ogun (Abeokuta)',
  'Kaduna',
  'Akwa Ibom (Uyo)',
  'Cross River (Calabar)',
  'Imo (Owerri)',
  'Osun',
  'Ondo',
  'Kwara',
  'Abia (Aba)'
];

export const PACKAGE_TYPES = [
  { value: 'Box', label: 'Standard Box / Carton' },
  { value: 'Pallet', label: 'Freight Pallet / Skid' },
  { value: 'Crate', label: 'Wooden Crate' },
  { value: 'Vehicle', label: 'Vehicle (Car / SUV / Truck)' },
  { value: 'Drum', label: 'Shipping Drum / Barrel' },
  { value: 'Envelope', label: 'Document / Envelope' },
  { value: 'Other', label: 'Other Commercial Cargo' },
];

export const SHIPPING_METHODS = [
  {
    id: 'container' as ShippingMethod,
    title: 'Container Shipping',
    subtitle: 'Full & Shared Containers for Household Goods & Freight',
    icon: 'Container',
    badge: 'Best Value',
    transit: '25-35 Days',
    baseRate: 250,
    perKgRate: 4.5,
  },
  {
    id: 'roro' as ShippingMethod,
    title: 'RoRo Vehicle Shipping',
    subtitle: 'Roll-on Roll-off for Sedans, SUVs, Vans & Heavy Equipment',
    icon: 'Truck',
    badge: 'Specialized',
    transit: '20-30 Days',
    baseRate: 1100,
    perKgRate: 0,
  },
  {
    id: 'air' as ShippingMethod,
    title: 'Air Freight',
    subtitle: 'Fast Air Cargo for Urgent Packages & Documents',
    icon: 'Plane',
    badge: 'Fastest',
    transit: '5-9 Days',
    baseRate: 85,
    perKgRate: 9.8,
  },
  {
    id: 'local' as ShippingMethod,
    title: 'Local Transportation',
    subtitle: 'Texas Intra-state Pickup, Delivery & Drop-off Services',
    icon: 'MapPin',
    badge: 'Texas Hub',
    transit: '1-3 Days',
    baseRate: 120,
    perKgRate: 2.1,
  },
];

export const DEFAULT_BOOKING_DATA: BookingFormData = {
  method: 'container',
  direction: 'USA_TO_NG',
  packageType: 'Box',
  quantity: 1,
  weight: 25,
  weightUnit: 'lb',
  itemDescription: '',
  declaredValue: 500,
  hasDimensions: false,
  dimensions: {
    length: 50,
    width: 40,
    height: 30,
    unit: 'cm',
  },
  specialHandling: {
    fragile: false,
    perishable: false,
    highValue: false,
    refrigerated: false,
    hazardous: false,
  },
  sender: {
    fullName: '',
    companyName: '',
    phone: '',
    email: '',
    address: {
      street: '',
      city: 'Houston',
      state: 'Texas',
      zipCode: '',
      country: 'USA',
    },
    preferredPickupDate: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0],
    pickupTimeWindow: 'Morning (8am - 12pm)',
    senderIdNumber: '',
  },
  receiver: {
    fullName: '',
    phone: '',
    email: '',
    address: {
      street: '',
      city: 'Lagos',
      state: 'Lagos',
      zipCode: '100001',
      country: 'Nigeria',
    },
    relationship: 'Family',
    receiverIdOrBvn: '',
  },
  customsConfirmed: false,
  serviceSpeed: 'standard',
  addInsurance: true,
  deliveryMode: 'door_to_door',
  paymentMethod: 'card',
  orderNotes: '',
  termsAccepted: false,
};

export function calculateShippingRates(formData: BookingFormData): RateCalculation {
  const methodConfig = SHIPPING_METHODS.find((m) => m.id === formData.method) || SHIPPING_METHODS[0];
  
  // Convert weight to kg for calculation
  const weightInKg = formData.weightUnit === 'lb' ? formData.weight * 0.453592 : formData.weight;
  
  // Base rate calculation
  let baseRate = methodConfig.baseRate;
  
  // Method specific adjustments
  let weightCost = 0;
  if (formData.method === 'roro') {
    // For vehicle, base rate is per vehicle
    baseRate = 1250 * Math.max(1, formData.quantity);
  } else {
    weightCost = weightInKg * methodConfig.perKgRate * Math.max(1, formData.quantity);
  }

  // Speed Surcharge
  let speedSurcharge = 0;
  let estimatedDays = methodConfig.transit;

  if (formData.serviceSpeed === 'express') {
    speedSurcharge = (baseRate + weightCost) * 0.35;
    if (formData.method === 'air') estimatedDays = '3-5 Days';
    else if (formData.method === 'container') estimatedDays = '14-18 Days';
    else if (formData.method === 'roro') estimatedDays = '15-20 Days';
  } else if (formData.serviceSpeed === 'economy') {
    speedSurcharge = -(baseRate + weightCost) * 0.15; // 15% discount
    if (formData.method === 'container') estimatedDays = '35-45 Days';
    else if (formData.method === 'air') estimatedDays = '10-14 Days';
  }

  // Insurance fee (1.5% of declared value, minimum $15 if insurance is checked)
  let insuranceFee = 0;
  if (formData.addInsurance) {
    insuranceFee = Math.max(15, formData.declaredValue * 0.015);
  }

  // Door delivery fee
  let doorDeliveryFee = 0;
  if (formData.deliveryMode === 'door_to_door') {
    doorDeliveryFee = formData.method === 'roro' ? 180 : 45 * Math.max(1, formData.quantity);
  }

  // Special handling fee
  let specialHandlingFee = 0;
  if (formData.specialHandling.fragile) specialHandlingFee += 25;
  if (formData.specialHandling.refrigerated) specialHandlingFee += 80;
  if (formData.specialHandling.hazardous) specialHandlingFee += 150;
  if (formData.specialHandling.highValue) specialHandlingFee += 50;

  const subtotal = baseRate + weightCost + speedSurcharge + insuranceFee + doorDeliveryFee + specialHandlingFee;
  const estimatedTotal = Math.round(subtotal);

  return {
    baseRate: Math.round(baseRate),
    weightCost: Math.round(weightCost),
    speedSurcharge: Math.round(speedSurcharge),
    insuranceFee: Math.round(insuranceFee),
    doorDeliveryFee: Math.round(doorDeliveryFee),
    specialHandlingFee: Math.round(specialHandlingFee),
    subtotal: Math.round(subtotal),
    estimatedTotal,
    estimatedDays,
  };
}

export const SAMPLE_SHIPMENTS: ShipmentRecord[] = [
  {
    trackingNumber: 'KL-TEX-892410-NG',
    bookingDate: '2026-07-22',
    direction: 'USA_TO_NG',
    method: 'container',
    senderName: 'David Adebayo',
    senderCity: 'Houston, TX',
    receiverName: 'Blessing Adebayo',
    receiverCity: 'Lagos, Nigeria',
    status: 'In Transit',
    estimatedDelivery: 'Aug 12, 2026',
    currentLocation: 'Houston Freight Terminal - Processed for Atlantic Shipment',
    totalCost: 385,
    events: [
      {
        date: '2026-07-22',
        time: '09:30 AM',
        location: 'Houston Hub, TX',
        status: 'Shipment Booked & Confirmed',
        description: 'Package barcode generated and documentation filed with Kingz Logistics Houston team.',
        completed: true,
      },
      {
        date: '2026-07-23',
        time: '02:15 PM',
        location: 'Houston Warehouse',
        status: 'Received & Care Inspected',
        description: 'Goods inspected for fragile handling compliance and weighed at Houston export station.',
        completed: true,
      },
      {
        date: '2026-07-24',
        time: '08:00 AM',
        location: 'Port of Houston, TX',
        status: 'Loaded into Container KL-4091',
        description: 'Vessel departure initiated. Customs exit Manifest clearance approved.',
        completed: true,
      },
      {
        date: '2026-08-05',
        time: 'Expected',
        location: 'Tincan Port, Lagos',
        status: 'Arrival at Nigeria Customs Port',
        description: 'Kingz Lagos agent ready for expedited clearance.',
        completed: false,
      },
      {
        date: '2026-08-12',
        time: 'Expected',
        location: 'Ikeja, Lagos Address',
        status: 'Final Doorstep Delivery',
        description: 'Kingz local courier driver dispatched.',
        completed: false,
      },
    ],
  },
  {
    trackingNumber: 'KL-883920-LOS',
    bookingDate: '2026-07-18',
    direction: 'USA_TO_NG',
    method: 'air',
    senderName: 'Michael Carter',
    senderCity: 'Dallas, TX',
    receiverName: 'Tunde Ogunlesi',
    receiverCity: 'Abuja, Nigeria',
    status: 'Customs Clearance',
    estimatedDelivery: 'Jul 26, 2026',
    currentLocation: 'Murtala Muhammed International Airport (MMIA), Lagos',
    totalCost: 210,
    events: [
      {
        date: '2026-07-18',
        time: '11:00 AM',
        location: 'Dallas Branch, TX',
        status: 'Air Cargo Accepted',
        description: 'Package processed for expedited flight.',
        completed: true,
      },
      {
        date: '2026-07-20',
        time: '06:45 PM',
        location: 'Houston Air Hub',
        status: 'Departed USA Air Freight Hub',
        description: 'Direct cargo flight dispatched to West Africa.',
        completed: true,
      },
      {
        date: '2026-07-23',
        time: '04:20 PM',
        location: 'MMIA Lagos Cargo Terminal',
        status: 'Customs Inspection in Progress',
        description: 'Kingz Logistics designated agent completing Nigeria customs clearance.',
        completed: true,
      },
      {
        date: '2026-07-26',
        time: 'Expected',
        location: 'Abuja FCT',
        status: 'Final Delivery to Receiver',
        description: 'Handover to destination point.',
        completed: false,
      },
    ],
  },
  {
    trackingNumber: 'KL-774011-ABJ',
    bookingDate: '2026-07-01',
    direction: 'NG_TO_USA',
    method: 'container',
    senderName: 'Nneka Okeke',
    senderCity: 'Port Harcourt, NG',
    receiverName: 'Emeka Okeke',
    receiverCity: 'Austin, TX',
    status: 'Delivered',
    estimatedDelivery: 'Jul 21, 2026',
    currentLocation: 'Delivered to Receiver in Austin, Texas',
    totalCost: 520,
    events: [
      {
        date: '2026-07-01',
        time: '10:00 AM',
        location: 'Port Harcourt Hub, NG',
        status: 'Received at Nigeria Hub',
        description: 'Goods carefully packed and logged.',
        completed: true,
      },
      {
        date: '2026-07-05',
        time: '01:00 PM',
        location: 'Lagos Seaport',
        status: 'Vessel Departure',
        description: 'Sailed across Atlantic to Port of Houston.',
        completed: true,
      },
      {
        date: '2026-07-19',
        time: '09:00 AM',
        location: 'Houston Port, TX',
        status: 'Cleared US Customs & Border Protection',
        description: 'Kingz Texas truck assigned for local transfer to Austin.',
        completed: true,
      },
      {
        date: '2026-07-21',
        time: '02:30 PM',
        location: 'Austin, TX',
        status: 'Successfully Delivered',
        description: 'Signed for by Emeka Okeke. Thank you for shipping with Kingz!',
        completed: true,
      },
    ],
  },
];
