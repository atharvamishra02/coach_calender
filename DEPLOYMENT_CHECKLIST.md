# Vercel Deployment Checklist

## ✅ Pre-Deployment Checklist

### Code Quality
- [x] All comments removed from production code
- [x] Environment variables configured
- [x] No hardcoded Firebase credentials
- [x] TypeScript errors resolved
- [x] Build passes locally (`npm run build`)

### Firebase Setup
- [x] Firestore Database enabled
- [x] Security rules configured
- [x] Composite indexes created
- [x] Project ID: `project-eabdd`

### Environment Variables
- [x] `NEXT_PUBLIC_FIREBASE_API_KEY`
- [x] `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
- [x] `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
- [x] `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
- [x] `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
- [x] `NEXT_PUBLIC_FIREBASE_APP_ID`
- [x] `NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID`

## 🚀 Deployment Steps

### 1. GitHub Repository
- [ ] Push all changes to GitHub
- [ ] Ensure `.env.local` is in `.gitignore`
- [ ] Verify `env.example` contains correct values

### 2. Vercel Setup
- [ ] Connect GitHub repository to Vercel
- [ ] Add environment variables in Vercel dashboard
- [ ] Set build command: `npm run build`
- [ ] Set output directory: `.next`

### 3. Post-Deployment
- [ ] Test booking creation
- [ ] Verify data persistence
- [ ] Check mobile responsiveness
- [ ] Test data safety features

## 🔧 Environment Variables for Vercel

Add these in Vercel project settings:

```
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyCGSokKJZytcH08ohb_-GsSuAalIvsCY0k
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=project-eabdd.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=project-eabdd
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=project-eabdd.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=376905945987
NEXT_PUBLIC_FIREBASE_APP_ID=1:376905945987:web:9d0732a56a852a71829cb6
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-76WMENVQ70
```

## 📱 Features to Test After Deployment

- [ ] Calendar navigation
- [ ] Booking creation
- [ ] Booking deletion
- [ ] Data persistence on refresh
- [ ] Duplicate prevention
- [ ] Recurring booking conflicts
- [ ] Data safety modal
- [ ] Mobile responsiveness
- [ ] Real-time updates

## 🐛 Troubleshooting

### Build Failures
- Check environment variables
- Verify TypeScript compilation
- Check for missing dependencies

### Firebase Connection Issues
- Verify API keys
- Check Firestore security rules
- Ensure indexes are built

### Performance Issues
- Monitor Vercel Analytics
- Check Firebase usage
- Optimize bundle size if needed 