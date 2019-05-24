import React, { Component } from "react";
import axios from "axios";
import WeatherBox from "./components/weatherBox";
import Attribution from "./components/attribution";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: "",
      zipCode: "",
      weatherPicture: "",
      weatherDescription: "",
      temperature: "",
      humidity: "",
      hideBody: false,
      hideImage: true,
      hideLoadingMsg: true
    };
    this.handleUserInput = this.handleUserInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleUserInput(event) {
    event.preventDefault();
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${
          this.state.zipCode
        },us&units=metric&&APPID=${process.env.REACT_APP_SECRET_TOKEN}`
      )
      .then(res => {
        const weatherImage = res.data.weather.map(items => {
          return items.icon;
        });
        const weatherDescription = res.data.weather.map(items => {
          return items.description;
        });
        this.setState({
          location: res.data.name,
          weatherPicture: weatherImage,
          weatherDescription: `(${weatherDescription})`,
          temperature: `Current Temp: ${Math.trunc(
            (res.data.main.temp * 9) / 5 + 32
          )}°`,
          humidity: `Humidity: ${res.data.main.humidity}%`,
          hideBody: false,
          hideImage: false
        });
      })
      .catch(error => {
        if (error) {
          this.setState({
            location: "Please check your city or zipcode."
          });
        }
      });
  }

  getLocation = () => {
    if (navigator.geolocation) { //Load please wait message
        this.setState({
          hideLoadingMsg: false,
          hideBody: true
      })
      navigator.geolocation.getCurrentPosition(
        position => {
          if (position) {
            axios
              .get(
                `https://api.openweathermap.org/data/2.5/weather?us&units=metric&lat=${
                  position.coords.latitude
                }&lon=${position.coords.longitude}&APPID=${
                  process.env.REACT_APP_SECRET_TOKEN
                }`
              )
              .then(res => {
                const weatherImage = res.data.weather.map(items => {
                  return items.icon;
                });
                const weatherDescription = res.data.weather.map(items => {
                  return items.description;
                });
                this.setState({
                  location: res.data.name,
                  weatherPicture: weatherImage,
                  weatherDescription: `(${weatherDescription})`,
                  temperature: `Current Temp: ${Math.trunc(
                    (res.data.main.temp * 9) / 5 + 32
                  )}°`,
                  humidity: `Humidity: ${res.data.main.humidity}%`,
                  hideBody: false,
                  hideLoadingMsg: true,
                  hideImage: false
                });
              });
          }
        },
        error => {
          if (error) {
            this.setState({
              location: error.message,
              hideBody: false,
              hideLoadingMsg: true,
              hideImage: true
            });
          }
        }
      );
    } else {
      this.setState({
        location: "Geolocation is not supported by this browser."
      });
    }
  }

  render() {
    return (
      <div className="container text-center mt-3">
        <WeatherBox
          location={this.state.location}
          weatherPicture={`https://openweathermap.org/img/w/${
            this.state.weatherPicture
          }.png`}
          temperature={this.state.temperature}
          humidity={this.state.humidity}
          hideBody={this.state.hideBody}
          weatherDescription={this.state.weatherDescription}
          hideLoadingMsg={this.state.hideLoadingMsg}
          zipCode={this.state.zipCode}
          handleUserInput={this.handleUserInput}
          handleSubmit={this.handleSubmit}
          errorMessage={this.state.errorMessages}
          hideImage={this.state.hideImage}
          getLocation={this.getLocation}
        />
        <Attribution />
      </div>
    );
  }
}

export default App;
