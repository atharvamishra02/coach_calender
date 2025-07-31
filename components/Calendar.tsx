'use client';

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Plus, Trash2, Calendar as CalendarIcon, Shield } from './Icons';
import { Booking, TimeSlot } from '../types';
import { createDaySchedule, populateTimeSlots, getDayName, getFormattedDate, formatTimeDisplay, addDays, subDays } from '../utils/calendar';
import BookingModal from './BookingModal';
import DataSafetyFeatures from './DataSafetyFeatures';
import { firestoreService } from '../lib/firestore';

const Calendar: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  });
  const [schedule, setSchedule] = useState<{ timeSlots: TimeSlot[] }>({ timeSlots: [] });
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('');
  const [loading, setLoading] = useState(true);
  const [showDataSafety, setShowDataSafety] = useState(false);

  useEffect(() => {
    const unsubscribe = firestoreService.bookings.onSnapshot((updatedBookings) => {
      setBookings(updatedBookings);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const populatedSchedule = populateTimeSlots(createDaySchedule(selectedDate), bookings);
    setSchedule(populatedSchedule);
  }, [selectedDate, bookings]);

  const handleDateChange = (direction: 'prev' | 'next') => {
    const newDate = direction === 'next' 
      ? addDays(selectedDate, 1) 
      : subDays(selectedDate, 1);
    setSelectedDate(newDate);
  };

  const handleTimeSlotClick = (timeSlot: TimeSlot) => {
    if (!timeSlot.isBooked) {
      setSelectedTimeSlot(timeSlot.time);
      setIsModalOpen(true);
    }
  };

  const handleBookingCreated = async (newBooking: Omit<Booking, 'id' | 'createdAt'>) => {
    try {
      const existingBookings = await firestoreService.bookings.getByClientAndTime(
        newBooking.clientId,
        newBooking.date,
        newBooking.time
      );

      if (existingBookings.length > 0) {
        alert('This client already has a booking at this time. Please choose a different time or client.');
        return;
      }

      if (newBooking.isRecurring && newBooking.recurringDay !== undefined) {
        const futureConflicts = await firestoreService.bookings.checkRecurringConflicts(
          newBooking.clientId,
          newBooking.recurringDay,
          newBooking.time,
          newBooking.date
        );

        if (futureConflicts.length > 0) {
          const conflictDates = futureConflicts.map(b => new Date(b.date).toLocaleDateString()).join(', ');
          alert(`Recurring booking conflicts detected on: ${conflictDates}. Please choose a different time.`);
          return;
        }
      }

      const bookingWithTimestamp = {
        ...newBooking,
        createdAt: new Date()
      };
      
      const bookingId = await firestoreService.bookings.add(bookingWithTimestamp);
      console.log('Booking created with ID:', bookingId);
      setIsModalOpen(false);
      setSelectedTimeSlot('');
    } catch (error) {
      console.error('Error creating booking:', error);
      alert('Failed to create booking. Please try again.');
    }
  };

  const handleDeleteBooking = async (bookingId: string) => {
    try {
      await firestoreService.bookings.delete(bookingId);
      console.log('Booking deleted successfully');
    } catch (error) {
      console.error('Error deleting booking:', error);
      alert('Failed to delete booking. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="max-w-5xl mx-auto p-4 sm:p-6">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-xl p-4 sm:p-6 lg:p-8 mb-6 sm:mb-8 border border-white/20">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6 space-y-4 lg:space-y-0">
            <div className="flex items-center space-x-3 sm:space-x-4">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg">
                <CalendarIcon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                  Coaching Calendar
                </h1>
                <p className="text-sm sm:text-base text-gray-600 mt-1">Manage your coaching appointments</p>
              </div>
            </div>
            
            <button
              onClick={() => setShowDataSafety(true)}
              className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all duration-200 shadow-lg"
            >
              <Shield className="w-4 h-4" />
              <span className="text-sm font-semibold">Data Safety</span>
            </button>
            
            <div className="flex items-center justify-center space-x-4 sm:space-x-6">
              <button
                onClick={() => handleDateChange('prev')}
                className="p-2 sm:p-3 rounded-xl hover:bg-gray-100 transition-all duration-200 group"
              >
                <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600 group-hover:text-gray-900" />
              </button>
              
              <div className="text-center">
                <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
                  {getDayName(selectedDate)}
                </div>
                <div className="text-sm sm:text-base lg:text-lg text-gray-600 font-medium">
                  {getFormattedDate(selectedDate)}
                </div>
              </div>
              
              <button
                onClick={() => handleDateChange('next')}
                className="p-2 sm:p-3 rounded-xl hover:bg-gray-100 transition-all duration-200 group"
              >
                <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600 group-hover:text-gray-900" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl sm:rounded-2xl p-3 sm:p-4 border border-green-200">
              <div className="text-xl sm:text-2xl font-bold text-green-700">
                {bookings.filter(b => b.callType === 'onboarding').length}
              </div>
              <div className="text-xs sm:text-sm text-green-600">Onboarding Calls</div>
            </div>
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl sm:rounded-2xl p-3 sm:p-4 border border-blue-200">
              <div className="text-xl sm:text-2xl font-bold text-blue-700">
                {bookings.filter(b => b.callType === 'follow-up').length}
              </div>
              <div className="text-xs sm:text-sm text-blue-600">Follow-up Calls</div>
            </div>
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl sm:rounded-2xl p-3 sm:p-4 border border-purple-200">
              <div className="text-xl sm:text-2xl font-bold text-purple-700">
                {bookings.filter(b => b.isRecurring).length}
              </div>
              <div className="text-xs sm:text-sm text-purple-600">Recurring Sessions</div>
            </div>
          </div>
        </div>

        {loading && (
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl sm:rounded-2xl p-4 sm:p-6 mb-6 sm:mb-8 text-white shadow-xl">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white/20 rounded-lg sm:rounded-xl flex items-center justify-center">
                <CalendarIcon className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
              </div>
              <div>
                <div className="text-base sm:text-lg font-bold">Loading...</div>
                <div className="text-xs sm:text-sm text-blue-100">
                  Connecting to database and loading your bookings
                </div>
              </div>
            </div>
          </div>
        )}

        {!loading && (
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl sm:rounded-2xl p-4 sm:p-6 mb-6 sm:mb-8 text-white shadow-xl">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white/20 rounded-lg sm:rounded-xl flex items-center justify-center">
                <CalendarIcon className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div>
                <div className="text-base sm:text-lg font-bold">Live Database</div>
                <div className="text-xs sm:text-sm text-green-100">
                  Your bookings are now saved to Firestore and will persist after refresh!
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="bg-white/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-xl overflow-hidden border border-white/20">
          <div className="grid grid-cols-1 gap-0">
            {schedule.timeSlots.map((timeSlot, index) => (
              <div
                key={index}
                className={`p-4 sm:p-6 border-b border-gray-100/50 hover:bg-gray-50/50 transition-all duration-200 cursor-pointer ${
                  timeSlot.isBooked ? 'bg-gradient-to-r from-blue-50/80 to-indigo-50/80' : ''
                } ${index === schedule.timeSlots.length - 1 ? 'border-b-0' : ''}`}
                onClick={() => handleTimeSlotClick(timeSlot)}
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
                  <div className="flex items-center space-x-3 sm:space-x-6">
                    <div className="w-16 sm:w-24 text-base sm:text-lg font-bold text-gray-700">
                      {formatTimeDisplay(timeSlot.time)}
                    </div>
                    
                    {timeSlot.isBooked && timeSlot.booking ? (
                      <div className="flex-1">
                        <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
                          <div className="flex-1">
                            <div className="text-lg sm:text-xl font-bold text-gray-900 mb-1">
                              {timeSlot.booking.clientName}
                            </div>
                            <div className="text-gray-600 mb-2 sm:mb-3 flex items-center space-x-2">
                              <span className="text-xs sm:text-sm">📞 {timeSlot.booking.clientPhone}</span>
                            </div>
                            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                              <span className={`px-2 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-semibold ${
                                timeSlot.booking.callType === 'onboarding'
                                  ? 'bg-green-100 text-green-800 border border-green-200'
                                  : 'bg-blue-100 text-blue-800 border border-blue-200'
                              }`}>
                                {timeSlot.booking.callType === 'onboarding' ? '🎯 Onboarding' : '🔄 Follow-up'}
                              </span>
                              {timeSlot.booking.isRecurring && (
                                <span className="px-2 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-semibold bg-purple-100 text-purple-800 border border-purple-200">
                                  ⏰ Recurring
                                </span>
                              )}
                            </div>
                          </div>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteBooking(timeSlot.booking!.id);
                            }}
                            className="p-2 sm:p-3 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg sm:rounded-xl transition-all duration-200 self-start sm:self-auto"
                          >
                            <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex-1 flex items-center">
                        <div className="flex items-center space-x-3 text-gray-500">
                          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-100 rounded-lg sm:rounded-xl flex items-center justify-center">
                            <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
                          </div>
                          <div>
                            <div className="text-base sm:text-lg font-semibold">Available</div>
                            <div className="text-xs sm:text-sm">Click to book appointment</div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {isModalOpen && (
          <BookingModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            selectedDate={selectedDate}
            selectedTime={selectedTimeSlot}
            onBookingCreated={handleBookingCreated}
          />
        )}

        {showDataSafety && (
          <DataSafetyFeatures onClose={() => setShowDataSafety(false)} />
        )}
      </div>
    </div>
  );
};

export default Calendar; 