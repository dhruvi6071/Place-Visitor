import { useState, useEffect } from "react";

import Places from "./Places.jsx";

// In React use of localStorage to store and retrieve data in the browser. Use of localStorage.getItem() to retrieve stored data:

// async await is not implemented for react components.

// const places = localStorage.getItem("places");

export default function AvailablePlaces({ onSelectPlace }) {
  const [availablePlaces, setAvailablePlaces] = useState([]);
  // fetch is provided directly by browser and it is used to send http request on site.
  useEffect(() => {
    fetch("http://localhost:3000/places")
      .then((response) => {
        return response.json();
      })
      .then((resData) => {
        setAvailablePlaces(resData.places);
      });
  }, []);

  //  for above code we need to use useEffect in order to avoid the conflict of infinite loop which can be generated.
  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
