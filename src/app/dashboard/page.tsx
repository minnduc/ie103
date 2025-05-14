import { useState } from "react";
import {
  BarChart,
  FileText,
  Package2,
  Recycle,
  Truck,
  Users,
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
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

import { AdminDashboard } from "@/components/admin-dashboard";
import { verifySession } from "@/lib/dal";
import { StaffDashboard } from "@/components/staff_dashboard";
import { UserDashboard } from "@/components/user-dashboard";
import { users } from "@/lib/db/drizzle/schema";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import Link from "next/link";
import { logout } from "@/lib/actions/auth";

export default async function DashboardPage() {
  //   const [userRole, setUserRole] = useState<"admin" | "user" | "staff">("user");

  //   const switchRole = (role: "admin" | "user" | "staff") => {
  //     setUserRole(role);
  //   };

  const { userId } = await verifySession();

  const data = await db
    .select()
    .from(users)
    .where(eq(users.id, `${userId}`));

  const user = data[0];

  const userRole = user.role;

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
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <div className="flex items-center gap-2"></div>
          </div>

          {userRole === "admin" && <AdminDashboard />}
          {userRole === "staff" && <StaffDashboard />}
          {userRole === "user" && <UserDashboard />}
        </div>
      </main>
    </div>
  );
}
