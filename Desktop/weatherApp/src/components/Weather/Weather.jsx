import React from "react";
import PositionSvg from "../Svgs/PositionSvg";
import DefaultWeather from "../Svgs/DefaultWeather";
import Thermometer from "../Svgs/Thermometer";
import Time from "../Svgs/Time";
import Wind from "../Svgs/Wind";
import SpeedoMeter from "../Svgs/SpeedoMeter";
import Humidity from "../Svgs/Humidity";
import Sunny from "../Svgs/Sunny";
import Cloudy from "../Svgs/Cloudy";
import Thunder from "../Svgs/Thunder";
import Rainy from "../Svgs/Rainy";
import useWeatherStore from "../../store/weatherStore";
import { Card } from "react-bootstrap";

export const Weather = () => {
  const weather = useWeatherStore((state) => state);

  const displayIcon = () => {
    const defaultWidth = "200px";
    const defaultHeight = "200px";
    const number = weather.weather?.icon?.substring(0, 2);
    switch (number) {
      case "01":
        return <Sunny width={defaultWidth} height={defaultHeight} />;
      case "03":
      case "04":
        return <Cloudy width={defaultWidth} height={defaultHeight} />;
      case "10":
        return <Rainy width={defaultWidth} height={defaultHeight} />;
      case "11":
        return <Thunder width={defaultWidth} height={defaultHeight} />;
      default:
        return weather.weather?.icon ? (
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather.icon}@2x.png`}
            alt="Weather icon"
            width={defaultWidth}
            height={defaultHeight}
          />
        ) : null;
    }
  };

  const formatUnixTime = (unixTime) => {
    const date = new Date(unixTime * 1000);
    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  const formatCurrentTime = () => {
    return new Date().toLocaleString([], {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };
const InfoItem = ({ icon, title, value }) => (
  <div className="flex flex-col items-center border-r last:border-r-0 border-white/20 pr-4 last:pr-0">
    {icon}
    <div>{title}</div>
    <div>{value}</div>
  </div>
);
  return (
    <Card className="flex flex-col items-center bg-white/30 mt-4 text-white p-4 rounded-lg">
      {weather.isLoaded ? (
        <Card.Body>
          <Card.Title className="flex flex-col items-center text-lg font-bold">
            <div className="flex items-center gap-2">
              {weather.name}, {weather.sys.country}
              <PositionSvg color="rgba(255,255,255,0.7)" />
            </div>
            <div className="flex justify-center items-center text-xs mt-8 opacity-60 gap-2">
              {formatCurrentTime()}
              <Time width="15px" height="15px" />
            </div>
          </Card.Title>
          <Card.Text
            as="div"
            className="flex flex-col items-center justify-evenly "
          >
            <div>{displayIcon()}</div>
            <div className="flex items-center text-5xl mb-4 mt-10 ">
              <div>{weather.main.feels_like} °C</div>
              <Thermometer />
            </div>
            <div>
              {getGreeting()} {weather.name}
            </div>
            <div className="flex flex-wrap  justify-center bg-black/30 p-4 mt-14 rounded-xl text-sm gap-20">
              <InfoItem
                icon={<DefaultWeather color="#fff" />}
                title="Sunrise"
                value={formatUnixTime(weather.sys.sunrise)}
              />
              <InfoItem
                icon={<Wind />}
                title="Wind"
                value={`${weather.wind.speed} m/s`}
              />
              <InfoItem
                icon={<SpeedoMeter color="#fff" />}
                title="Pressure"
                value={`${weather.main.pressure} Pa`}
              />
              <InfoItem
                icon={<Humidity color="#fff" />}
                title="Humidity"
                value={`${weather.main.humidity}%`}
              />
              <InfoItem
                icon={<Thermometer color="#fff" width="25px" height="25px" />}
                title="Temp Max"
                value={`${weather.main.temp_max} °C`}
              />
            </div>
          </Card.Text>
        </Card.Body>
      ) : (
        <Card.Body>
          <Card.Title>Please choose your city.</Card.Title>
        </Card.Body>
      )}
    </Card>
  );
};


