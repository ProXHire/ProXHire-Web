import { useState, useEffect } from 'react'
import { db } from '../firebase'
import { doc, onSnapshot } from 'firebase/firestore'
import { DEFAULT_FORM_OPTIONS, type FormOptions } from '../types/formOptions'

const LOCAL_STORAGE_KEY = 'proxy_form_options'

function getInitialOptions(): FormOptions {
  try {
    const cached = localStorage.getItem(LOCAL_STORAGE_KEY)
    if (cached) {
      const parsed = JSON.parse(cached)
      return {
        highestEducation: Array.isArray(parsed.highestEducation) && parsed.highestEducation.length ? parsed.highestEducation : DEFAULT_FORM_OPTIONS.highestEducation,
        preferredRole: Array.isArray(parsed.preferredRole) && parsed.preferredRole.length ? parsed.preferredRole : DEFAULT_FORM_OPTIONS.preferredRole,
        workExperience: Array.isArray(parsed.workExperience) && parsed.workExperience.length ? parsed.workExperience : DEFAULT_FORM_OPTIONS.workExperience,
        currentLocation: Array.isArray(parsed.currentLocation) && parsed.currentLocation.length ? parsed.currentLocation : DEFAULT_FORM_OPTIONS.currentLocation,
        industry: Array.isArray(parsed.industry) && parsed.industry.length ? parsed.industry : DEFAULT_FORM_OPTIONS.industry,
        companySize: Array.isArray(parsed.companySize) && parsed.companySize.length ? parsed.companySize : DEFAULT_FORM_OPTIONS.companySize,
        popularSkills: Array.isArray(parsed.popularSkills) && parsed.popularSkills.length ? parsed.popularSkills : DEFAULT_FORM_OPTIONS.popularSkills,
      }
    }
  } catch {
    // Ignore JSON error
  }
  return DEFAULT_FORM_OPTIONS
}

export function useFormOptions() {
  const [options, setOptions] = useState<FormOptions>(getInitialOptions)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    try {
      const settingsRef = doc(db, 'settings', 'formOptions')
      const unsub = onSnapshot(
        settingsRef,
        (snap) => {
          if (snap.exists()) {
            const data = snap.data()
            const merged: FormOptions = {
              highestEducation: Array.isArray(data.highestEducation) && data.highestEducation.length ? data.highestEducation : DEFAULT_FORM_OPTIONS.highestEducation,
              preferredRole: Array.isArray(data.preferredRole) && data.preferredRole.length ? data.preferredRole : DEFAULT_FORM_OPTIONS.preferredRole,
              workExperience: Array.isArray(data.workExperience) && data.workExperience.length ? data.workExperience : DEFAULT_FORM_OPTIONS.workExperience,
              currentLocation: Array.isArray(data.currentLocation) && data.currentLocation.length ? data.currentLocation : DEFAULT_FORM_OPTIONS.currentLocation,
              industry: Array.isArray(data.industry) && data.industry.length ? data.industry : DEFAULT_FORM_OPTIONS.industry,
              companySize: Array.isArray(data.companySize) && data.companySize.length ? data.companySize : DEFAULT_FORM_OPTIONS.companySize,
              popularSkills: Array.isArray(data.popularSkills) && data.popularSkills.length ? data.popularSkills : DEFAULT_FORM_OPTIONS.popularSkills,
            }
            setOptions(merged)
            try {
              localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(merged))
            } catch {
              // Ignore localStorage write error
            }
          }
          setLoading(false)
        },
        (error) => {
          console.warn('Could not subscribe to formOptions Firestore doc (using defaults):', error)
          setLoading(false)
        }
      )
      return () => unsub()
    } catch (err) {
      console.warn('Error setting up formOptions listener:', err)
      setLoading(false)
    }
  }, [])

  return { options, loading }
}
