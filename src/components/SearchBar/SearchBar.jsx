import "./SearchBar.css";
import { useState } from "react";

export const SearchBar = ({ data, placeholder }) => {
  // const [searchInput, setSearchInput] = useState("");
  // const [searchResults, setSearchResults] = useState([]);
  // const [filteredData, setFilteredData] = useState([]);

  // const handleSearch = (e) => {
  //   e.preventDefault();
  //   setSearchInput(e.target.value);
  //
  //   const results = data.filter((item) => {
  //     item.name.toLowerCase().includes(searchInput.toLowerCase());
  //   });

  // setSearchInput(results);
  // };
  return (
    <div className="search">
      <div className="search-inputs">
        <input type="text" placeholder={placeholder} />
        <div className="search-con"></div>
      </div>
      <div className="data-result">
        {data.map((value, index) => {
          return (
            <a className="data-item" key={index}>
              <p>{value.name}</p>
            </a>
          );
        })}
      </div>
    </div>
  );
};