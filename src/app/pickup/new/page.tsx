"use client";

import type React from "react";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, Loader2, Calendar, Clock, Recycle } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { createPickupRequest } from "@/lib/actions/pickup_request";
import { toast } from "sonner";
import { logout } from "@/lib/actions/auth";

export default function NewPickupRequestPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const submissionId = searchParams.get("submission");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [wasteDetails, setWasteDetails] = useState("");
  const [weight, setWeight] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  // If we have a submission ID, we would typically fetch the submission details
  // and pre-fill the form
  useEffect(() => {
    if (submissionId) {
      // This would typically be an API call to get submission details
      // For now, we'll just set a placeholder value
      setWasteDetails(`Waste from submission #${submissionId}`);
    }
  }, [submissionId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      wasteDetails.trim() === "" ||
      weight.trim() === "" ||
      location.trim() === "" ||
      date.trim() === "" ||
      time.trim() === ""
    ) {
      //   toast({
      //     title: "Error",
      //     description: "Please fill in all required fields",
      //     variant: "destructive",
      //   });
      return;
    }

    setIsSubmitting(true);

    try {
      await createPickupRequest({ wasteDetails, weight, date, location, time });

      toast.success("Pickup request successful", {
        description: "Your pickup request has been submitted",
      });

      router.push("/pickup");
    } catch (error) {
      toast.warning("Request failed", {
        description:
          "There was an error submitting your pickup request. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
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
          <Card className="max-w-2xl mx-auto border-2 border-green-100">
            <form onSubmit={handleSubmit}>
              <CardHeader>
                <CardTitle>Schedule a Waste Pickup</CardTitle>
                <CardDescription>
                  Provide details about the waste you need picked up and your
                  preferred pickup time and location.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="waste-details" className="text-base">
                    Waste Details
                  </Label>
                  <Textarea
                    id="waste-details"
                    placeholder="Describe the waste you need picked up..."
                    className="min-h-[100px]"
                    value={wasteDetails}
                    onChange={(e) => setWasteDetails(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="weight" className="text-base">
                    Estimated Weight (kg)
                  </Label>
                  <Input
                    id="weight"
                    type="number"
                    placeholder="Enter estimated weight in kg"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    min="0"
                    step="0.1"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location" className="text-base">
                    Pickup Location
                  </Label>
                  <Textarea
                    id="location"
                    placeholder="Enter the address for pickup"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label
                      htmlFor="date"
                      className="text-base flex items-center"
                    >
                      <Calendar className="mr-2 h-4 w-4" />
                      Pickup Date
                    </Label>
                    <Input
                      id="date"
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="time"
                      className="text-base flex items-center"
                    >
                      <Clock className="mr-2 h-4 w-4" />
                      Pickup Time
                    </Label>
                    <Input
                      id="time"
                      type="time"
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      required
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between pt-6">
                <Button type="button" variant="outline" asChild>
                  <Link href="/pickup">Cancel</Link>
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    "Request Pickup"
                  )}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </div>
      </main>
    </div>
  );
}
