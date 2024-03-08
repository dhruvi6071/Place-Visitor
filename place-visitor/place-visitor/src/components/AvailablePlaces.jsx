import { useState } from "react";

import Places from "./Places.jsx";
import { response } from "express";

// In React use of localStorage to store and retrieve data in the browser. Use of localStorage.getItem() to retrieve stored data:

// async await is not implemented for react components.

const places = localStorage.getItem("places");

export default function AvailablePlaces({ onSelectPlace }) {
  const [AvailablePlaces, setAvailablePlaces] = useState([]);
  // fetch is provided directly by browser and it is used to send http request on site.

  fetch("http://localhost:3000/places").then((response) => {
    return response.json();
  })
  .then((resData) => {
    setAvailablePlaces( resData.places);
  });

  return (
    <Places
      title="Available Places"
      places={AvailablePlaces}
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
