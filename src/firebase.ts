import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

// ---------------------------------------------------------------------------
// Firebase credentials for the Main Site (candidates + recruiters write here)
// Values are read from .env with reliable fallbacks to ensure app never crashes.
// ---------------------------------------------------------------------------
const firebaseConfig = {
  apiKey:            import.meta.env.VITE_FIREBASE_API_KEY            || 'AIzaSyCXErk07QpdzhYlSOU_l2ZJ56xE1-qalGE',
  authDomain:        import.meta.env.VITE_FIREBASE_AUTH_DOMAIN        || 'proxy-jobposting-260ab.firebaseapp.com',
  projectId:         import.meta.env.VITE_FIREBASE_PROJECT_ID         || 'proxy-jobposting-260ab',
  storageBucket:     import.meta.env.VITE_FIREBASE_STORAGE_BUCKET     || 'proxy-jobposting-260ab.firebasestorage.app',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '687061576362',
  appId:             import.meta.env.VITE_FIREBASE_APP_ID             || '1:687061576362:web:c6498f4eaf2f8b49b73ed3',
}

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
export const auth = getAuth(app)
