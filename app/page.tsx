'use client';

import Calendar from '../components/Calendar';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="px-4 py-3 sm:px-6 lg:px-8">
          <h1 className="text-lg sm:text-xl font-bold text-gray-900">
            Coaching Platform
          </h1>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex-1">
        <div className="px-4 py-4 sm:px-6 lg:px-8">
          <Calendar />
        </div>
      </div>
    </div>
  );
}
