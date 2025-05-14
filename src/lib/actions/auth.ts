"use server";

import bcrypt from "bcrypt";
import { db } from "../db";
import { users } from "../db/drizzle/schema";

import { cookies } from "next/headers";
import { encrypt } from "../session";
import { redirect } from "next/navigation";
import { and, eq, sql } from "drizzle-orm";

export async function signup(formData: FormData) {
  const name = formData.get("name") as string;
  const password = formData.get("password") as string;
  const passwordHash = await bcrypt.hash(password, 10);

  // const data = await db
  //   .insert(users)
  //   .values({ name, passwordHash, role: "user" })
  //   .returning();

  await db.execute(sql`call insert_user(${name}, ${passwordHash}, 'user')`);

  const data = await db
    .select()
    .from(users)
    .where(and(eq(users.name, name)));

  const user = data[0];

  if (!user) return;

  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  const session = await encrypt({ userId: user.id, expiresAt });
  const cookieStore = await cookies();

  cookieStore.set("session", session, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: "lax",
    path: "/",
  });

  redirect("/home");
}

export async function login(formData: FormData) {
  const name = formData.get("name") as string;
  const password = formData.get("password") as string;

  const data = await db
    .select()
    .from(users)
    .where(and(eq(users.name, name)));

  const user = data[0];

  const isLogin = await bcrypt.compare(password, user.passwordHash);

  if (!isLogin) return;

  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  const session = await encrypt({ userId: user.id, expiresAt });
  const cookieStore = await cookies();

  cookieStore.set("session", session, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: "lax",
    path: "/",
  });

  redirect("/home");
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete("session");
  redirect("/");
}
