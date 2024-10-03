import { Autocomplete, Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import useWeatherStore from "../../store/weatherStore";
import PositionSvg from "../Svgs/PositionSvg";


export const SearchBar = () => {
  const GEO_API_KEY = "5fa3b69d2d6541fe9c1c90af2a0f9d72";
  const WEATHER_API_KEY = "cbb7da2463b169417c4bd6896d2373d9";
  const setData = useWeatherStore((state) => state.setData); // Zustand action
  const resetData = useWeatherStore((state) => state.resetData); // Zustand action
  const [cities, setCities] = useState([]);
  const [unity] = useState("metric");
  const [geoLocation, setGeoLocation] = useState(undefined);
  const [isCurrentLocation, setIsCurrentLocation] = useState(false);

  const getGeoLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      setIsCurrentLocation(true);
      setGeoLocation({
        lon: position.coords.longitude,
        lat: position.coords.latitude,
      });
    });
  };

  useEffect(() => {
    getGeoLocation();
  }, []);

  useEffect(() => {
    getData();
  }, [geoLocation]);

  const handleInputChange = (e) => {
    const { value } = e.currentTarget;
    fetch(
      `https://api.geoapify.com/v1/geocode/autocomplete?text=${value}&type=city&format=json&apiKey=${GEO_API_KEY}`
    )
      .then((response) => response.json())
      .then((json) =>
        setCities(
          json.results?.map((data) => {
            const { lat, lon, city, country, formatted } = data;
            return { lat, lon, city, country, formatted };
          })
        )
      );
  };

  const getData = () => {
    if (geoLocation) {
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${geoLocation.lat}&units=${unity}&lon=${geoLocation.lon}&appid=${WEATHER_API_KEY}`
      )
        .then((response) => response.json())
        .then((json) => {
          const { clouds, main, name, sys, weather, wind } = json;
          setData({ clouds, main, name, sys, weather, wind });
        });
    }
  };

  const handleAutocompleteSelect = (e, value) => {
    if (value !== null) {
      const { lon, lat } = value;
      setIsCurrentLocation(false);
      setGeoLocation({
        lon,
        lat,
      });
    } else {
      resetData();
    }
  };

  return (
    <div className="flex gap-4 mx-auto my-8 ">
      <Autocomplete
        className="w-full bg-opacity-30 border-b-2 bg-white/30"
        clearOnBlur={false}
        onChange={handleAutocompleteSelect}
        getOptionLabel={(option) => option.formatted}
        renderInput={(params) => (
          <TextField
            onChange={handleInputChange}
            {...params}
            label={"Enter your city ..."}
            InputProps={{
              ...params.InputProps,
              className: "bg-transparent border-none",
            }}
          />
        )}
        options={cities || []}
      />

      <Button
        disabled={geoLocation === undefined || isCurrentLocation === true}
        variant="contained"
        onClick={() => getGeoLocation()}
      >
        <PositionSvg color={"#fff"} />
      </Button>
    </div>
  );
};
