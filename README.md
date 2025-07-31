# Coaching Calendar Platform

A modern, responsive coaching calendar application built with Next.js 15, TypeScript, Tailwind CSS, and Firebase Firestore.

## ✨ Features

- 📅 **Interactive Calendar**: Beautiful, responsive calendar interface
- 🔒 **Data Safety**: Advanced duplication prevention and conflict detection
- 📱 **Mobile Responsive**: Works perfectly on all devices
- 🔄 **Real-time Updates**: Live data synchronization with Firestore
- 🎯 **Booking Management**: Create, edit, and delete appointments
- 👥 **Client Management**: Manage client information and bookings
- ⏰ **Recurring Bookings**: Support for recurring appointment patterns
- 🛡️ **Data Integrity**: Comprehensive data validation and safety features

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Firebase project

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd project
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Firebase**
   - Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
   - Enable Firestore Database
   - Copy your Firebase config to `lib/firebase.ts`

4. **Create Firestore indexes** (required for complex queries)
   - Go to Firestore Database → Indexes
   - Create composite indexes for:
     - `bookings` collection: `clientId`, `date`, `time`
     - `bookings` collection: `clientId`, `isRecurring`, `recurringDay`, `time`, `date`
     - `bookings` collection: `date`, `status`, `time`

5. **Run the development server**
```bash
npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗️ Project Structure

```
project/
├── app/                    # Next.js 15 App Router
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── Calendar.tsx       # Main calendar interface
│   ├── BookingModal.tsx   # Booking creation modal
│   ├── DataSafetyFeatures.tsx # Data safety showcase
│   └── Icons.tsx          # SVG icons
├── lib/                   # Utility libraries
│   ├── firebase.ts        # Firebase configuration
│   └── firestore.ts       # Firestore service layer
├── types/                 # TypeScript type definitions
│   └── index.ts           # Core interfaces
├── data/                  # Static data
│   └── clients.ts         # Sample client data
├── utils/                 # Utility functions
│   └── calendar.ts        # Calendar helper functions
└── public/                # Static assets
```

## 🔧 Configuration

### Firebase Setup

1. **Create Firebase project**
2. **Enable Firestore Database**
3. **Set security rules**:
   ```javascript
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /{document=**} {
         allow read, write: if true; // For development
       }
     }
   }
   ```

### Environment Variables

Create a `.env.local` file:
```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

## 🛡️ Data Safety Features

### Duplication Prevention
- **Real-time duplicate detection**: Prevents multiple bookings for same client/time
- **Client-time validation**: Ensures no conflicts in booking slots
- **Recurring conflict checks**: Scans 12 weeks ahead for recurring booking conflicts

### Data Integrity
- **Input validation**: Comprehensive form validation
- **Business logic validation**: Prevents invalid booking patterns
- **Real-time integrity checks**: Continuous data validation

### Efficient Querying
- **Indexed queries**: Optimized database queries with composite indexes
- **Pagination support**: Handles large datasets efficiently
- **Real-time listeners**: Instant data synchronization

## 📱 Mobile Responsiveness

The application is fully responsive and optimized for:
- 📱 **Mobile phones** (320px+)
- 📱 **Tablets** (768px+)
- 💻 **Desktop** (1024px+)
- 🖥️ **Large screens** (1280px+)

## 🎨 UI/UX Features

- **Modern Design**: Clean, professional interface
- **Smooth Animations**: Subtle transitions and hover effects
- **Accessibility**: WCAG compliant design
- **Dark Mode Ready**: Prepared for future dark theme support
- **Loading States**: Clear feedback during operations

## 🔄 Real-time Features

- **Live Updates**: Changes appear instantly across all clients
- **Offline Support**: Graceful handling of network issues
- **Conflict Resolution**: Automatic conflict detection and resolution
- **Data Synchronization**: Seamless sync between devices

## 🚀 Deployment

### Vercel (Recommended)

1. **Push to GitHub**
2. **Connect to Vercel**
3. **Add environment variables**
4. **Deploy**

### Other Platforms

The app can be deployed to any platform that supports Next.js:
- Netlify
- AWS Amplify
- Google Cloud Run
- Docker containers

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Check the [Firebase Documentation](https://firebase.google.com/docs)
- Review [Next.js Documentation](https://nextjs.org/docs)
- Open an issue in the repository

---

**Built with ❤️ using Next.js 15, TypeScript, Tailwind CSS, and Firebase**
