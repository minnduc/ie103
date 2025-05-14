"use client";

import { Button } from "@/components/ui/button";
import { deletePickupRequest } from "@/lib/actions/pickup_request";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

export function CancelPickupButton({ requestId }: { requestId: number }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleCancel = () => {
    startTransition(async () => {
      try {
        console.log(requestId);

        await deletePickupRequest(requestId);
        router.refresh();
      } catch (error) {
        console.error("Failed to cancel pickup:", error);
      }
    });
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleCancel}
      disabled={isPending}
    >
      {isPending ? "Canceling..." : "Cancel"}
    </Button>
  );
}
