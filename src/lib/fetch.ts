const API_URL = import.meta.env.VITE_API_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

export const fetchWeather = async (city: string) => {
  const response = await fetch(
    `${API_URL}?q=${city}&appid=${API_KEY}&units=metric`,
  );
  if (response.status === 404) {
    throw new Error("Kota tidak ditemukan");
  }
  if (!response.ok) {
    throw new Error("Terjadi kesalahan server");
  }
  const result = await response.json();
  return result;
};
