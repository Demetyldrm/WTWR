import React from "react";

const CurrentTemperatureUnitContext = React.createContext({
  currentTemperatureUnit: "",
  handleToggleSwitchState: () => {},
});

export default CurrentTemperatureUnitContext;
