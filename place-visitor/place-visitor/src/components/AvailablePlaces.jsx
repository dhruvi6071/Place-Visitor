import { useState, useEffect } from "react";

import Places from "./Places.jsx";
import Error from "./Error.jsx";

// In React use of localStorage to store and retrieve data in the browser. Use of localStorage.getItem() to retrieve stored data:

// async await is not implemented for react components.

// const places = localStorage.getItem("places");

export default function AvailablePlaces({ onSelectPlace }) {
  const [isFetching, setIsFetching] = useState(false);
  const [availablePlaces, setAvailablePlaces] = useState([]);
  const [error, setError] = useState();
  // fetch is provided directly by browser and it is used to send http request on site.
  useEffect(() => {
    async function fetchPlaces() {
      setIsFetching(true);
      try {
        const response = await fetch("http://localhost:3000/places");
        const resData = await response.json();

        if (!response.ok) {
          // const error = new Error("Failed to fetch");
          // throw error;

          throw new Error("Failed to fetch");
        }
        setAvailablePlaces(resData.places);
        //success : 200 code   failure : 400, 500
      } catch (error) {
        setError({message: error.message || "Could not find places please try again later"});
      }

      setIsFetching(false);
    }

    //   fetch("http://localhost:3000/places")
    //     .then((response) => {
    //       return response.json();
    //     })
    //     .then((resData) => {
    //       setAvailablePlaces(resData.places);
    //     });

    fetchPlaces();
  }, []);

  if(error) {
    return <Error title="An error occured!" message={error.message} />
  }
  //  for above code we need to use useEffect in order to avoid the conflict of infinite loop which can be generated.
  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      isLoading={isFetching}
      loadingText="Fetching place data"
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
