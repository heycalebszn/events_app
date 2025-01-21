"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/hooks/use-toast"
import { Fingerprint, Key, ShieldCheck } from "lucide-react"

export default function SettingsPage() {
  const [isPasskeyEnabled, setIsPasskeyEnabled] = useState(false)
  const [isSettingUpPasskey, setIsSettingUpPasskey] = useState(false)
  const { toast } = useToast()

  const handlePasskeyToggle = (checked: boolean) => {
    if (checked) {
      setIsSettingUpPasskey(true)
      // Simulate passkey setup process
      setTimeout(() => {
        setIsPasskeyEnabled(true)
        setIsSettingUpPasskey(false)
        toast({
          title: "Passkey setup complete",
          description: "You can now use your passkey for 2FA.",
        })
      }, 2000)
    } else {
      setIsPasskeyEnabled(false)
      toast({
        title: "Passkey disabled",
        description: "You have removed passkey as a 2FA method.",
      })
    }
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Account Settings</h1>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center">
            <ShieldCheck className="mr-2" />
            Security Settings
          </CardTitle>
          <CardDescription>Manage your account security preferences</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <h3 className="text-lg font-medium">Two-Factor Authentication (2FA)</h3>
              <p className="text-sm text-muted-foreground">
                Enhance your account security with an additional layer of protection
              </p>
            </div>
            <Switch checked={isPasskeyEnabled} onCheckedChange={handlePasskeyToggle} disabled={isSettingUpPasskey} />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Key className="mr-2" />
            Passkey Settings
          </CardTitle>
          <CardDescription>Set up and manage your passkeys for secure authentication</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-start space-x-4">
            <Fingerprint className="w-6 h-6 mt-1" />
            <div>
              <h3 className="font-medium">What are Passkeys?</h3>
              <p className="text-sm text-muted-foreground">
                Passkeys are a secure and easy way to sign in without passwords. They use biometric data or device PIN,
                making your account more resistant to phishing and data breaches.
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <ShieldCheck className="w-6 h-6 mt-1" />
            <div>
              <h3 className="font-medium">Benefits of Using Passkeys</h3>
              <ul className="text-sm text-muted-foreground list-disc list-inside">
                <li>Enhanced security compared to traditional passwords</li>
                <li>No need to remember complex passwords</li>
                <li>Quick and easy login process</li>
                <li>Protection against phishing attacks</li>
              </ul>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={() => handlePasskeyToggle(!isPasskeyEnabled)} disabled={isSettingUpPasskey}>
            {isPasskeyEnabled ? "Remove Passkey" : "Set Up Passkey"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

