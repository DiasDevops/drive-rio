export interface Attraction {
  id: string;
  name: string;
  subtitle: string;
  category: 'monument' | 'beach' | 'culture' | 'nature' | 'gastronomy';
  imageUrl: string;
  description: string;
  accessInfo: string;
  operatingHours: string;
  ticketPrice: string;
  discountAvailable: boolean;
  discountPercentage?: number;
  highlightTag: string;
  fastPassAvailable: boolean;
  coordinates: { lat: number; lng: number };
  tips: string[];
}

export interface Driver {
  id: string;
  name: string;
  photoUrl: string;
  rating: number;
  reviewsCount: number;
  vehicle: {
    model: string;
    type: 'Sedan Executivo' | 'SUV Premium' | 'Van Executiva' | 'Blindado';
    capacity: number;
    year: number;
    plateEnd: string;
    airConditioned: boolean;
  };
  languages: string[];
  badges: string[];
  hourlyRate: number;
  cityTourRate: number;
  corcovadoTransferRate: number;
  bio: string;
  available: boolean;
  cadasturVerified: boolean;
}

export interface DiscountCoupon {
  id: string;
  title: string;
  partnerName: string;
  code: string;
  discountPercentage: number;
  validUntil: string;
  category: 'Pontos Turísticos' | 'Transfer & Motoristas' | 'Restaurantes' | 'Passeios de Barco & Helicóptero';
  description: string;
  terms: string;
  popular?: boolean;
}

export interface Message {
  id: string;
  chatId: string;
  senderId: string;
  senderName: string;
  senderRole: 'client' | 'driver' | 'provider' | 'ai_assistant';
  content: string;
  timestamp: string;
  isAudio?: boolean;
  audioDuration?: string;
  quote?: {
    serviceName: string;
    amount: number;
    date: string;
    status: 'pending' | 'accepted' | 'declined';
  };
}

export interface ChatThread {
  id: string;
  partnerId: string;
  partnerName: string;
  partnerAvatar: string;
  partnerRole: 'Driver' | 'Guia de Turismo' | 'Suporte Rio Express' | 'Ginga AI Concierge';
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  isVerified: boolean;
}

export interface ContactInquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  travelDate: string;
  passengers: number;
  serviceType: string;
  notes: string;
  status: 'sent' | 'processing' | 'confirmed';
}

export interface AiConciergeRequest {
  prompt: string;
  travelersCount?: number;
  stayDays?: number;
  interests?: string[];
  budget?: 'econômico' | 'conforto' | 'luxo';
}

export interface AiConciergeResponse {
  answer: string;
  suggestedItinerary?: {
    day: number;
    title: string;
    activities: string[];
    recommendedDriverType?: string;
    estimatedCostBRL?: number;
  }[];
  quickTips?: string[];
}
