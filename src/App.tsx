// import { useState } from "react";

// interface WeatherData {
//   temp: number;
//   name: string;
//   humidity: number;
//   wind: number;
//   icon: string;
//   description: string;
// }

// function App() {
//   const API_URL = import.meta.env.VITE_API_URL;
//   const API_KEY = import.meta.env.VITE_API_KEY;

//   const [city, setCity] = useState("");
//   const [data, setData] = useState<WeatherData | null>(null);
//   const [error, setError] = useState<string | null>(null);
//   const [loading, setLoading] = useState(false);

//   const handleEnterPress = (e: React.KeyboardEvent) => {
//     if (e.key == "Enter") {
//       fetchWeather();
//       console.log("Enter Pressed");
//     }
//   };

//   const fetchWeather = async () => {
//     try {
//       setLoading(true);
//       setError(null);
//       const response = await fetch(
//         `${API_URL}?q=${city}&appid=${API_KEY}&units=metric`,
//       );

//       if (!response.ok) {
//         throw new Error("Kota tidak ditemukan");
//       }

//       const result = await response.json();

      // await new Promise((resolve) => setTimeout(resolve, 1000));
      
      //       const weatherData: WeatherData = {
        //         name: result.name,
//         temp: result.main.temp,
//         humidity: result.main.humidity,
//         wind: result.wind.speed,
//         icon: result.weather[0].icon,
//         description: result.weather[0].description,
//       };
//       console.log(result);
//       setData(weatherData);
//     } catch (error) {
//       if (error instanceof Error) {
//         setError(error.message);
//       } else {
//         console.error("Terjadi error yang tidak diketahui");
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   // useEffect(() => {
//   //   if (!city) return;

//   //   const timer = setTimeout(() => {
//   //     fetchWeather();
//   //   }, 500);

//   //   return () => clearTimeout(timer);
//   // }, [city]);

//   return (
  //     <div className="p-10 flex flex-col justify-center items-center min-h-screen gap-5">
  //       <div className="">
//         <input
//           value={city}
//           onChange={(e) => setCity(e.target.value)}
//           onKeyDown={handleEnterPress}
//           className="border p-2 mr-5 rounded-md outline-none"
//           placeholder="Masukkan nama kota"
//         />
//         <button
//           onClick={fetchWeather}
//           className="border p-2 rounded-full py-1 px-3 bg-amber-500 hover:bg-amber-300"
//         >
//           Search
//         </button>
//       </div>
//       <div className="bg-amber-400 p-5 rounded-lg min-w-2xs">
//         {data ? (
//           <div>
//             {loading && <p>Loading...</p>}
//             {error && <p>{error}</p>}
//             {data && <p>Kota : {data.name}</p>}
//             {data && <p>Temperature : {data.temp}°C</p>}
//             {data && <p>Humidity : {data.humidity}</p>}
//             {data && <p>Wind Speed : {data.wind}</p>}
//             {data && <p>Icon : {data.icon}</p>}
//             {data && <p>Description : {data.description}</p>}
//           </div>
//         ) : (
//           "Silahkan Lakukan Pencarian"
//         )}
//       </div>
//     </div>
//   );
// }

// export default App;



import { Loader, Loader2, Search } from "lucide-react";
import { useState } from "react";

interface WeatherData {
  temp: number;
  name: string;
  humidity: number;
  wind: number;
  icon: string;
  description: string;
}

function App() {
  const API_URL = import.meta.env.VITE_API_URL;
  const API_KEY = import.meta.env.VITE_API_KEY;

  const [city, setCity] = useState("");
  const [data, setData] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchWeather();
  };

  const fetchWeather = async () => {
    // Validasi input kosong
    if (!city.trim()) {
      setError("Masukkan nama kota terlebih dahulu");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
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
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const weatherData: WeatherData = {
        name: result.name,
        temp: result.main.temp,
        humidity: result.main.humidity,
        wind: result.wind.speed,
        icon: result.weather[0].icon,
        description: result.weather[0].description,
      };
      
      setData(weatherData);
      
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Terjadi kesalahan yang tidak diketahui");
      }
      setData(null); // Clear previous data on error
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-10 flex flex-col justify-center items-center min-h-screen gap-5">
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
            <Loader2 className="animate-spin"/>
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
            <p className="text-4xl font-bold text-center">{Math.round(data.temp)}°C</p>
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