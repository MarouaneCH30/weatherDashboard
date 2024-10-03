import {create} from "zustand";

const useWeatherStore = create((set) => ({
  clouds: undefined,
  main: {
    feels_like: undefined,
  },
  name: undefined,
  sys: {
    country: undefined,
  },
  weather: undefined,
  wind: {
    speed: undefined,
  },
  isLoaded: false,

  setData: ({ clouds, main, name, sys, weather, wind }) => {
    set(() => ({
      clouds,
      main,
      name,
      sys,
      weather: weather[0],
      wind,
      isLoaded: true,
    }));
  },

  resetData: () => {
    set(() => ({
      isLoaded: false,
    }));
  },
}));

export default useWeatherStore;
