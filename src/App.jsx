import React from "react";
import { SearchBar } from "./components/SearchBar/SearchBar";
import { Wallpaper } from "./components/Wallpaper/Wallpaper";
import { Weather } from "./components/Weather/Weather";

import { motion } from "framer-motion";

function App() {
  return (
    <div className="App m-6">
      <Wallpaper />
      <motion.div
        className={"container"}
        initial={{
          x: "200vw",
        }}
        animate={{
          x: 0,
        }}
        transition={{
          duration: 1,
          ease: "easeInOut",
        }}
      >
        <SearchBar />
        <Weather />
      </motion.div>
    </div>
  );
}

export default App;
