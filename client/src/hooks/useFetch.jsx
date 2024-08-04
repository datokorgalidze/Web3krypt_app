import { useEffect, useState } from "react";

const APIKEY = import.meta.env.VITE_GIPHY_KEY;

const useFetch = ({ keyword }) => {
  const [gifUrl, setGifUrl] = useState("");

  const fetchGifs = async () => {
    try {
     
      const response = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=${APIKEY}&q=${keyword.split(" ").join("")}&limit=1`);
      const { data } = await response.json();
   

      if (data.length > 0) {
        setGifUrl(data[0]?.images?.downsized_medium.url);
      } else {
        setGifUrl("https://acegif.com/wp-content/uploads/gif-shaking-head-38.gif");
      }
    } catch (error) {
      console.error('Error fetching GIF:', error);
      setGifUrl("https://acegif.com/wp-content/uploads/gif-shaking-head-38.gif");
    }
  };

  useEffect(() => {
    if (keyword) fetchGifs();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keyword]);

  return gifUrl;
};

export default useFetch;



