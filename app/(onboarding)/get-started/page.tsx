'use client'
import { useRouter } from 'next/navigation'
import { ArrowRight, Calendar, Users } from 'lucide-react'
import { motion } from 'framer-motion'
import type { Variants } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { useAuthStore } from '@/store/auth'
import type { UserRole } from '@/types/auth'
import { MarketplaceIcon } from '@/components/icons/Marketplace'

// Define motion variants
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2
    }
  }
}

const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 100
    }
  }
}

// RoleCard component
interface RoleCardProps {
  title: string
  description: string
  icon: React.ReactNode
  onClick: () => void
  buttonText: string
}

function RoleCard({ title, description, icon, onClick, buttonText }: RoleCardProps) {
  return (
    <motion.div 
      className="border rounded-lg p-6 transition-all duration-300 hover:shadow-lg flex flex-col items-center text-center group"
      variants={itemVariants}
    >
      {icon}
      <h2 className="text-2xl font-semibold mb-4">{title}</h2>
      <p className="mb-6 flex-grow">{description}</p>
      <Button 
        onClick={onClick}
        className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300"
      >
        {buttonText}
        <ArrowRight className="ml-2 w-4 h-4" />
      </Button>
    </motion.div>
  )
}

// Main component
export default function GetStartedPage() {
  const router = useRouter()
  const { setRole, setUser } = useAuthStore()

  const handleRoleSelection = (selectedRole: UserRole) => {
    // Set the role in the store
    setRole(selectedRole)
    
    // Update user with selected role
    setUser({
      id: 'temp-id', // replace this with actual user ID
      email: '', //  replace this with actual user email
      role: selectedRole,
      onboardingComplete: false
    })

    // Handle navigation based on role
    if (selectedRole === 'vendor') {
      // Redirect to vendor platform
      window.location.href = 'https://vendor-epalour.vercel.app/get-started'
    } else {
      // Handle internal navigation
      const route = selectedRole === 'organizer' 
        ? '/onboarding/organizer'
        : '/dashboard/attendee'
      router.push(route)
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-white text-black">
      <main className="flex-grow container mx-auto px-4 py-12">
        <motion.h1 
          className="text-4xl md:text-5xl font-bold text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Let&apos;s get you Started 
        </motion.h1>
        
        <motion.p 
          className="text-xl text-center mb-12 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
       Select your role to unlock a world of exciting events, business opportunities, and marketplace experiences
        </motion.p>
        
        <motion.div 
          className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <RoleCard 
            title="Event Organizer" 
            description="Create and manage your own events. Reach a wider audience and make your events a success."
            icon={<Calendar className="w-12 h-12 mb-4" />}
            onClick={() => handleRoleSelection('organizer')}
            buttonText="Start as Organizer"
          />
          
          <RoleCard 
            title="Vendor" 
            description="Join our event vendor network to start offering your services for exciting events and create unforgettable experiences."
            icon={<MarketplaceIcon className="w-12 h-12 mb-4" />}
            onClick={() => handleRoleSelection('vendor')}
            buttonText="Join as Vendor"
          />
          
          <RoleCard 
            title="Event Attendee" 
            description="Discover exciting events, savor delicious food, and create lasting memories with like-minded people."
            icon={<Users className="w-12 h-12 mb-4" />}
            onClick={() => handleRoleSelection('attendee')}
            buttonText="Start Attending"
          />
        </motion.div>
      </main>
    </div>
  )
}