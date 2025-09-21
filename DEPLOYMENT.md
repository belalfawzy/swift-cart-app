# Swift Cart - Vercel Deployment Guide

## 🚀 Quick Deploy to Vercel

### Prerequisites
- GitHub account
- Vercel account (free tier available)
- Node.js 18+ installed locally

### Step 1: Prepare Your Repository
1. Push your code to GitHub
2. Ensure all environment variables are documented in `.env.example`

### Step 2: Deploy to Vercel

#### Option A: Deploy via Vercel Dashboard
1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repository
4. Vercel will auto-detect Next.js framework
5. Configure environment variables (see below)
6. Click "Deploy"

#### Option B: Deploy via Vercel CLI
```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# For production deployment
vercel --prod
```

### Step 3: Environment Variables
Set these environment variables in your Vercel dashboard:

| Variable | Value | Description |
|----------|-------|-------------|
| `API` | `https://ecommerce.routemisr.com/api/v1` | Backend API URL |
| `NEXTAUTH_SECRET` | `your-secret-key-here` | Generate a random secret |
| `NEXTAUTH_URL` | `https://your-app.vercel.app` | Your Vercel app URL |
| `NEXT_URL` | `https://your-app.vercel.app` | Your Vercel app URL |

### Step 4: Generate NEXTAUTH_SECRET
```bash
# Generate a random secret
openssl rand -base64 32

# Or use Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

### Step 5: Domain Configuration
1. After deployment, Vercel provides a default domain
2. You can add a custom domain in the Vercel dashboard
3. Update `NEXTAUTH_URL` and `NEXT_URL` with your custom domain

## 🔧 Build Configuration

### Package.json Scripts
- `npm run build` - Production build
- `npm run start` - Start production server
- `npm run dev` - Development server

### Vercel Configuration
The project includes `vercel.json` with optimized settings:
- Build command: `npm run build`
- Output directory: `.next`
- Framework: Next.js
- Function timeout: 30 seconds

## 🐛 Troubleshooting

### Common Issues

1. **Build Fails**
   - Check TypeScript errors: `npm run build`
   - Ensure all dependencies are installed: `npm install`

2. **Environment Variables Not Working**
   - Verify variables are set in Vercel dashboard
   - Redeploy after adding new variables

3. **Images Not Loading**
   - Check `next.config.ts` remote patterns
   - Ensure image URLs are correct

4. **Authentication Issues**
   - Verify `NEXTAUTH_SECRET` is set
   - Check `NEXTAUTH_URL` matches your domain

### Build Optimization
- Static pages are pre-rendered for better performance
- Dynamic routes use server-side rendering
- Images are optimized automatically
- Bundle size is optimized with tree shaking

## 📊 Performance Features
- ✅ Static generation for product pages
- ✅ Image optimization
- ✅ Bundle optimization
- ✅ Edge functions for API routes
- ✅ Automatic HTTPS
- ✅ Global CDN

## 🔒 Security
- Environment variables are encrypted
- API keys are not exposed to client
- HTTPS enforced
- Secure headers configured

## 📱 Mobile Optimization
- Responsive design
- Touch-friendly interface
- Fast loading on mobile networks
- PWA-ready (can be extended)

## 🚀 Post-Deployment
1. Test all functionality
2. Check mobile responsiveness
3. Verify payment integration (if applicable)
4. Monitor performance in Vercel dashboard
5. Set up analytics (optional)

## 📞 Support
For deployment issues:
1. Check Vercel logs in dashboard
2. Review build output
3. Verify environment variables
4. Test locally with production build

---

**Ready to deploy!** 🎉
