import type { Event } from "@/types/event"

export const events: Event[] = [
  {
    id: 1,
    title: "Nairobi VC Dinner Night",
    startDate: "2025-01-27T20:07:00", // Future date
    endDate: "2025-01-28T04:21:00",
    time: "4:06 AM - 6:00 AM",
    location: "Nairobi, Kenya",
    type: "Business",
    image: "/images/logo.jpg",
    description:
      "An exclusive gathering of visionary key tech stakeholders, VCs, Investors, Funders, & and Ecosystem enablers.",
    host: {
      name: "Event Palour",
      image: "/images/logo.png",
      role: "Event Organizer",
    },
    tickets: [
      { id: 1, name: "Early Bird", price: 3000, quantity: 0 },
      { id: 2, name: "Gate", price: 3000, quantity: 0 },
      { id: 3, name: "Regular", price: 5000, quantity: 0 },
      { id: 4, name: "VIP", price: 10000, quantity: 0 },
    ],
    foodVendors: [
      {
        id: 1,
        name: "Gourmet Delights",
        bio: "Exquisite catering for corporate events",
        image: "https://i.pravatar.cc/150?img=4",
        email: "info@gourmetdelights.com",
      },
      {
        id: 2,
        name: "Sweet Sensations",
        bio: "Artisanal desserts and pastries",
        image: "https://i.pravatar.cc/150?img=5",
        email: "hello@sweetsensations.com",
      },
    ],
  },
  {
    id: 2,
    title: "Tech Startup Expo",
    startDate: "2023-01-27T10:00:00", // Past date
    endDate: "2023-01-28T22:00:00",
    time: "10:00 AM - 4:00 PM",
    location: "Online, Google Meet",
    type: "Tech",
    image: "/images/mpesa.png",
    description: "Showcase your innovative startup and connect with investors and industry leaders.",
    host: {
      name: "TechHub",
      image: "/images/logo.jpg",
      role: "Tech Incubator",
    },
    tickets: [
      { id: 1, name: "Attendee", price: 1000, quantity: 200 },
      { id: 2, name: "Exhibitor", price: 5000, quantity: 50 },
    ],
    keynoteSpeakers: [
      {
        id: 1,
        name: "Dr. Sarah Johnson",
        bio: "AI researcher and tech entrepreneur",
        image: "https://i.pravatar.cc/150?img=1",
        email: "sarah.johnson@techstartup.com",
      },
      {
        id: 2,
        name: "Michael Chang",
        bio: "Venture capitalist with focus on African startups",
        image: "https://i.pravatar.cc/150?img=2",
        email: "michael.chang@vcfirm.com",
      },
    ],
    highlights: [
      "Cutting-edge startup demos",
      "Networking opportunities with industry leaders",
      "Expert panel discussions on emerging technologies",
      "Pitch competition for early-stage startups",
      "One-on-one mentoring sessions with successful entrepreneurs",
      "Workshops on fundraising and scaling strategies",
      "Showcase of the latest tech innovations in Africa",
    ],
    timeline: [
      { time: "10:00 AM", activity: "Opening Ceremony and Welcome Address" },
      { time: "10:30 AM", activity: "Keynote Speech: The Future of Tech in Africa" },
      { time: "11:30 AM", activity: "Startup Showcase Session 1" },
      { time: "1:00 PM", activity: "Lunch Break and Networking" },
      { time: "2:00 PM", activity: "Panel Discussion: Navigating the Startup Ecosystem" },
      { time: "3:00 PM", activity: "Startup Showcase Session 2" },
      { time: "4:00 PM", activity: "Closing Remarks and Awards Ceremony" },
    ],
  },
  {
    id: 3,
    title: "African Fintech Summit",
    startDate: "2025-03-15T09:00:00",
    endDate: "2025-03-16T18:00:00",
    time: "9:00 AM - 6:00 PM",
    location: "Kigali Convention Center, Rwanda",
    type: "Finance",
    image: "/dummy/two.jpeg",
    description:
      "Explore the latest trends and innovations in African fintech, connecting industry leaders, startups, and investors.",
    host: {
      name: "African Fintech Association",
      image: "/dummy/two.jpeg",
      role: "Industry Association",
    },
    tickets: [
      { id: 1, name: "Early Bird", price: 2500, quantity: 0 },
      { id: 2, name: "Regular", price: 3500, quantity: 0 },
      { id: 3, name: "VIP", price: 5000, quantity: 0 },
    ],
    keynoteSpeakers: [
      {
        id: 1,
        name: "Olugbenga Agboola",
        bio: "Co-founder and CEO of Flutterwave",
        image: "https://i.pravatar.cc/150?img=10",
        email: "gb@flutterwave.com",
      },
      {
        id: 2,
        name: "Ngozi Dozie",
        bio: "Co-founder of Carbon",
        image: "https://i.pravatar.cc/150?img=11",
        email: "ngozi@carbon.com",
      },
    ],
    highlights: [
      "Keynote speeches from fintech leaders",
      "Panel discussions on regulatory challenges and opportunities",
      "Startup pitch competition with cash prizes",
      "Workshops on blockchain in finance",
      "Networking sessions with investors and industry experts",
      "Exhibition area showcasing latest fintech solutions",
    ],
  },
  {
    id: 4,
    title: "East African Art Festival",
    startDate: "2025-07-01T10:00:00",
    endDate: "2025-07-05T22:00:00",
    time: "10:00 AM - 10:00 PM",
    location: "Uhuru Gardens, Nairobi, Kenya",
    type: "Arts & Culture",
    image: "/dummy/one.jpg",
    description:
      "Celebrate the rich cultural heritage and contemporary art scene of East Africa in this 5-day festival.",
    host: {
      name: "East African Cultural Council",
      image: "/images/logo.jpg",
      role: "Cultural Organization",
    },
    tickets: [
      { id: 1, name: "Day Pass", price: 500, quantity: 0 },
      { id: 2, name: "Full Festival Pass", price: 2000, quantity: 0 },
      { id: 3, name: "VIP Experience", price: 5000, quantity: 0 },
    ],
    foodVendors: [
      {
        id: 1,
        name: "Taste of East Africa",
        bio: "Traditional dishes from Kenya, Uganda, Tanzania, and Rwanda",
        image: "https://i.pravatar.cc/150?img=20",
        email: "info@tasteofeastafrica.com",
      },
      {
        id: 2,
        name: "Fusion Flavors",
        bio: "Modern takes on classic East African cuisine",
        image: "https://i.pravatar.cc/150?img=21",
        email: "hello@fusionflavors.com",
      },
    ],
    highlights: [
      "Art exhibitions featuring local and international artists",
      "Live music performances from East African musicians",
      "Traditional dance showcases",
      "Interactive art workshops",
      "Film screenings of East African cinema",
      "Cultural fashion show",
      "Local artisan market",
    ],
  },
  {
    id: 5,
    title: "Pan-African Climate Action Summit",
    startDate: "2025-09-22T08:00:00",
    endDate: "2025-09-24T18:00:00",
    time: "8:00 AM - 6:00 PM",
    location: "Kenyatta International Convention Centre, Nairobi, Kenya",
    type: "Environment",
    image: "/dummy/three.jpeg",
    description:
      "Join leaders, activists, and scientists from across Africa to address climate change and develop sustainable solutions.",
    host: {
      name: "African Union Climate Commission",
      image: "/images/one.jpg",
      role: "Intergovernmental Organization",
    },
    tickets: [
      { id: 1, name: "General Admission", price: 1000, quantity: 0 },
      { id: 2, name: "NGO Representative", price: 500, quantity: 0 },
      { id: 3, name: "Corporate Delegate", price: 2000, quantity: 0 },
    ],
    keynoteSpeakers: [
      {
        id: 1,
        name: "Dr. Wangari Maathai",
        bio: "Nobel Peace Prize Laureate and environmental activist",
        image: "https://i.pravatar.cc/150?img=30",
        email: "contact@greenbeltmovement.org",
      },
      {
        id: 2,
        name: "Vanessa Nakate",
        bio: "Ugandan climate justice activist",
        image: "https://i.pravatar.cc/150?img=31",
        email: "vanessa@riseupmovement.org",
      },
    ],
    highlights: [
      "High-level policy discussions on climate action",
      "Presentations on innovative climate solutions",
      "Youth climate activist forum",
      "Green technology expo",
      "Workshops on sustainable agriculture and forestry",
      "Networking sessions for climate-focused organizations",
      "Launch of pan-African climate initiatives",
    ],
  },
  {
    id: 6,
    title: "African Gaming Expo",
    startDate: "2025-11-14T10:00:00",
    endDate: "2025-11-16T20:00:00",
    time: "10:00 AM - 8:00 PM",
    location: "Eko Convention Center, Lagos, Nigeria",
    type: "Technology",
    image: "/dummy/four.jpeg",
    description:
      "Experience the future of gaming in Africa, featuring game developers, esports tournaments, and the latest in gaming technology.",
    host: {
      name: "African Gaming Federation",
      image: "/images/one.jpg",
      role: "Industry Association",
    },
    tickets: [
      { id: 1, name: "Day Pass", price: 1500, quantity: 0 },
      { id: 2, name: "Weekend Pass", price: 3500, quantity: 0 },
      { id: 3, name: "VIP Gamer Pass", price: 7000, quantity: 0 },
    ],
    foodVendors: [
      {
        id: 1,
        name: "Gamer's Fuel",
        bio: "Energy-packed snacks and drinks for gamers",
        image: "https://i.pravatar.cc/150?img=40",
        email: "fuel@gamersfuel.com",
      },
      {
        id: 2,
        name: "Pixel Bites",
        bio: "Video game-themed food and beverages",
        image: "https://i.pravatar.cc/150?img=41",
        email: "info@pixelbites.com",
      },
    ],
    highlights: [
      "Showcase of African-developed games",
      "Esports tournaments with cash prizes",
      "Virtual reality and augmented reality experiences",
      "Game development workshops and panels",
      "Cosplay competition",
      "Retro gaming arcade",
      "Networking events for game developers and investors",
    ],
  },
]

export function getEventById(id: number): Event | undefined {
  return events.find((event) => event.id === id)
}

