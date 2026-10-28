import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

// ---------------------------------------------------------------------------
// Firebase credentials for the Main Site (candidates + recruiters write here)
// Values are read from .env. Safe fallback values prevent blank screen crash if unconfigured.
// ---------------------------------------------------------------------------
const firebaseConfig = {
  apiKey:            import.meta.env.VITE_FIREBASE_API_KEY || 'demo-api-key',
  authDomain:        import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'demo-project.firebaseapp.com',
  projectId:         import.meta.env.VITE_FIREBASE_PROJECT_ID || 'demo-project',
  storageBucket:     import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || 'demo-project.firebasestorage.app',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '1234567890',
  appId:             import.meta.env.VITE_FIREBASE_APP_ID || '1:1234567890:web:abcdef',
}

import { getApps, getApp } from 'firebase/app'

const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig)
export const db = getFirestore(app)
export const auth = getAuth(app)

export const isFirebaseConfigured = Boolean(
  import.meta.env.VITE_FIREBASE_API_KEY &&
  !import.meta.env.VITE_FIREBASE_API_KEY.includes('demo') &&
  !import.meta.env.VITE_FIREBASE_API_KEY.includes('your_')
)
