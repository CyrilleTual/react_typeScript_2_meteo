import style from "./App.module.css";
import loader from "./assets/loader.svg";
import { useState, useEffect } from "react";
import browser from "./assets/browser.svg";

type datasProps = {
  city: string;
  country: string;
  temperature: number;
  weather: string;
} | null;

type errorInfoProps = {
  msg: string,
} | null; 
 

function App() {
  const APIKEY: string | undefined = process.env.REACT_APP_WEATER_API_KEY;
  const [status, setStatus] = useState<string|null>(null);
  const [datas, setDatas] = useState<datasProps>(null);
  const [errorInfo, setErrorInfo] = useState<errorInfoProps>(null);

  useEffect(() => {
    const api = async () => {
      try {
        const data = await fetch(
          `http://api.airvisual.com/v2/nearest_city?key=${APIKEY}`,
          {
            method: "GET",
          }
        );

        if (!data.ok) {
          throw new Error(
            `HTTP error! Status: ${data.status}, ${data.statusText}`
          );
        }

        const jsonData = await data.json();

        setStatus(jsonData.status);
        if (jsonData.status === "success") {
          setDatas({
            city: jsonData.data.city,
            country: jsonData.data.country,
            temperature: jsonData.data.current.weather.tp,
            weather: jsonData.data.current.weather.ic,
          });
        }
      } catch (error: any) {
        setErrorInfo({ msg: error.message || "An error occurred." });
      }
    };

    api();
  }, [APIKEY]);

  return (
    <main>
      <div
        className={`${style.loader_container} ${
          status !== "success" && !errorInfo && style.active
        } `}
      >
        <img src={loader} alt="loading" />
      </div>

      {status === "success" && datas && (
        <>
          <p className={style.city_name}>{datas.city}</p>
          <p className={style.country_name}>{datas.country}</p>
          <p className={style.temperature}>{datas.temperature}°c</p>
          <div className={style.info_icon_container}>
            <img src={`icons/${datas.weather}.svg`} alt="weather icon" />
          </div>
        </>
      )}
      {errorInfo && !datas && (
        <>
          <p className={style.error_info}>{errorInfo.msg}</p>
          <img src={browser} alt="illustration erreur" />
        </>
      )}
    </main>
  );
}

export default App;
