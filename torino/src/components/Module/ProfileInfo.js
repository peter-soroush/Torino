import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";
import ProfileClient from "../elements/ProfileClient";

export default async function ProfileInfo() {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  if (!token) {
    redirect("/");
  }

  const res = await fetch(`http://localhost:6500/user/profile`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  if (res.status === 401 || res.status === 403) {
    redirect("/api/auth/signout");
  }

  const data = await res.json();

  // کل عملیات رندر و فرم‌ها را به کلاینت می‌سپاریم و توکن را هم برای PUT پاس می‌دهیم
  return <ProfileClient userData={data} token={token} />;
}
