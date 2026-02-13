import { Loader, Loader2, Search } from "lucide-react";
import { useState } from "react";
import { fetchWeather } from "./lib/fetch";

interface WeatherData {
  temp: number;
  name: string;
  humidity: number;
  wind: number;
  icon: string;
  description: string;
}

function App() {
  const [city, setCity] = useState("");
  const [data, setData] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!city.trim()) {
      setError("Masukkan nama kota terlebih dahulu");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const weatherData = await fetchWeather(city);
      // console.log(weatherData)
      setData({
        temp: weatherData.main.temp,
        name: weatherData.name,
        humidity: weatherData.main.humidity,
        wind: weatherData.wind.speed,
        icon: weatherData.weather[0].icon,
        description: weatherData.weather[0].description,
      });
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Terjadi kesalahan yang tidak diketahui");
      }
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-10 flex flex-col justify-center items-center min-h-screen gap-5 bg-violet-200">
      <form onSubmit={handleSubmit} className="flex gap-3">
        <input
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="border p-2 rounded-md outline-none focus:ring-2 focus:ring-amber-500"
          placeholder="Masukkan nama kota"
          disabled={loading}
        />
        <button
          type="submit"
          disabled={!city.trim() || loading}
          className="border p-2 rounded-full py-1 px-5 bg-amber-500 hover:bg-amber-400 disabled:bg-gray-300 disabled:cursor-not-allowed transition flex items-center gap-2"
        >
          {loading ? (
            <Loader className="animate-spin"></Loader>
          ) : (
            <Search size={20}></Search>
          )}
        </button>
      </form>

      <div className="bg-amber-400 p-6 rounded-lg min-w-75 min-h-82.5">
        {loading && (
          <div className="flex justify-center items-center gap-2">
            <Loader2 className="animate-spin" />
            <p>Loading ... </p>
          </div>
        )}

        {error && !loading && (
          <p className="text-red-700 text-center font-semibold">{error}</p>
        )}

        {data && !loading && !error && (
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-center">{data.name}</h2>
            <div className="flex justify-center">
              <img
                src={`https://openweathermap.org/img/wn/${data.icon}@2x.png`}
                alt={data.description}
                className="w-24 h-24"
              />
            </div>
            <p className="text-4xl font-bold text-center">
              {Math.round(data.temp)}°C
            </p>
            <p className="text-center capitalize">{data.description}</p>
            <div className="mt-4 space-y-1">
              <p>💧 Humidity: {data.humidity}%</p>
              <p>💨 Wind Speed: {data.wind} m/s</p>
            </div>
          </div>
        )}

        {!loading && !error && !data && (
          <p className="text-center text-gray-700">
            Silahkan lakukan pencarian
          </p>
        )}
      </div>
    </div>
  );
}

export default App;
