export type UserRole = 'organizer' | 'attendee' | 'vendor'
export type VendorType = 'food' | 'venue' | 'equipment'

export interface User {
  id: string
  email: string
  role?: UserRole
  vendorType?: VendorType
  onboardingComplete: boolean
}

export interface AuthState {
  user: User | null
  isAuthenticated: boolean
  role: UserRole | null
  vendorType: VendorType | null
  // Actions
  setUser: (user: User | null) => void
  setRole: (role: UserRole) => void
  setVendorType: (type: VendorType) => void
  logout: () => void
}
