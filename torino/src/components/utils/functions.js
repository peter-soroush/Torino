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
    airplane: "پرواز",
    bus: "اتوبوس",
    train: "قطار",
    ship: "کشتی",
    suv: "آفرود",
  };
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

export {
  toPersianNumbers,
  getPersianMonth,
  getDurationDays,
  getVehicleName,
  convertToPersianDate,
};
