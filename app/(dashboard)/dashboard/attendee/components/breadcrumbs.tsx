"use client"

import { usePathname } from "next/navigation"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

interface BreadcrumbItem {
  title: string
  url: string
  items?: {
    title: string
    url: string
  }[]
}

export function DynamicBreadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  const pathname = usePathname()
  
  // Function to generate breadcrumb path
  const generateBreadcrumbs = () => {
    const paths = pathname.split('/').filter(Boolean)
    const breadcrumbs: { title: string; url: string; isLast: boolean }[] = []
    
    // Find matching items from navigation
    let currentItems = items
    let currentPath = ""
    
    paths.forEach((path, index) => {
      currentPath += `/${path}`
      
      // Find matching item in current level
      const matchingItem = currentItems?.find(item => {
        // Check main items
        if (item.url === currentPath) return true
        // Check sub items
        return item.items?.some(subItem => subItem.url === currentPath)
      })
      
      // If found in main items
      if (matchingItem && matchingItem.url === currentPath) {
        breadcrumbs.push({
          title: matchingItem.title,
          url: matchingItem.url,
          isLast: index === paths.length - 1
        })
        currentItems = matchingItem.items || []
      } else {
        // Check sub items
        const subItem = currentItems?.find(item => 
          item.items?.some(sub => sub.url === currentPath)
        )?.items?.find(sub => sub.url === currentPath)
        
        if (subItem) {
          breadcrumbs.push({
            title: subItem.title,
            url: subItem.url,
            isLast: index === paths.length - 1
          })
        }
      }
    })
    
    return breadcrumbs
  }
  
  const breadcrumbs = generateBreadcrumbs()
  
  if (breadcrumbs.length <= 1) return null
  
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/" className="hidden md:inline-block">
            Home
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator className="hidden md:inline-block" />
        {breadcrumbs.map((crumb) => (
          <BreadcrumbItem key={crumb.url}>
            {crumb.isLast ? (
              <BreadcrumbPage>{crumb.title}</BreadcrumbPage>
            ) : (
              <>
                <BreadcrumbLink href={crumb.url} className="hidden md:inline-block">
                  {crumb.title}
                </BreadcrumbLink>
                <BreadcrumbSeparator className="hidden md:inline-block" />
              </>
            )}
          </BreadcrumbItem>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  )
}