'use client';

import React, { useState, useEffect } from 'react';
import { Calendar as CalendarIcon, Shield, Database, AlertTriangle, CheckCircle } from './Icons';
import { firestoreService } from '../lib/firestore';
import { Booking } from '../types';

interface DataSafetyFeaturesProps {
  onClose: () => void;
}

const DataSafetyFeatures: React.FC<DataSafetyFeaturesProps> = ({ onClose }) => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [allBookings, bookingStats] = await Promise.all([
          firestoreService.bookings.getAll(),
          firestoreService.bookings.getStats()
        ]);
        setBookings(allBookings);
        setStats(bookingStats);
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const checkDuplicates = () => {
    const duplicates = bookings.filter((booking, index) => {
      return bookings.findIndex(b => 
        b.clientId === booking.clientId && 
        b.date === booking.date && 
        b.time === booking.time
      ) !== index;
    });

    return duplicates;
  };

  const duplicates = checkDuplicates();

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
      
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-blue-600 rounded-xl flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Data Safety & Integrity</h2>
              <p className="text-sm text-gray-500">Advanced features for data protection</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={onClose}
              className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl transition-colors"
            >
              <span className="text-sm font-medium">Back</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
            >
              <CalendarIcon className="w-5 h-5" />
            </button>
          </div>
        </div>

        
        <div className="p-6 space-y-6">
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          ) : (
            <>
             
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 border border-green-200">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <h3 className="font-semibold text-green-800">Data Integrity</h3>
                  </div>
                  <p className="text-sm text-green-700 mt-1">
                    {duplicates.length === 0 ? 'No duplicates detected' : `${duplicates.length} potential duplicates found`}
                  </p>
                </div>

                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-200">
                  <div className="flex items-center space-x-2">
                    <Database className="w-5 h-5 text-blue-600" />
                    <h3 className="font-semibold text-blue-800">Total Bookings</h3>
                  </div>
                  <p className="text-2xl font-bold text-blue-700">{stats?.total || 0}</p>
                </div>

                <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-200">
                  <div className="flex items-center space-x-2">
                    <AlertTriangle className="w-5 h-5 text-purple-600" />
                    <h3 className="font-semibold text-purple-800">Recurring Calls</h3>
                  </div>
                  <p className="text-2xl font-bold text-purple-700">
                    {bookings.filter(b => b.isRecurring).length}
                  </p>
                </div>
              </div>

            
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Data Safety Features</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 
                  <div className="bg-white border border-gray-200 rounded-xl p-4">
                    <div className="flex items-center space-x-2 mb-3">
                      <Shield className="w-5 h-5 text-green-600" />
                      <h4 className="font-semibold text-gray-900">Duplication Prevention</h4>
                    </div>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Real-time duplicate detection</li>
                      <li>• Client-time slot validation</li>
                      <li>• Recurring booking conflict checks</li>
                      <li>• 12-week future conflict scanning</li>
                    </ul>
                  </div>

          
                  <div className="bg-white border border-gray-200 rounded-xl p-4">
                    <div className="flex items-center space-x-2 mb-3">
                      <Database className="w-5 h-5 text-blue-600" />
                      <h4 className="font-semibold text-gray-900">Efficient Querying</h4>
                    </div>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Indexed date-based queries</li>
                      <li>• Pagination for large datasets</li>
                      <li>• Real-time listeners</li>
                      <li>• Optimized filtering</li>
                    </ul>
                  </div>
                </div>

              
                {duplicates.length > 0 && (
                  <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                    <div className="flex items-center space-x-2 mb-3">
                      <AlertTriangle className="w-5 h-5 text-red-600" />
                      <h4 className="font-semibold text-red-800">Duplicate Detection Results</h4>
                    </div>
                    <div className="space-y-2">
                      {duplicates.map((booking, index) => (
                        <div key={index} className="text-sm text-red-700 bg-red-100 rounded-lg p-2">
                          <strong>{booking.clientName}</strong> - {booking.date} at {booking.time}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

            
                <div className="bg-gray-50 rounded-xl p-4">
                  <h4 className="font-semibold text-gray-900 mb-3">Query Performance</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="font-medium">Date Range Queries:</span>
                      <span className="text-green-600 ml-2">Optimized</span>
                    </div>
                    <div>
                      <span className="font-medium">Client Lookups:</span>
                      <span className="text-green-600 ml-2">Indexed</span>
                    </div>
                    <div>
                      <span className="font-medium">Real-time Updates:</span>
                      <span className="text-green-600 ml-2">Active</span>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default DataSafetyFeatures; 