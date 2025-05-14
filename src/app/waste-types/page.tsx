// import Link from "next/link";
// import { ArrowLeft, Info } from "lucide-react";

// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";

// export default function WasteTypesPage() {
//   const wasteTypes = [
//     {
//       id: 1,
//       name: "Plastic",
//       description:
//         "Various plastic materials including bottles, containers, and packaging.",
//       instruction:
//         "Clean and separate by plastic type (PET, HDPE, etc.). Remove caps and labels when possible.",
//     },
//     {
//       id: 2,
//       name: "Paper",
//       description:
//         "Paper products including newspapers, magazines, cardboard, and office paper.",
//       instruction:
//         "Keep dry and clean. Flatten cardboard boxes. Remove any plastic or metal attachments.",
//     },
//     {
//       id: 3,
//       name: "Electronic Waste",
//       description: "Discarded electronic devices and components.",
//       instruction:
//         "Do not break or dismantle. Keep batteries separate. Ensure data is wiped from devices.",
//     },
//     {
//       id: 4,
//       name: "Organic Waste",
//       description:
//         "Food scraps, yard trimmings, and other biodegradable materials.",
//       instruction:
//         "Separate from non-organic waste. Ideal for composting. Avoid including meat or dairy in home composting.",
//     },
//     {
//       id: 5,
//       name: "Glass",
//       description: "Glass bottles, jars, and containers.",
//       instruction:
//         "Rinse clean. Separate by color if required. Remove caps and lids.",
//     },
//   ];

//   return (
//     <div className="container py-10">
//       <div className="flex items-center mb-8">
//         <Button variant="ghost" size="sm" asChild className="mr-4">
//           <Link href="/">
//             <ArrowLeft className="mr-2 h-4 w-4" />
//             Back to Home
//           </Link>
//         </Button>
//         <h1 className="text-3xl font-bold">Waste Types</h1>
//       </div>

//       <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
//         {wasteTypes.map((type) => (
//           <Card key={type.id} className="border-2 border-green-100">
//             <CardHeader>
//               <CardTitle>{type.name}</CardTitle>
//               <CardDescription>Waste Type ID: {type.id}</CardDescription>
//             </CardHeader>
//             <CardContent className="space-y-4">
//               <div>
//                 <h3 className="font-medium mb-1">Description</h3>
//                 <p className="text-sm text-muted-foreground">
//                   {type.description}
//                 </p>
//               </div>
//               <div>
//                 <h3 className="font-medium mb-1">Handling Instructions</h3>
//                 <p className="text-sm text-muted-foreground">
//                   {type.instruction}
//                 </p>
//               </div>
//             </CardContent>
//             <CardFooter>
//               <Button variant="outline" size="sm" className="w-full">
//                 <Info className="mr-2 h-4 w-4" />
//                 Learn More
//               </Button>
//             </CardFooter>
//           </Card>
//         ))}
//       </div>
//     </div>
//   );
// }

// import { Button } from "@/components/ui/button";
// import { logout } from "@/lib/actions/auth";
// import { verifySession } from "@/lib/dal";
// import { redirect } from "next/navigation";

// export default async function Home() {
//   const user = await verifySession();

//   if (!user) redirect("/");

//   return <Button onClick={logout}>Log out</Button>;
// }

import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Recycle,
  Truck,
  FileText,
  BarChart3,
  Info,
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
import { vwWasteTypesInfo } from "@/lib/db/drizzle/schema";
import { db } from "@/lib/db";
import { logout } from "@/lib/actions/auth";

export default async function HomePage() {
  const wasteTypes = await db.select().from(vwWasteTypesInfo);

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
              className="text-sm font-medium text-primary"
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
        <div className="container py-10 px-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {wasteTypes.map((type) => (
              <Card
                key={type.wasteTypeId}
                className="border-2 border-green-100"
              >
                <CardHeader>
                  <CardTitle>{type.name}</CardTitle>
                  <CardDescription>
                    Waste Type ID: {type.wasteTypeId}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="font-medium mb-1">Description</h3>
                    <p className="text-sm text-muted-foreground">
                      {type.description}
                    </p>
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Handling Instructions</h3>
                    <p className="text-sm text-muted-foreground">
                      {type.instruction}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
