# Patil & Sons Real Estate

A professional real estate website for Patil and Sons featuring NA plots and agricultural lands in the Nashik region.

## Deployment Instructions

### Backend Deployment
1. Deploy the backend to a hosting service like Render or Railway
2. Make note of your backend URL (e.g., https://api.yoursite.com)

### Frontend Deployment (Netlify)
1. Fork/Clone this repository
2. Connect your GitHub repository to Netlify
3. Configure the following build settings in Netlify:
   - Build command: `npm run build`
   - Publish directory: `dist/public`
4. Add the following environment variable in Netlify:
   - Key: `VITE_API_URL`
   - Value: Your backend URL (e.g., https://api.yoursite.com)

### Local Development
1. Clone the repository
2. Copy `.env.example` to `.env`
3. Update the environment variables in `.env`
4. Install dependencies: `npm install`
5. Start the development server: `npm run dev`

## Features
- Property listings showcase
- Direct WhatsApp integration
- Document verification services
- Legal assistance
- Regional expertise for Nashik, Ozar, and Dindori markets
