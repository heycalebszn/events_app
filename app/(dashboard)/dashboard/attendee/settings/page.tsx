import type { Metadata } from "next"
import SettingsPage from "../components/settings/settings-page"

export const metadata: Metadata = {
  title: "Account Settings | Events Parlour",
  description: "Manage your account settings and security preferences",
}

export default function Settings() {
  return <SettingsPage />
}

