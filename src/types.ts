export type ShippingMethod = 'container' | 'roro' | 'air' | 'local';
export type ShippingDirection = 'USA_TO_NG' | 'NG_TO_USA';
export type PackageType = 'Box' | 'Pallet' | 'Crate' | 'Vehicle' | 'Drum' | 'Envelope' | 'Other';
export type WeightUnit = 'kg' | 'lb';
export type DimensionUnit = 'cm' | 'in';
export type ServiceSpeed = 'standard' | 'express' | 'economy';
export type DeliveryMode = 'door_to_door' | 'warehouse_pickup';
export type PaymentMethod = 'card' | 'bank_transfer' | 'pay_on_delivery';

export interface SpecialHandling {
  fragile: boolean;
  perishable: boolean;
  highValue: boolean;
  refrigerated: boolean;
  hazardous: boolean;
}

export interface Dimensions {
  length: number;
  width: number;
  height: number;
  unit: DimensionUnit;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface ContactInfo {
  fullName: string;
  companyName?: string;
  phone: string;
  email: string;
  address: Address;
}

export interface SenderDetails extends ContactInfo {
  preferredPickupDate: string;
  pickupTimeWindow: string;
  senderIdNumber?: string;
}

export interface ReceiverDetails extends ContactInfo {
  relationship?: string;
  receiverIdOrBvn?: string;
}

export interface BookingFormData {
  // Step 1
  method: ShippingMethod;
  direction: ShippingDirection;
  packageType: PackageType;
  quantity: number;
  weight: number;
  weightUnit: WeightUnit;
  itemDescription: string;
  declaredValue: number;
  hasDimensions: boolean;
  dimensions: Dimensions;
  specialHandling: SpecialHandling;

  // Step 2
  sender: SenderDetails;
  receiver: ReceiverDetails;
  customsConfirmed: boolean;

  // Step 3
  serviceSpeed: ServiceSpeed;
  addInsurance: boolean;
  deliveryMode: DeliveryMode;
  paymentMethod: PaymentMethod;
  orderNotes: string;
  termsAccepted: boolean;
}

export interface RateCalculation {
  baseRate: number;
  weightCost: number;
  speedSurcharge: number;
  insuranceFee: number;
  doorDeliveryFee: number;
  specialHandlingFee: number;
  subtotal: number;
  estimatedTotal: number;
  estimatedDays: string;
}

export interface TrackingEvent {
  date: string;
  time: string;
  location: string;
  status: string;
  description: string;
  completed: boolean;
}

export interface ShipmentRecord {
  trackingNumber: string;
  bookingDate: string;
  direction: ShippingDirection;
  method: ShippingMethod;
  senderName: string;
  senderCity: string;
  receiverName: string;
  receiverCity: string;
  status: 'Booked' | 'In Transit' | 'Customs Clearance' | 'Out for Delivery' | 'Delivered';
  estimatedDelivery: string;
  currentLocation: string;
  events: TrackingEvent[];
  formData?: Partial<BookingFormData>;
  totalCost?: number;
}
