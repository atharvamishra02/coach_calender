# Coaching Calendar App

Hi! I'm excited to share my full-stack project - a coaching calendar application I built with Next.js, TypeScript, and Firebase. This project represents my journey into modern web development and real-time data management.

## About This Project

- **Schedule and track appointments** with their clients
- **Handle recurring sessions** like weekly check-ins
- **Prevent booking conflicts** and duplicates
- **Access their schedule from anywhere** (mobile-friendly)

## Getting Started

### What You'll Need
- **Node.js** (I used version 18)
- **npm** package manager
- **Firebase account** (free tier is perfect for learning)

### Setup Steps

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/coach_calender.git
   cd coach_calender
   ```

2. **Install the dependencies:**
   ```bash
   npm install
   ```

3. **Set up Firebase** (this was tricky for me at first):
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Create a new project (I named mine "project")
   - Enable Firestore Database (this is where your data lives)
   - Get your config from Project Settings → General → Your apps
   - Copy all the config values

4. **Create your environment file:**
   ```bash
   cp env.example .env.local
   ```
   Then open `.env.local` and paste your Firebase config values.

5. **Start the development server:**
   ```bash
   npm run dev
   ```

6. **Open in your browser:**
   Go to `http://localhost:3000` and you should see the calendar!

## How to Use the App

### Basic Features
- **Navigate dates:** Use the arrow buttons to move between days
- **View time slots:** The calendar shows 10:30 AM to 7:30 PM with 20-minute slots
- **Create bookings:** Click any empty slot to add an appointment
- **Delete bookings:** Click the trash icon to remove appointments

### Creating a Booking
1. Click on an empty time slot
2. Fill in the form:
   - **Client name** and phone number
   - **Call type** (onboarding for new clients, follow-up for existing)
   - **Duration** (20 minutes)
   - **Recurring** (check this for weekly sessions)
3. Click "Create Booking"

### Data Safety Features I Implemented
I wanted to make sure the app was reliable, so I added:
- **Duplicate prevention:** Can't book the same client twice at the same time
- **Conflict checking:** For recurring sessions, it looks ahead 12 weeks for conflicts
- **Real-time updates:** Changes show up instantly

## Firebase Database Schema

This application uses **Firebase Firestore** as the NoSQL database. Here's the complete schema structure:

### Collections

#### 1. `clients` Collection
Stores all client information for the coaching business.

**Document Structure:**
```typescript
{
  id: string;                    // Auto-generated document ID
  name: string;                  // Client's full name
  phone: string;                 // Phone number (format: +1-555-0101)
  email?: string;                // Optional email address
  coachId: string;               // Reference to assigned coach
  status: 'active' | 'inactive' | 'prospect';  // Client status
  notes?: string;                // Optional coaching notes
  createdAt: Timestamp;          // When client was added
}
```

**Indexes:**
- `coachId` (for filtering clients by coach)
- `status` (for filtering by client status)
- `createdAt` (for sorting and date-based queries)

#### 2. `bookings` Collection
Stores all appointment bookings and scheduling information.

**Document Structure:**
```typescript
{
  id: string;                    // Auto-generated document ID
  coachId: string;               // Reference to assigned coach
  clientId: string;              // Reference to client
  clientName: string;            // Client name (denormalized for performance)
  clientPhone: string;           // Client phone (denormalized for performance)
  date: string;                  // Date in YYYY-MM-DD format
  time: string;                  // Time in HH:MM format (24-hour)
  callType: 'onboarding' | 'follow-up' | 'consultation' | 'assessment';
  isRecurring: boolean;          // Whether this is a recurring session
  recurringDay?: number;         // Day of week (0-6, Sunday = 0) for recurring
  status: 'scheduled' | 'completed' | 'cancelled' | 'no-show';
  duration: number;              // Session duration in minutes
  notes?: string;                // Optional booking notes
  createdAt: Timestamp;          // When booking was created
}
```

**Indexes:**
- `coachId` + `date` (for coach's daily schedule)
- `clientId` + `date` (for client's booking history)
- `date` + `time` (for conflict detection)
- `status` (for filtering by booking status)
- `isRecurring` (for recurring session management)

### Data Relationships

```
Coach (coachId)
├── Clients (coachId → clients collection)
│   ├── Active Clients (status: 'active')
│   ├── Inactive Clients (status: 'inactive')
│   └── Prospects (status: 'prospect')
└── Bookings (coachId → bookings collection)
    ├── Scheduled Sessions (status: 'scheduled')
    ├── Completed Sessions (status: 'completed')
    ├── Cancelled Sessions (status: 'cancelled')
    └── No-Show Sessions (status: 'no-show')
```

### Key Features of the Schema

#### 1. **Denormalization Strategy**
- Client name and phone are stored in bookings for faster queries
- Reduces the need for joins when displaying calendar data

#### 2. **Conflict Prevention**
- Unique constraints on `clientId` + `date` + `time` combinations
- Recurring session conflict detection across 12-week periods

#### 3. **Real-time Updates**
- Uses Firestore's `onSnapshot` listeners for live data synchronization
- Changes appear instantly across all connected clients

#### 4. **Batch Operations**
- Supports bulk client operations for data migration
- Efficient batch updates and deletions

### Security Rules (Recommended)

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Clients collection
    match /clients/{clientId} {
      allow read, write: if request.auth != null;
    }
    
    // Bookings collection
    match /bookings/{bookingId} {
      allow read, write: if request.auth != null;
    }
  }
}
```

### Environment Variables Required

```bash
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

## Project Structure

Here's how I organized the code:

```
project/
├── app/                 # Next.js pages (new App Router)
├── components/          # React components I built
│   ├── Calendar.tsx     # Main calendar (this was the hardest part!)
│   ├── BookingModal.tsx # Booking form
│   └── DataSafetyFeatures.tsx # Shows the safety features
├── lib/                 # Firebase setup and database functions
│   ├── firebase.ts      # Firebase configuration
│   └── firestore.ts     # All the database operations
├── types/               # TypeScript definitions
├── data/                # Sample client data
└── utils/               # Helper functions
```

## Key Features I Built

### Calendar Interface
- **Daily view** with time slots from 9 AM to 6 PM
- **Visual indicators** for different call types (onboarding vs follow-up)
- **Quick delete** buttons for each booking
- **Responsive design** that works on phones and tablets

### Booking Management
- **Client selection** from a database of sample clients
- **Call type categorization** to track different types of sessions
- **Recurring session support** with smart conflict detection
- **Duration options** (30 or 60 minutes)

### Data Persistence
- **Firebase Firestore** for storing all the data
- **Real-time syncing** so changes appear instantly
- **Offline support** - data stays even if you refresh the page

## Deployment

I deployed this on Vercel, which was surprisingly easy:

### Vercel Deployment
1. **Push to GitHub:**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Connect to Vercel:**
   - Go to [Vercel](https://vercel.com)
   - Import your GitHub repository
   - Add your Firebase environment variables
   - Deploy!

3. **Environment Variables:**
   In your Vercel project settings, add these (use your own Firebase values):
   ```
   NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.firebasestorage.app
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
   NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id
   ```

## Development Commands

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Check for code issues
```





---
