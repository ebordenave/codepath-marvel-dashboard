import "./SearchBar.css";
import { useEffect, useState } from "react";
import axios from "axios";

export const SearchBar = ({
  placeholder,
  onSelect,
  updateTotalCharacters,
  updateTotalComics,
  characterAvailable,
}) => {
  const [searchInput, setSearchInput] = useState("");
  const [totalChars, setTotalChars] = useState(0);
  const [characterData, setCharacterData] = useState(null);
  const [filteredData, setFilteredData] = useState([]);
  const [totalComics, setTotalComics] = useState(0);

  const API_KEY = import.meta.env.VITE_MARVEL_API_KEY;
  const HASH = import.meta.env.VITE_MARVEL_HASH;
  const TS = import.meta.env.VITE_TS;

  const BASE_URL = `https://gateway.marvel.com`;
  const URL = `${BASE_URL}/v1/public/characters?apikey=${API_KEY}&ts=${TS}&hash=${HASH}&limit=100`;

  const fetchTotalComics = async () => {
    try {
      const res = await axios.get(
        `${BASE_URL}/v1/public/comics?apikey=${API_KEY}&ts=${TS}&hash=${HASH}`,
      );
      const total = res.data.data.total;
      setTotalComics(total);
      console.log(total);
    } catch (e) {
      console.error("Error fetching Total Comics: ", e);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(URL);
        const responseData = response.data.data;
        // Total Chars
        setTotalChars(responseData.total);
        updateTotalCharacters(responseData.total);
        // Total Comics
        setTotalComics(responseData.total);
        updateTotalComics(responseData.total);
        // Character Data
        setCharacterData(responseData.results);
        setFilteredData(responseData.results);
      } catch (e) {
        console.error("Error fetching data:", e);
      }
    };
    fetchData();
    fetchTotalComics();
  }, []);

  const handleChange = (event) => {
    const searchInputValue = event.target.value;
    setSearchInput(searchInputValue);
    const newFilter = characterData.filter((value) => {
      return value.name.toLowerCase().includes(searchInputValue.toLowerCase());
    });
    setFilteredData(searchInputValue === "" ? [] : newFilter);
  };

  const handleSelect = async (id, name) => {
    const characterURL = `${BASE_URL}/v1/public/characters/${id}?apikey=${API_KEY}&ts=${TS}&hash=${HASH}`;
    try {
      const response = await axios.get(characterURL);
      let characterDescription = response.data.data.results[0].description;
      let characterAvailable = response.data.data.results[0].comics.available;
      console.log(characterAvailable);
      if (characterDescription === "") {
        characterDescription = "Description not available";
      }
      const characterThumbnail = response.data.data.results[0].thumbnail;
      const thumbnailUrl = `${characterThumbnail.path}.${characterThumbnail.extension}`;
      onSelect(name, characterDescription, thumbnailUrl, characterAvailable);
    } catch (error) {
      console.log("Error fetching character details: ", error);
    }
  };

  return (
    <div className="search">
      <form className="search-inputs" onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          placeholder={placeholder}
          onChange={handleChange}
          value={searchInput}
        />
        <div className="search-icon"></div>
      </form>
      {filteredData && filteredData.length > 0 && (
        <div className="data-result">
          {searchInput &&
            filteredData.slice(0, 100).map((value, index) => {
              return (
                <div className="data-item" key={index}>
                  <a
                    key={value.index}
                    onClick={() => handleSelect(value.id, value.name)}
                  >
                    {value.name}
                  </a>
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
};