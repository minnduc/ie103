// import { Button } from "@/components/ui/button";
// import { logout } from "@/lib/actions/auth";
// import { verifySession } from "@/lib/dal";
// import { redirect } from "next/navigation";

// export default async function Home() {
//   const user = await verifySession();

//   if (!user) redirect("/");

//   return <Button onClick={logout}>Log out</Button>;
// }
"use client";

import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Recycle,
  Truck,
  FileText,
  BarChart3,
  HelpCircle,
  ChevronDown,
  ChevronRight,
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
import { logout } from "@/lib/actions/auth";
import { useState } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [openFAQ, setOpenFAQ] = useState<string | null>(null);

  const faqItems = [
    {
      id: "what-is-ecowaste",
      question: "What is EcoWaste and how does it work?",
      answer:
        "EcoWaste is a comprehensive waste management platform that helps you properly dispose of and recycle waste materials. You can submit waste for analysis, get expert recommendations, and schedule convenient pickups. Our AI-powered image analysis can automatically identify waste types from photos.",
    },
    {
      id: "how-to-submit-waste",
      question: "How do I submit waste for analysis?",
      answer:
        "You can submit waste in two ways: 1) Upload a photo of your waste and let our AI analyze it automatically, or 2) Manually describe your waste and select the appropriate waste types. Navigate to 'Submissions' and click 'New Submission' to get started.",
    },
    {
      id: "ai-analysis-accuracy",
      question: "How accurate is the AI image analysis?",
      answer:
        "Our AI analysis is powered by advanced computer vision technology and is generally very accurate for common waste types. However, we recommend reviewing and editing the auto-filled information to ensure accuracy, especially for complex or mixed waste materials.",
    },
    {
      id: "pickup-scheduling",
      question: "How do I schedule a waste pickup?",
      answer:
        "After submitting waste for analysis, you can request a pickup by clicking 'Request Pickup' on your submission or navigating to the Pickup section. You'll need to provide your location, preferred time, and estimated weight of the waste.",
    },
    {
      id: "supported-waste-types",
      question: "What types of waste do you accept?",
      answer:
        "We accept most common waste types including: Plastic, Paper, Electronic Waste, Organic Waste, Glass, Metal, Hazardous Waste, and Textiles. Each type has specific handling requirements that our experts will guide you through.",
    },
    {
      id: "pickup-costs",
      question: "How much does waste pickup cost?",
      answer:
        "Pickup costs vary based on waste type, quantity, and location. You'll receive a quote before confirming your pickup request. Many recyclable materials have reduced or no fees, while hazardous waste may have additional handling charges.",
    },
    {
      id: "account-management",
      question: "How do I manage my account and view my history?",
      answer:
        "Access your dashboard to view all your submissions, pickup requests, and environmental impact metrics. You can track the status of your requests, reschedule pickups, and view detailed analysis results from your past submissions.",
    },
    {
      id: "environmental-impact",
      question: "How do you calculate environmental impact?",
      answer:
        "We track metrics like CO2 emissions saved, water conserved, and landfill space reduced based on the waste you properly dispose of or recycle. These calculations are based on industry-standard environmental impact assessments.",
    },
  ];

  const filteredFAQ = faqItems.filter(
    (item) =>
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-6">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Recycle className="h-6 w-6 text-green-600" />
            <span className="text-xl font-bold">EcoWaste</span>
          </div>
          <nav className="hidden md:flex gap-6">
            <Link href="/" className="text-sm font-medium text-primary">
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
            <Link
              href="/pickup"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              Request Pickup
            </Link>
          </nav>
          <Button variant="outline" size="sm" asChild onClick={logout}>
            <Link href="/">Log out</Link>
          </Button>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-green-50 px-6">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-4">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Sustainable Waste Management Solutions
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Submit your waste for analysis, get personalized
                  recommendations, and schedule eco-friendly pickups to reduce
                  your environmental footprint.
                </p>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button asChild>
                    <Link href="/ai">
                      AI Analysis <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link href="/waste-types">Learn About Waste Types</Link>
                  </Button>
                </div>
              </div>
              <div className="flex justify-center">
                <Image
                  src="/waste-management.jpg"
                  alt="Waste management illustration"
                  width={400}
                  height={400}
                  className="rounded-lg object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 px-6">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  How It Works
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our platform makes waste management simple, efficient, and
                  environmentally friendly.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3 lg:gap-12 mt-8">
              <Card className="border-2 border-green-100">
                <CardHeader className="pb-2">
                  <FileText className="h-12 w-12 text-green-600 mb-2" />
                  <CardTitle>Submit Waste</CardTitle>
                  <CardDescription>
                    Describe your waste and get it analyzed by our experts
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Our system categorizes your waste and provides detailed
                    analysis on how to properly dispose of or recycle it.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button variant="ghost" size="sm" className="w-full" asChild>
                    <Link href="/ai">Submit Now</Link>
                  </Button>
                </CardFooter>
              </Card>
              <Card className="border-2 border-green-100">
                <CardHeader className="pb-2">
                  <BarChart3 className="h-12 w-12 text-green-600 mb-2" />
                  <CardTitle>Get Analysis</CardTitle>
                  <CardDescription>
                    Receive detailed recommendations for your waste
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Our experts analyze your submission and provide personalized
                    recommendations for sustainable disposal.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button variant="ghost" size="sm" className="w-full" asChild>
                    <Link href="/dashboard">View Dashboard</Link>
                  </Button>
                </CardFooter>
              </Card>
              <Card className="border-2 border-green-100">
                <CardHeader className="pb-2">
                  <Truck className="h-12 w-12 text-green-600 mb-2" />
                  <CardTitle>Schedule Pickup</CardTitle>
                  <CardDescription>
                    Request a convenient pickup for your waste
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Schedule a pickup at your preferred time and location. We'll
                    handle the rest in an eco-friendly manner.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button variant="ghost" size="sm" className="w-full" asChild>
                    <Link href="/pickup/new">Request Pickup</Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-green-50 px-6">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="flex justify-center">
                <Image
                  src="/waste-type.jpg"
                  alt="Waste types illustration"
                  width={400}
                  height={400}
                  className="rounded-lg object-cover"
                />
              </div>
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                  Waste Type Information
                </h2>
                <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Learn about different types of waste, their environmental
                  impact, and how to properly dispose of them.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-green-600"></div>
                    <span>Detailed descriptions of waste categories</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-green-600"></div>
                    <span>Step-by-step disposal instructions</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-green-600"></div>
                    <span>Environmental impact information</span>
                  </li>
                </ul>
                <Button variant="outline" asChild>
                  <Link href="/waste-types">Explore Waste Types</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 px-6">
          <div className="max-w-3xl mx-auto">
            <div className="space-y-4">
              {filteredFAQ.map((item) => (
                <Collapsible
                  key={item.id}
                  open={openFAQ === item.id}
                  onOpenChange={(isOpen) => setOpenFAQ(isOpen ? item.id : null)}
                >
                  <CollapsibleTrigger asChild>
                    <Button
                      variant="ghost"
                      className="w-full justify-between p-4 h-auto text-left border rounded-lg hover:bg-muted/50"
                    >
                      <span className="font-medium">{item.question}</span>
                      {openFAQ === item.id ? (
                        <ChevronDown className="h-4 w-4" />
                      ) : (
                        <ChevronRight className="h-4 w-4" />
                      )}
                    </Button>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="px-4 pb-4">
                    <p className="text-muted-foreground">{item.answer}</p>
                  </CollapsibleContent>
                </Collapsible>
              ))}
            </div>

            {filteredFAQ.length === 0 && searchQuery && (
              <div className="text-center py-8">
                <HelpCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">No results found</h3>
                <p className="text-muted-foreground">
                  Try searching with different keywords or browse our other help
                  sections.
                </p>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
