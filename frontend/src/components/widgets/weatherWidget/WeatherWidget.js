import React, { useState } from "react";
import { images } from "../../../utils/imageParser";
import "./WeatherWidget.css"

const WeatherWidget = () => {

  const months = ['Jan', 'Feb', 'Mar', 'April', 'May', 'June', 'July', 'Aug','Sept', 'Oct', 'Nov', 'Dec']

  var a = new Date();
  const index = a.getMonth();
  
  const [clik,] = useState({
    date:a.getDate(),
    month:months[index]
  })

  return (
        <div className="widget">
      <div className="weather-widget low-opacity bluesh">
        <div
          className="bg-image"
          style={{backgroundImage:`url(${images['weather.jpg']})`}}
        ></div>
        <span className="refresh-content">
          <i className="fa fa-refresh"></i>
        </span>
        <div className="weather-week">
          <div className="icon sun-shower">
            <div className="cloud"></div>
            <div className="sun">
              <div className="rays"></div>
            </div>
            <div className="rain"></div>
          </div>
        </div>
        <div className="weather-infos">
          <span className="weather-tem">25</span>
          <h3>
            Cloudy Skyes<i>Sicklervilte, New Jersey</i>
          </h3>
          <div className="weather-date skyblue-bg">
            <span>
              {clik.month}<strong>{clik.date}</strong>
            </span>
          </div>
        </div>
        <div className="monthly-weather">
          <ul>
            <li>
              <span>Sun</span>
              <a href="https://google.com" title="">
                <i className="wi wi-day-sunny"></i>
              </a>
              <em>40°</em>
            </li>
            <li>
              <span>Mon</span>
              <a href="https://google.com" title="">
                <i className="wi wi-day-cloudy"></i>
              </a>
              <em>10°</em>
            </li>
            <li>
              <span>Tue</span>
              <a href="https://google.com" title="">
                <i className="wi wi-day-hail"></i>
              </a>
              <em>20°</em>
            </li>
            <li>
              <span>Wed</span>
              <a href="https://google.com" title="">
                <i className="wi wi-day-lightning"></i>
              </a>
              <em>34°</em>
            </li>
            <li>
              <span>Thu</span>
              <a href="https://google.com" title="">
                <i className="wi wi-day-showers"></i>
              </a>
              <em>22°</em>
            </li>
            <li>
              <span>Fri</span>
              <a href="https://google.com" title="">
                <i className="wi wi-day-windy"></i>
              </a>
              <em>26°</em>
            </li>
            <li>
              <span>Sat</span>
              <a href="https://google.com" title="">
                <i className="wi wi-day-sunny-overcast"></i>
              </a>
              <em>30°</em>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default WeatherWidget;
