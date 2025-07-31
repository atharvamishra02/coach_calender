'use client';

import React, { useState, useEffect } from 'react';
import { X, Search, Phone, Clock } from './Icons';
import { Client, Booking } from '../types';
import { dummyClients } from '../data/clients';
import { formatTimeDisplay } from '../utils/calendar';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedDate: string;
  selectedTime: string;
  onBookingCreated: (booking: Omit<Booking, 'id' | 'createdAt'>) => void;
}

const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  selectedDate,
  selectedTime,
  onBookingCreated
}) => {
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [callType, setCallType] = useState<'onboarding' | 'follow-up'>('onboarding');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredClients, setFilteredClients] = useState<Client[]>(dummyClients);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (searchTerm) {
      const filtered = dummyClients.filter(client =>
        client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.phone.includes(searchTerm)
      );
      setFilteredClients(filtered);
    } else {
      setFilteredClients(dummyClients);
    }
  }, [searchTerm]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedClient) {
      alert('Please select a client');
      return;
    }

    try {
      setIsSubmitting(true);
      
             const bookingData = {
         coachId: selectedClient.coachId,
         clientId: selectedClient.id,
         clientName: selectedClient.name,
         clientPhone: selectedClient.phone,
         date: selectedDate,
         time: selectedTime,
         callType,
         isRecurring: callType === 'follow-up',
         status: 'scheduled' as const,
         duration: 60,
         ...(callType === 'follow-up' && { recurringDay: new Date(selectedDate).getDay() })
       };

      await onBookingCreated(bookingData);
    } catch (error) {
      console.error('Error creating booking:', error);
      alert('Failed to create booking. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-2 sm:p-4">
      <div className="bg-white rounded-xl sm:rounded-2xl shadow-2xl max-w-md w-full max-h-[95vh] sm:max-h-[90vh] overflow-y-auto animate-in fade-in-0 zoom-in-95 duration-200">
       
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-100">
          <div className="flex items-center space-x-2 sm:space-x-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg sm:rounded-xl flex items-center justify-center">
              <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-gray-900">Book Appointment</h2>
              <p className="text-xs sm:text-sm text-gray-500">Schedule your coaching session</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg sm:rounded-xl transition-colors"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>

       
        <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4 sm:space-y-6">
          {/* Date and Time Display */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg sm:rounded-xl p-3 sm:p-4 border border-blue-100">
            <div className="text-xs sm:text-sm font-medium text-blue-700 mb-1">Selected Time</div>
            <div className="text-sm sm:text-lg font-bold text-gray-900">
              {new Date(selectedDate).toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </div>
            <div className="text-lg sm:text-2xl font-bold text-blue-600 flex items-center space-x-2">
              <Clock className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>{formatTimeDisplay(selectedTime)}</span>
            </div>
          </div>

       
          <div>
            <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2 sm:mb-3">
              Select Client
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none">
                <Search className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search by name or phone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-10 sm:pl-12 pr-4 py-2 sm:py-3 border border-gray-200 rounded-lg sm:rounded-xl leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm sm:text-base"
              />
            </div>
            
            <div className="mt-3 sm:mt-4 max-h-40 sm:max-h-48 overflow-y-auto border border-gray-200 rounded-lg sm:rounded-xl bg-gray-50">
              {filteredClients.map((client) => (
                <div
                  key={client.id}
                  onClick={() => setSelectedClient(client)}
                  className={`p-3 sm:p-4 cursor-pointer hover:bg-white transition-all duration-200 border-b border-gray-100 last:border-b-0 ${
                    selectedClient?.id === client.id 
                      ? 'bg-white border-l-4 border-l-blue-500 shadow-sm' 
                      : 'hover:shadow-sm'
                  }`}
                >
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <div className="flex-shrink-0">
                      <div className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full flex items-center justify-center ${
                        selectedClient?.id === client.id 
                          ? 'bg-white' 
                          : 'bg-gray-200'
                      }`}>
                        <div className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full ${
                          selectedClient?.id === client.id 
                            ? 'bg-blue-600' 
                            : 'bg-gray-600'
                        }`} />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs sm:text-sm font-semibold text-gray-900 truncate">
                        {client.name}
                      </div>
                      <div className="flex items-center text-xs sm:text-sm text-gray-500">
                        <Phone className="w-3 h-3 mr-1" />
                        {client.phone}
                      </div>
                    </div>
                    {selectedClient?.id === client.id && (
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          
          <div>
            <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2 sm:mb-3">
              Call Type
            </label>
            <div className="grid grid-cols-2 gap-2 sm:gap-3">
              <button
                type="button"
                onClick={() => setCallType('onboarding')}
                className={`p-3 sm:p-4 rounded-lg sm:rounded-xl border-2 transition-all duration-200 ${
                  callType === 'onboarding'
                    ? 'border-green-500 bg-green-50 text-green-700 shadow-sm'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                <div className="text-xs sm:text-sm font-semibold">Onboarding</div>
                <div className="text-xs text-gray-500 mt-1">One-time call</div>
              </button>
              <button
                type="button"
                onClick={() => setCallType('follow-up')}
                className={`p-3 sm:p-4 rounded-lg sm:rounded-xl border-2 transition-all duration-200 ${
                  callType === 'follow-up'
                    ? 'border-blue-500 bg-blue-50 text-blue-700 shadow-sm'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                <div className="text-xs sm:text-sm font-semibold">Follow-up</div>
                <div className="text-xs text-gray-500 mt-1">Weekly recurring</div>
              </button>
            </div>
          </div>

          <div className="flex space-x-2 sm:space-x-3 pt-3 sm:pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 sm:px-6 py-2 sm:py-3 border border-gray-300 rounded-lg sm:rounded-xl text-xs sm:text-sm font-semibold text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!selectedClient || isSubmitting}
              className="flex-1 px-4 sm:px-6 py-2 sm:py-3 border border-transparent rounded-lg sm:rounded-xl shadow-sm text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {isSubmitting ? 'Booking...' : 'Book Appointment'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookingModal; 