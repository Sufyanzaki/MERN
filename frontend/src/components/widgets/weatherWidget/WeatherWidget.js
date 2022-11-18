import axios from "axios";
import React, { useEffect, useState } from "react";
import { images } from "../../../utils/imageParser";
import Spinner from "../../Layouts/Loader/Loader";
import "./WeatherWidget.css"

const WeatherWidget = () => {

  const [loading, setloading] = useState(false);
  const [details, setDetails] = useState({
    city:'', country : '', weather:'', temp:''
  })

  useEffect(() => {
    setloading(true)
    axios.get('http://api.openweathermap.org/data/2.5/forecast?lat=30.157457&lon=71.524918&appid=6025d18f37856c5e40d969982ff92e10')
      .then(res => {setDetails({
        city:res.data.city.name, country:res.data.city.country, temp:res.data.list[0].main.temp
      });setloading(false) }).catch(err => { console.log(err); setloading(false) })
  }, [])

  const months = ['Jan', 'Feb', 'Mar', 'April', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']

  var a = new Date();
  const index = a.getMonth();

  const [clik,] = useState({
    date: a.getDate(),
    month: months[index]
  })

  return (
    <div className="widget">
      <div className="weather-widget low-opacity bluesh">
        <div
          className="bg-image"
          style={{ backgroundImage: `url(${images['weather.jpg']})` }}
        >
        </div>
        {loading ? <Spinner/>: 
        <>
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
          <span className="weather-tem">{details && details.temp}</span>
          <h3>
            <i>{details && details.city},{details && details.country}</i>
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
        </>
        }
      </div>
    </div>
  );
};

export default WeatherWidget;
