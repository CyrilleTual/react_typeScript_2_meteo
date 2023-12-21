import React from "react";
import style from "./App.module.css";
import loader from "./assets/loader.svg";
//import img1 from"./assets/icons2/cloudy-day-1.svg"

function App() {
  return (
    <main>
      <div className={style.loader_container}>
        <img src={loader} alt="loading" />
      </div>
      <p className={style.city_name}>Paris</p>
      <p className={style.country_name}>France</p>
      <p className={style.temperature}>17°</p>
      <div className={style.info_icon_container}>
        <img src={require("./assets/icons/50n.svg").default} alt="" />
      </div>
    </main>
  );
}

export default App;
