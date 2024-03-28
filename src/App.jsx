import "./App.css";
import { SearchBar } from "./components/SearchBar/SearchBar.jsx";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  // const [charactersList, setCharactersList] = useState([]);

  let API_KEY = import.meta.env.VITE_MARVEL_API_KEY;
  let HASH = import.meta.env.VITE_MARVEL_HASH;
  let TS = import.meta.env.VITE_TS;

  useEffect(() => {
    fetchCharactersData();
    //this is console logging twice, once on mount and once when called
  }, []);

  let BASE_URL = `https://gateway.marvel.com`;
  let URL = `${BASE_URL}/v1/public/characters?apikey=${API_KEY}&ts=${TS}&hash=${HASH}`;

  const fetchCharactersData = async () => {
    try {
      let response = await axios.get(URL);
      let responseData = response.data.data.results;
      setData(responseData);
    } catch (e) {
      setError("Error Reaching API Characters List");
      console.log(error);
      return null;
    }
  };
  // Check Contents displayed in console, will display only 20/1564
  console.log(data);

  return (
    <>
      <div className="wrapper">
        <div className="box a"></div>
        <div className="box b">B</div>
        <div className="box c">
          <SearchBar data={data} placeholder="Search Here" />
        </div>

        <div className="box d">D</div>
        <div className="box e">E</div>
      </div>
    </>
  );
}

export default App;