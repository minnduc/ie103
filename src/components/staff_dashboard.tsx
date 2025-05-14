import { useState } from "react";
import { BarChart, FileText, Package2, Truck, Users } from "lucide-react";

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
import { db } from "@/lib/db";
import { sql } from "drizzle-orm";

export function StaffDashboard() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Pending Analysis
            </CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">4 high priority</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Assigned Pickups
            </CardTitle>
            <Truck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">
              3 scheduled for today
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Completed Today
            </CardTitle>
            <BarChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">+2 from yesterday</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Performance Score
            </CardTitle>
            <BarChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">92%</div>
            <p className="text-xs text-muted-foreground">+5% from last week</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="analysis-queue">
        <TabsList>
          <TabsTrigger value="analysis-queue">Analysis Queue</TabsTrigger>
          <TabsTrigger value="pickup-assignments">
            Pickup Assignments
          </TabsTrigger>
        </TabsList>
        <TabsContent value="analysis-queue" className="border rounded-md mt-6">
          <Table>
            <TableCaption>Submissions waiting for analysis.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Waste Description</TableHead>
                <TableHead>Submitted At</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">SUB-002</TableCell>
                <TableCell>Jane Smith</TableCell>
                <TableCell>Garden waste</TableCell>
                <TableCell>2024-05-03</TableCell>
                <TableCell>
                  <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
                    Medium
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="outline" size="sm">
                    Analyze
                  </Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">SUB-003</TableCell>
                <TableCell>Bob Johnson</TableCell>
                <TableCell>Glass bottles</TableCell>
                <TableCell>2024-05-05</TableCell>
                <TableCell>
                  <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                    Low
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="outline" size="sm">
                    Analyze
                  </Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">SUB-004</TableCell>
                <TableCell>Alice Williams</TableCell>
                <TableCell>Electronic waste</TableCell>
                <TableCell>2024-05-06</TableCell>
                <TableCell>
                  <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
                    High
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="outline" size="sm">
                    Analyze
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TabsContent>
        <TabsContent
          value="pickup-assignments"
          className="border rounded-md mt-6"
        >
          <Table>
            <TableCaption>Your assigned pickup requests.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Scheduled Time</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">PCK-001</TableCell>
                <TableCell>John Doe</TableCell>
                <TableCell>123 Green Street</TableCell>
                <TableCell>2024-05-10 09:00</TableCell>
                <TableCell>
                  <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
                    Scheduled
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="outline" size="sm">
                    Start
                  </Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">PCK-004</TableCell>
                <TableCell>Alice Williams</TableCell>
                <TableCell>321 Eco Lane</TableCell>
                <TableCell>2024-05-10 11:30</TableCell>
                <TableCell>
                  <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
                    Scheduled
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="outline" size="sm">
                    Start
                  </Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">PCK-005</TableCell>
                <TableCell>Mike Brown</TableCell>
                <TableCell>567 Recycle Drive</TableCell>
                <TableCell>2024-05-10 14:00</TableCell>
                <TableCell>
                  <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
                    Scheduled
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="outline" size="sm">
                    Start
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TabsContent>
      </Tabs>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Today's Schedule</CardTitle>
            <CardDescription>
              Your pickup and analysis schedule for today
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4 rounded-lg border p-3">
                <div className="rounded-full bg-blue-100 p-2">
                  <Truck className="h-4 w-4 text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">
                    Pickup at 123 Green Street
                  </p>
                  <p className="text-xs text-muted-foreground">09:00 - 10:00</p>
                </div>
                <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
                  Scheduled
                </Badge>
              </div>
              <div className="flex items-center gap-4 rounded-lg border p-3">
                <div className="rounded-full bg-blue-100 p-2">
                  <Truck className="h-4 w-4 text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Pickup at 321 Eco Lane</p>
                  <p className="text-xs text-muted-foreground">11:30 - 12:30</p>
                </div>
                <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
                  Scheduled
                </Badge>
              </div>
              <div className="flex items-center gap-4 rounded-lg border p-3">
                <div className="rounded-full bg-green-100 p-2">
                  <FileText className="h-4 w-4 text-green-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">
                    Analyze Electronic Waste Submission
                  </p>
                  <p className="text-xs text-muted-foreground">13:00 - 14:00</p>
                </div>
                <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
                  High Priority
                </Badge>
              </div>
              <div className="flex items-center gap-4 rounded-lg border p-3">
                <div className="rounded-full bg-blue-100 p-2">
                  <Truck className="h-4 w-4 text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">
                    Pickup at 567 Recycle Drive
                  </p>
                  <p className="text-xs text-muted-foreground">14:00 - 15:00</p>
                </div>
                <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
                  Scheduled
                </Badge>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              View Full Schedule
            </Button>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Performance Metrics</CardTitle>
            <CardDescription>Your work performance statistics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Pickups Completed</span>
                  <span className="text-sm font-medium">45/50</span>
                </div>
                <div className="h-2 w-full rounded-full bg-muted">
                  <div className="h-full w-[90%] rounded-full bg-green-500"></div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Analysis Accuracy</span>
                  <span className="text-sm font-medium">95%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-muted">
                  <div className="h-full w-[95%] rounded-full bg-green-500"></div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Response Time</span>
                  <span className="text-sm font-medium">85%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-muted">
                  <div className="h-full w-[85%] rounded-full bg-green-500"></div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Customer Satisfaction</span>
                  <span className="text-sm font-medium">92%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-muted">
                  <div className="h-full w-[92%] rounded-full bg-green-500"></div>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              View Detailed Performance
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
