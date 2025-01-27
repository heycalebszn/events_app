import { Metadata } from 'next'
import HelpAndSupport from '../../attendee/components/help/help-support'

export const metadata: Metadata = {
  title: 'Help & Support | Events Parlour',
  description: 'Get assistance and answers to your questions about Events Parlour',
}

export default function HelpSupportPage() {
  return <HelpAndSupport />
}
