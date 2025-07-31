# Vercel Deployment Guide

## Quick Deployment Steps

### 1. Prepare Your Repository
- Push your code to GitHub
- Ensure all files are committed

### 2. Connect to Vercel
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "New Project"
3. Import your GitHub repository
4. Select the repository

### 3. Configure Environment Variables
In Vercel project settings, add these environment variables:

```
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyCGSokKJZytcH08ohb_-GsSuAalIvsCY0k
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=project-eabdd.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=project-eabdd
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=project-eabdd.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=376905945987
NEXT_PUBLIC_FIREBASE_APP_ID=1:376905945987:web:9d0732a56a852a71829cb6
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-76WMENVQ70
```

### 4. Build Settings
- **Framework Preset**: Next.js
- **Build Command**: `npm run build`
- **Output Directory**: `.next`
- **Install Command**: `npm install`

### 5. Deploy
- Click "Deploy"
- Wait for build to complete
- Your app will be live at the provided URL

## Post-Deployment

### 1. Verify Firebase Configuration
- Check that your app connects to Firestore
- Test creating a booking
- Verify data persistence

### 2. Set Up Custom Domain (Optional)
- Go to Project Settings > Domains
- Add your custom domain
- Configure DNS settings

### 3. Monitor Performance
- Check Vercel Analytics
- Monitor Firebase usage
- Set up error tracking

## Troubleshooting

### Common Issues
1. **Build Failures**: Check environment variables
2. **Firebase Connection**: Verify API keys
3. **CORS Issues**: Check Firebase security rules

### Support
- Vercel Documentation: https://vercel.com/docs
- Firebase Documentation: https://firebase.google.com/docs 