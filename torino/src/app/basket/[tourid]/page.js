import CheckoutClient from "@/components/Module/CheckoutClient";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

export default async function Basket() {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  if (!token) {
    redirect("/");
  }

  const res = await fetch(`http://localhost:6500/basket`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  if (!res.ok) {
    return (
      <div className="text-center mt-20 text-xl font-bold text-red-500">
        سبد خرید شما خالی است.
      </div>
    );
  }

  const basketData = await res.json();

  return <CheckoutClient basketData={basketData} />;
}
