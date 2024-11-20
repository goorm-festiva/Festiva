import { useState } from "react";
import styled from "styled-components";
import { IoSearch } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => setInputValue(e.target.value);

  const handleSearch = () => {
    if (inputValue.trim()) {
      navigate("/", { state: { inputValue } });
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <SearchBarDiv>
      <Search
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder="검색어를 입력하세요..."
      />
      <IoSearch
        size="20"
        onClick={handleSearch}
        style={{ cursor: "pointer" }}
      />
    </SearchBarDiv>
  );
};

const SearchBarDiv = styled.div`
  width: 230px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px 10px;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 5px;
`;

const Search = styled.input`
  background: none;
  color: white;
  border: none;
  &:focus {
    outline: none;
  }
`;

export default SearchBar;
