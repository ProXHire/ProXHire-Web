import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-anon-key'

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
})

export const isSupabaseConfigured = (): boolean => {
  const url = import.meta.env.VITE_SUPABASE_URL
  const key = import.meta.env.VITE_SUPABASE_ANON_KEY
  return !(!url || url.includes('placeholder') || !key || key.includes('placeholder'))
}

/**
 * Submit contact inquiry to Supabase 'contact_messages' and 'candidates' tables
 */
export async function submitContactMessageToSupabase(message: {
  name: string
  email: string
  phone?: string
  role?: string
  subject?: string
  message: string
}): Promise<{ success: boolean; error?: string }> {
  if (!isSupabaseConfigured()) {
    return { success: true }
  }

  try {
    const cleanEmail = message.email.trim().toLowerCase()

    // 1. Insert into contact_messages
    await supabase.from('contact_messages').insert({
      name: message.name.trim(),
      email: cleanEmail,
      phone: message.phone || null,
      role: message.role || 'General Inquiry',
      subject: message.subject || null,
      message: message.message.trim(),
      status: 'new',
    })

    // 2. Also insert tagged row into candidates table for unified Admin viewing
    try {
      await supabase.from('candidates').insert({
        full_name: message.name.trim(),
        email: cleanEmail,
        mobile_number: message.phone || null,
        preferred_role: message.role || 'General Inquiry',
        profile_summary: message.message.trim(),
        is_contact_message: true,
        status: 'new',
      })
    } catch {
      // secondary candidates tag note
    }

    return { success: true }
  } catch (err: any) {
    console.warn('Supabase contact message submit note:', err.message)
    return { success: false, error: err.message }
  }
}
