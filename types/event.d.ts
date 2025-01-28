// types/event.d.ts
export interface Tickets {
    id: number
    name: string
    price: number
    quantity: number
  }
  
  export interface Vendor {
    id: number
    name: string
    bio: string
    image: string
    email: string
  }
  
  export interface KeynoteSpeaker {
    id: number
    name: string
    bio: string
    image: string
    email: string
  }
  
  export interface Host {
    name: string
    image: string
    role: string
  }
  
  export interface TimelineItem {
    time: string
    activity: string
  }
  
  export interface Event {
    id: number
    title: string
    startDate: string
    endDate: string
    time: string
    location: string
    type: string
    image: string
    description: string
    host: Host
    tickets: Tickets[]
    foodVendors?: Vendor[]
    keynoteSpeakers?: KeynoteSpeaker[]
    highlights?: string[]
    timeline?: TimelineItem[]
  }