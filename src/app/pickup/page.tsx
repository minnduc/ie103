import Link from "next/link";
import {
  ArrowLeft,
  Plus,
  Truck,
  Clock,
  MapPin,
  Recycle,
  User,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { users, vwPickupRequestsInfo } from "@/lib/db/drizzle/schema";
import { db } from "@/lib/db";
import { verifySession } from "@/lib/dal";
import { eq } from "drizzle-orm";
import { deletePickupRequest } from "@/lib/actions/pickup_request";
import { logout } from "@/lib/actions/auth";
import { CancelPickupButton } from "@/components/CancelPickupButton";

export default async function PickupRequestsPage() {
  const { userId } = await verifySession();

  const pickupRequests = (await db.select().from(vwPickupRequestsInfo)).filter(
    (item: any) => item.userId == userId
  );

  const getStatusColor = (status: any) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "scheduled":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "completed":
        return "bg-green-100 text-green-800 border-green-200";
      case "failed":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-6">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Recycle className="h-6 w-6 text-green-600" />
            <span className="text-xl font-bold">EcoWaste</span>
          </div>
          <nav className="hidden md:flex gap-6">
            <Link
              href="/"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              Home
            </Link>
            <Link
              href="/waste-types"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              Waste Types
            </Link>
            <Link
              href="/ai"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              AI
            </Link>
            <Link href="/pickup" className="text-sm font-medium text-primary">
              Request Pickup
            </Link>
          </nav>
          <Button variant="outline" size="sm" asChild onClick={logout}>
            <Link href="/">Log out</Link>
          </Button>
        </div>
      </header>
      <main className="flex-1">
        <div className="container py-10 px-6">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold">Pickup Requests</h1>
            <Button asChild>
              <Link href="/pickup/new">
                <Plus className="mr-2 h-4 w-4" />
                New Pickup Request
              </Link>
            </Button>
          </div>

          <div className="space-y-6">
            {pickupRequests.map((request) => (
              <Card
                key={request.requestId}
                className="border-2 border-green-100"
              >
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="flex items-center">
                        <Truck className="mr-2 h-5 w-5 text-green-600" />
                        Pickup Request #{request.requestId}
                      </CardTitle>
                      <CardDescription>
                        Requested on{" "}
                        {new Date(request.requestAt!).toLocaleDateString()} for
                        Submission #{request.submissionId}
                      </CardDescription>
                    </div>
                    <Badge
                      className={`capitalize ${getStatusColor(request.status)}`}
                    >
                      {request.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="font-medium mb-1">Waste Details</h3>
                    <p className="text-sm text-muted-foreground">
                      {request.wasteDetails}
                    </p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex items-center">
                      <div className="mr-2 h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                        <Clock className="h-4 w-4 text-green-600" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">
                          Scheduled Time
                        </p>
                        <p className="text-sm font-medium">
                          {new Date(request.scheduledTime!).toLocaleString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="mr-2 h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                        <MapPin className="h-4 w-4 text-green-600" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">
                          Location
                        </p>
                        <p className="text-sm font-medium">
                          {request.location}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="mr-2 h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                        <svg
                          className="h-4 w-4 text-green-600"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
                          />
                        </svg>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Weight</p>
                        <p className="text-sm font-medium">
                          {request.weight} kg
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  {request.status === "pending" && (
                    <CancelPickupButton requestId={request.requestId!} />
                  )}
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
