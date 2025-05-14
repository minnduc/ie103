"use server";

import { sql } from "drizzle-orm";
import { revalidateTag } from "next/cache";
import { db } from "../db";
import { verifySession } from "../dal";

export async function createPickupRequest({
  wasteDetails,
  weight,
  date,
  location,
  time,
}: any) {
  const { userId } = await verifySession();

  await db.execute(sql`
    CALL insert_pickup_request(
    ${userId}, 
    null, 
    ${wasteDetails}, 
    ${weight}, 
    ${date},
    ${location}
    );
    `);

  revalidateTag("pickup_requests");
}

export async function deletePickupRequest(requestId: any) {
  console.log(requestId);

  await db.execute(sql`
    CALL delete_pickup_request(${requestId})
  `);

  revalidateTag("pickup_requests");
}
