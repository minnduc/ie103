"use client";

import type React from "react";

import { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Loader2,
  Upload,
  X,
  ImageIcon,
  Check,
  Recycle,
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
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { analyzeWasteImage } from "@/lib/actions/analyze-waste";
import { logout } from "@/lib/actions/auth";

export default function AnalyzedPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analyzeProgress, setAnalyzeProgress] = useState(0);
  const [wasteDescription, setWasteDescription] = useState("");
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [analysisResult, setAnalysisResult] = useState<{
    description: string;
    wasteTypes: string[];
  } | null>(null);

  // This would typically come from your database
  const wasteTypes = [
    { id: 1, name: "Plastic" },
    { id: 2, name: "Paper" },
    { id: 3, name: "Electronic Waste" },
    { id: 4, name: "Organic Waste" },
    { id: 5, name: "Glass" },
    { id: 6, name: "Metal" },
    { id: 7, name: "Hazardous Waste" },
    { id: 8, name: "Textile" },
  ];

  const [selectedWasteTypes, setSelectedWasteTypes] = useState<number[]>([]);

  const handleWasteTypeChange = (wasteTypeId: number, checked: boolean) => {
    if (checked) {
      setSelectedWasteTypes([...selectedWasteTypes, wasteTypeId]);
    } else {
      setSelectedWasteTypes(
        selectedWasteTypes.filter((id) => id !== wasteTypeId)
      );
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check file type
    if (!file.type.startsWith("image/")) {
      toast.warning("Invalid file type", {
        description: "Please upload an image file",
      });
      return;
    }

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.warning("File too large", {
        description: "Please upload an image smaller than 5MB",
      });
      return;
    }

    setImageFile(file);
    const objectUrl = URL.createObjectURL(file);
    setImageUrl(objectUrl);

    // Reset analysis result when new image is uploaded
    setAnalysisResult(null);
    setWasteDescription("");
    setSelectedWasteTypes([]);
  };

  const handleRemoveImage = () => {
    setImageUrl(null);
    setImageFile(null);
    setAnalysisResult(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleAnalyzeImage = async () => {
    if (!imageFile) return;

    setIsAnalyzing(true);
    setAnalyzeProgress(0);

    // Simulate progress
    const progressInterval = setInterval(() => {
      setAnalyzeProgress((prev) => {
        const newProgress = prev + Math.random() * 10;
        return newProgress >= 90 ? 90 : newProgress;
      });
    }, 300);

    try {
      const formData = new FormData();
      formData.append("image", imageFile);

      const result = await analyzeWasteImage(formData);

      if (result.success) {
        setAnalysisResult(result.data!);
        setWasteDescription(result.data!.description);

        const matchedWasteTypeIds = wasteTypes
          .filter((type) =>
            result.data!.wasteTypes.some(
              (analyzedType: any) =>
                analyzedType.toLowerCase() === type.name.toLowerCase()
            )
          )
          .map((type) => type.id);

        setSelectedWasteTypes(matchedWasteTypeIds);

        toast("Analysis complete", {
          description:
            "We've analyzed your waste image and filled in the details",
        });
      } else {
        toast.warning("Analysis failed", {
          description:
            result.error || "There was an error analyzing your image",
        });
      }
    } catch (error) {
      console.error("Error analyzing image:", error);
      toast("Analysis failed", {
        description:
          "There was an error analyzing your image. Please try again.",
      });
    } finally {
      clearInterval(progressInterval);
      setAnalyzeProgress(100);
      setTimeout(() => {
        setIsAnalyzing(false);
        setAnalyzeProgress(0);
      }, 500);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (wasteDescription.trim() === "") {
      toast.error("Error", {
        description: "Please provide a waste description",
      });
      return;
    }

    if (selectedWasteTypes.length === 0) {
      toast.error("Error", {
        description: "Please select at least one waste type",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      toast("AI Analyzed successful", {
        description: "Your waste has been submitted for analysis",
      });

      router.push("/pickup/new");
    } catch (error) {
      toast.warning("AI Analyzed failed", {
        description:
          "There was an error submitting your waste. Please try again.",
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
            <Link href="/ai" className="text-sm font-medium text-primary">
              AI
            </Link>
            <Link
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              href="/pickup"
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
        <div className="container py-10">
          <Card className="max-w-2xl mx-auto border-2 border-green-100">
            <form onSubmit={handleSubmit}>
              <CardHeader>
                <CardTitle>Submit Waste for Analysis</CardTitle>
                <CardDescription>
                  Upload an image of your waste for AI analysis or manually
                  describe the waste you want to submit.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Image Upload Section */}
                <div className="space-y-2">
                  <Label className="text-base">Waste Image</Label>
                  <div className="flex flex-col items-center justify-center gap-4">
                    {imageUrl ? (
                      <div className="relative w-full max-w-md aspect-video">
                        <Image
                          src={imageUrl || "/placeholder.svg"}
                          alt="Waste image"
                          fill
                          className="object-cover rounded-md"
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          size="icon"
                          className="absolute top-2 right-2 h-8 w-8"
                          onClick={handleRemoveImage}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                        {analysisResult && (
                          <div className="absolute bottom-2 right-2 bg-green-600 text-white rounded-full p-1">
                            <Check className="h-5 w-5" />
                          </div>
                        )}
                      </div>
                    ) : (
                      <div
                        onClick={() => fileInputRef.current?.click()}
                        className="border-2 border-dashed border-gray-300 rounded-md p-8 w-full flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-green-300 transition-colors"
                      >
                        <ImageIcon className="h-10 w-10 text-gray-400" />
                        <p className="text-sm text-muted-foreground">
                          Click to upload an image of your waste
                        </p>
                        <p className="text-xs text-muted-foreground">
                          PNG, JPG or WEBP (max. 5MB)
                        </p>
                      </div>
                    )}
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageUpload}
                    />
                    <div className="flex gap-2 w-full">
                      {!imageUrl && (
                        <Button
                          type="button"
                          variant="outline"
                          className="w-full"
                          onClick={() => fileInputRef.current?.click()}
                        >
                          <Upload className="mr-2 h-4 w-4" />
                          Select Image
                        </Button>
                      )}
                      {imageUrl && !analysisResult && (
                        <Button
                          type="button"
                          variant="default"
                          className="w-full"
                          onClick={handleAnalyzeImage}
                          disabled={isAnalyzing}
                        >
                          {isAnalyzing ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Analyzing...
                            </>
                          ) : (
                            <>Analyze with AI</>
                          )}
                        </Button>
                      )}
                    </div>
                    {isAnalyzing && (
                      <div className="w-full space-y-2">
                        <Progress value={analyzeProgress} className="h-2" />
                        <p className="text-xs text-center text-muted-foreground">
                          Analyzing your waste image...
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Analysis Result */}
                {analysisResult && (
                  <div className="rounded-md border bg-muted/50 p-4">
                    <h3 className="font-medium mb-2 flex items-center">
                      <Check className="h-4 w-4 mr-2 text-green-600" />
                      AI Analysis Result
                    </h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      We've analyzed your image and identified the following
                      waste types:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {analysisResult.wasteTypes.map((type) => (
                        <div
                          key={type}
                          className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs"
                        >
                          {type}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="waste-description" className="text-base">
                    Waste Description
                  </Label>
                  <Textarea
                    id="waste-description"
                    placeholder="Describe the waste you want to submit for analysis..."
                    className="min-h-[120px]"
                    value={wasteDescription}
                    onChange={(e) => setWasteDescription(e.target.value)}
                    required
                  />
                  <p className="text-sm text-muted-foreground">
                    Please provide as much detail as possible about the waste
                    materials.
                  </p>
                </div>

                <div className="space-y-3">
                  <Label className="text-base">Waste Types</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {wasteTypes.map((wasteType) => (
                      <div
                        key={wasteType.id}
                        className="flex items-center space-x-2"
                      >
                        <Checkbox
                          id={`waste-type-${wasteType.id}`}
                          checked={selectedWasteTypes.includes(wasteType.id)}
                          onCheckedChange={(checked) =>
                            handleWasteTypeChange(
                              wasteType.id,
                              checked as boolean
                            )
                          }
                        />
                        <Label
                          htmlFor={`waste-type-${wasteType.id}`}
                          className="text-sm font-normal"
                        >
                          {wasteType.name}
                        </Label>
                      </div>
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Select all waste types that apply.
                  </p>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between pt-6">
                <Button type="button" variant="outline" asChild>
                  <Link href="/home">Cancel</Link>
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    "Go to request"
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
