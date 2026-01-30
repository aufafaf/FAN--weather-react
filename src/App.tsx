import { useState } from "react";

interface WeatherData {
  temp: number;
}

function App() {
  const API_URL = import.meta.env.VITE_API_URL;
  const API_KEY = import.meta.env.VITE_API_KEY;

  const [city, setCity] = useState("");
  const [data, setData] = useState<WeatherData | null>(null);

  const fetchWeather = async () => {
    try {
      const response = await fetch(
        `${API_URL}?q=${city}&appid=${API_KEY}&units=metric`,
      );

      if (!response.ok) {
        throw new Error("Kota tidak ditemukan");
      }

      const result = await response.json();
      setData(result.main);
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      } else {
        console.error("Terjadi error yang tidak diketahui");
      }
    }
  };
  return (
    <div className="p-10 flex justify-center items-center min-h-screen gap-5">
      <input onChange={(e) => setCity(e.target.value)} className="border p-2" />
      <button
        onClick={fetchWeather}
        className="border p-2 rounded-full py-1 px-3 bg-amber-500 hover:bg-amber-300"
      >
        Search
      </button>

      {data && <p>Temperature : {data.temp}^C</p>}
    </div>
  );
}

export default App;
