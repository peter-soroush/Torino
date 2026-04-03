// فایل اصلی: src/app/profile/page.js
import ProfileTabs from "@/components/elements/ProfileTabs";
import MyToursInfo from "@/components/Module/MyToursInfo";
import ProfileInfo from "@/components/Module/ProfileInfo";
import Transactions from "@/components/Module/Transactions";
import React from "react";

export default function ProfilePage() {
  return (
    // کامپوننت‌های سروری را به عنوان پراپ پاس می‌دهیم
    <ProfileTabs
      profileTab={<ProfileInfo />}
      myToursTab={<MyToursInfo />}
      transactionsTab={<Transactions />}
    />
  );
}
