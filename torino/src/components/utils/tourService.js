const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:6500";

export async function getAllTours() {
  try {
    const response = await fetch(`${BASE_URL}/tour`, {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Fetch Error:", error);
    return [];
  }
}
