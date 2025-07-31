export interface Client {
  id: string;
  name: string;
  phone: string;
  email?: string;
  coachId: string;
  status: 'active' | 'inactive' | 'prospect';
  notes?: string;
  createdAt: Date;
}

export interface Booking {
  id: string;
  coachId: string;
  clientId: string;
  clientName: string;
  clientPhone: string;
  date: string;
  time: string;
  callType: 'onboarding' | 'follow-up' | 'consultation' | 'assessment';
  isRecurring: boolean;
  recurringDay?: number;
  status: 'scheduled' | 'completed' | 'cancelled' | 'no-show';
  duration: number;
  notes?: string;
  createdAt: Date;
}

export interface TimeSlot {
  time: string;
  isBooked: boolean;
  booking?: Booking;
}

export interface DaySchedule {
  date: string;
  timeSlots: TimeSlot[];
}

export interface DashboardStats {
  totalBookings: number;
  completedBookings: number;
  upcomingBookings: number;
  totalClients: number;
  revenue: number;
  averageRating: number;
} 