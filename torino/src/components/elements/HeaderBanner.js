import Image from "next/image";
import React from "react";

function HeaderBanner() {
  return (
    <div
      id="Banner"
      className="flex justify-center max-w-fit container mx-auto"
    >
      <Image
        src="/images/Banner.png"
        alt="banner"
        width={22222}
        height={22222}
      />
    </div>
  );
}

export default HeaderBanner;
