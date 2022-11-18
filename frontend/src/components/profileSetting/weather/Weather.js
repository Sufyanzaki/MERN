import React from "react";
import Select from "react-select";

const Weather = () => {
  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];

  return (
    <div className="set-title">
      <h5>Weather Widget Setting</h5>
      <span>Set your weather widget or page setting.</span>
      <div className="mesg-seting">
        <div className="set-title">
          <h6>Country &amp; Timezone</h6>
          <span>Select your Country Time Zone</span>
        </div>
        {/* <Select options={options}></Select> */}
        <div className="set-title">
          <h6>Temperature Unit</h6>
        </div>
        {/* <Select options={options}></Select> */}
        <div className="set-title">
          <h6>Show Extended forecast</h6>
        </div>
        <div className="checkbox">
          <label>
            <input type="checkbox" checked="checked" />
            <i className="check-box"></i>
            Show Extended Forecast on Widget.
          </label>
          <p>
            <a href='https://google.com' title="">
              learn more
            </a>
          </p>
        </div>
        <div className="set-title">
          <h6>Forecast Days</h6>
        </div>
        <Select options={options}></Select>
        <p>
          you will always get Daily notifications you have turned on for
          individual.
        </p>
        <div>
          <form>
            <button className="main-btn" data-ripple="" type="submit">
              Save
            </button>
            <button className="main-btn3" data-ripple="" type="submit">
              Cancel
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Weather;
