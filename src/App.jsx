import "./App.css";
import { SearchBar } from "./components/SearchBar/SearchBar.jsx";
import { Biography } from "./components/MainDashboard/Biography.jsx";
import { useState } from "react";
import axios from "axios";

function App() {
  const [characterName, setCharacterName] = useState(null);
  const [characterThumbnail, setCharacterThumbnail] = useState("");
  const [characterDescription, setCharacterDescription] =
    useState("placeholder");
  const [totalCharacters, setTotalCharacters] = useState(0);
  const [totalComics, setTotalComics] = useState(0);
  const [characterAvailable, setCharacterAvailable] = useState(0);

  const [mostAppearedCharacter, setMostAppearedCharacter] = useState(null);
  const [leastAppearedCharacter, setLeastAppearedCharacter] = useState(null);

  const handleSelectCharacter = (name, description, thumbnail, available) => {
    setCharacterName(name);
    setCharacterDescription(description);
    setCharacterThumbnail(thumbnail);
    setCharacterAvailable(available);
  };

  return (
    <div className="wrapper">
      <div className="grid-container">
        <div className="box a">A</div>
        <div className="box b">
          <Biography
            characterName={characterName}
            characterDescription={characterDescription}
            characterThumbnail={characterThumbnail}
          />
        </div>
        <div className="box c">
          <SearchBar
            placeholder="Search for 'Avengers'"
            onSelect={handleSelectCharacter}
            updateTotalCharacters={setTotalCharacters}
            updateTotalComics={setTotalComics}
            characterAvailable={characterAvailable}
          />
        </div>
        <div className="box d">
          Total Number of Marvel Characters: {totalCharacters}
        </div>
        <div className="box e">
          Character Appearances={characterAvailable}
          <br></br>Total Comics={totalComics}
          <br></br> Mean={" "}
          {((characterAvailable / totalComics) * 100).toFixed(2) + "%"}
        </div>
        <div className="box f">F</div>
      </div>
    </div>
  );
}

export default App;