const toPersianNumbers = (num) => {
  const farsiDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
  return num.toString().replace(/\d/g, (x) => farsiDigits[x]);
};

const getPersianMonth = (dateString) => {
  return (
    new Intl.DateTimeFormat("fa-IR", { month: "long" }).format(
      new Date(dateString),
    ) + " ماه"
  );
};
const getDurationDays = (start, end) => {
  return Math.ceil((new Date(end) - new Date(start)) / (1000 * 60 * 60 * 24));
};
const getVehicleName = (vehicle) => {
  const map = {
    airplane: "هواپیما",
    bus: "اتوبوس",
    train: "قطار",
    ship: "کشتی",
    suv: "آفرود",
    van: "ون",
    car: "خودرو",
  };
  if (!vehicle) {
    return "نامشخص";
  }
  return map[vehicle.toLowerCase()] || "خودرو";
};

function convertToPersianDate(isoString) {
  try {
    const date = new Date(isoString);

    // بررسی معتبر بودن تاریخ ورودی
    if (isNaN(date.getTime())) {
      throw new Error("فرمت تاریخ ورودی نامعتبر است.");
    }

    // استفاده از Intl برای تبدیل تقویم به هجری شمسی
    const formatter = new Intl.DateTimeFormat("fa-IR", {
      calendar: "persian",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });

    return formatter.format(date);
  } catch (error) {
    return error.message;
  }
}

const getTourStatus = (startDate, endDate) => {
  // ۱. بررسی رسیدن دیتا
  if (!startDate || !endDate) {
    return <div className="text-gray-400 text-sm">در حال بررسی...</div>;
  }

  const today = new Date();
  const start = new Date(startDate);
  const end = new Date(endDate);

  // بررسی معتبر بودن تاریخ
  if (isNaN(start.getTime()) || isNaN(end.getTime())) {
    return (
      <div className="text-red-500 text-sm bg-red-50 px-2 py-1 rounded-md">
        نامشخص
      </div>
    );
  }

  today.setHours(0, 0, 0, 0);
  start.setHours(0, 0, 0, 0);
  end.setHours(0, 0, 0, 0);

  const diffTime = start - today;
  const daysLeft = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  // ۲. برگرداندن div با استایل‌های مختلف (Badge)
  if (today > end) {
    return (
      <div className="bg-green-100 text-green-600 px-1 py-1 rounded-3xl text-xs text-center font-medium w-fit ">
        به اتمام رسیده
      </div>
    );
  } else if (today >= start && today <= end) {
    return (
      <div className="bg-orange-700 text-white px-3 py-1 rounded-3xl text-xs text-center font-medium w-fit">
        در حال برگزاری
      </div>
    );
  } else if (daysLeft > 0) {
    return (
      <div className="bg-amber-300 text-orange-600 px-3 py-1 rounded-3xl text-xs text-center font-medium w-fit">
        {daysLeft.toLocaleString("fa-IR")} روز مانده به تور
      </div>
    );
  }

  return null;
};

function getLongPersianDate(isoString) {
  try {
    const date = new Date(isoString);

    if (isNaN(date.getTime())) {
      return "تاریخ نامعتبر";
    }

    // یک تابع کمکی کوچک برای استخراج تک‌تک اجزا
    const getPart = (options) =>
      new Intl.DateTimeFormat("fa-IR", {
        calendar: "persian",
        ...options,
      }).format(date);

    const weekday = getPart({ weekday: "long" }); // خروجی: دوشنبه
    const day = getPart({ day: "numeric" }); // خروجی: ۱۹
    const month = getPart({ month: "long" }); // خروجی: آبان
    const year = getPart({ year: "numeric" }); // خروجی: ۱۴۰۴

    return `${weekday} \u00A0 ${day} \u00A0 ${month} \u00A0 ${year}`;
  } catch (error) {
    return error.message;
  }
}

function convertToPersianDateTime(isoString) {
  try {
    const date = new Date(isoString);

    // بررسی معتبر بودن تاریخ ورودی
    if (isNaN(date.getTime())) {
      return "تاریخ نامعتبر";
    }

    // ۱. استخراج تاریخ (فرمت: ۱۴۰۲/۱۰/۱۲)
    const dateFormatter = new Intl.DateTimeFormat("fa-IR", {
      calendar: "persian",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
    const datePart = dateFormatter.format(date);

    // ۲. استخراج ساعت (فرمت: ۱۴:۲۴)
    const timeFormatter = new Intl.DateTimeFormat("fa-IR", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false, // برای جلوگیری از نمایش ب.ظ / ق.ظ و استفاده از فرمت ۲۴ ساعته
    });
    const timePart = timeFormatter.format(date);

    // ۳. ترکیب سفارشی (چون سایت شما RTL است، قرار دادن ساعت در ابتدا باعث می‌شود در سمت راستِ خط تیره بیفتد)
    return `${timePart} - ${datePart}`;
  } catch (error) {
    return error.message;
  }
}

export {
  toPersianNumbers,
  getPersianMonth,
  getDurationDays,
  getVehicleName,
  convertToPersianDate,
  getTourStatus,
  getLongPersianDate,
  convertToPersianDateTime,
};
