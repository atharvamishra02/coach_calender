import { TimeSlot, DaySchedule, Booking } from "../types";

export const generateTimeSlots = (): string[] => {
  const slots: string[] = [];
  let hour = 10;
  let minute = 30;

  while (hour < 19 || (hour === 19 && minute <= 30)) {
    const timeString = `${hour.toString().padStart(2, "0")}:${minute
      .toString()
      .padStart(2, "0")}`;
    slots.push(timeString);

    minute += 20;
    if (minute >= 60) {
      minute = 0;
      hour += 1;
    }
  }

  return slots;
};

export const createDaySchedule = (date: string): DaySchedule => {
  const timeSlots = generateTimeSlots().map((time) => ({
    time,
    isBooked: false,
    booking: undefined,
  }));

  return {
    date,
    timeSlots,
  };
};

export const isBookingOnDate = (
  booking: Booking,
  targetDate: string
): boolean => {
  if (booking.isRecurring && booking.recurringDay !== undefined) {
    const targetDay = new Date(targetDate).getDay();
    return targetDay === booking.recurringDay;
  }

  return booking.date === targetDate;
};

export const populateTimeSlots = (
  schedule: DaySchedule,
  bookings: Booking[]
): DaySchedule => {
  const updatedSlots = schedule.timeSlots.map((slot) => {
    const booking = bookings.find(
      (b) => isBookingOnDate(b, schedule.date) && b.time === slot.time
    );

    return {
      ...slot,
      isBooked: !!booking,
      booking,
    };
  });

  return {
    ...schedule,
    timeSlots: updatedSlots,
  };
};

export const formatTimeDisplay = (time: string): string => {
  const [hours, minutes] = time.split(":");
  const hour = parseInt(hours);
  const ampm = hour >= 12 ? "PM" : "AM";
  const displayHour = hour % 12 || 12;
  return `${displayHour}:${minutes} ${ampm}`;
};

export const getDayName = (date: string): string => {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return days[new Date(date).getDay()];
};

export const getFormattedDate = (date: string): string => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const d = new Date(date);
  return `${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
};


export const addDays = (date: string, days: number): string => {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d.toISOString().split("T")[0];
};


export const subDays = (date: string, days: number): string => {
  const d = new Date(date);
  d.setDate(d.getDate() - days);
  return d.toISOString().split("T")[0];
};


export const formatDateForInput = (date: Date): string => {
  return date.toISOString().split("T")[0];
};
