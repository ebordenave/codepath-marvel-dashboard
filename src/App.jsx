// import { useState } from "react";
import "./App.css";
import { SearchBar } from "./components/SearchBar/SearchBar.jsx";

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <div className="wrapper">
        <div className="box a"></div>
        <div className="box b">B</div>
        <div className="box c">
          <SearchBar />
        </div>

        <div className="box d">D</div>
        <div className="box e">E</div>
      </div>
    </>
  );
}

export default App;