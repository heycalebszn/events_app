import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { AuthState, User, UserRole, VendorType } from '@/types/auth'

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      role: null,
      vendorType: null,

      setUser: (user: User | null) => set({ 
        user, 
        isAuthenticated: !!user 
      }),
      
      setRole: (role: UserRole) => set({ role }),
      
      setVendorType: (vendorType: VendorType) => set({ vendorType }),
      
      logout: () => set({ 
        user: null, 
        isAuthenticated: false,
        role: null,
        vendorType: null
      }),
    }),
    {
      name: 'auth-storage',
    }
  )
)