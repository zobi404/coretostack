import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function AdminSettingsPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight mb-6 font-headline">Settings</h1>
      <div className="grid gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
            <CardDescription>Update your public contact details.</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4 max-w-lg">
              <div className="space-y-2">
                <Label htmlFor="email">Public Email</Label>
                <Input id="email" defaultValue="hello@codetostack.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" defaultValue="(123) 456-7890" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input id="address" defaultValue="123 Innovation Drive, Tech City, 10001" />
              </div>
              <Button>Save Contact Info</Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Integrations</CardTitle>
            <CardDescription>Manage third-party service integrations.</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4 max-w-lg">
              <div className="space-y-2">
                <Label htmlFor="cloudinary">Cloudinary API Key</Label>
                <Input id="cloudinary" type="password" placeholder="Enter your Cloudinary API key" />
              </div>
              <Button>Save Integrations</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
