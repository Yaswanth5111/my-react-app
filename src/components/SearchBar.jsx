import React, { useState, useEffect, useRef } from "react";
import { fetchAISuggestions } from "../../.git/Fake API";

const debounce = (func, delay) => {
  let timer;
  return (...args) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

const highlightMatch = (text, query) => {
  if (!query) return text;
  const regex = new RegExp(`(${query.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&')})`, "gi");
  const parts = text.split(regex);
  return parts.map((part, i) =>
    regex.test(part) ? (
      <mark key={i} style={{ backgroundColor: "#FF6B35", color: "white" }}>
        {part}
      </mark>
    ) : (
      part
    )
  );
};

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const containerRef = useRef(null);

  const fetchSuggestionsDebounced = useRef(
    debounce(async (q) => {
      if (!q) {
        setSuggestions([]);
        return;
      }
      const results = await fetchAISuggestions(q);
      setSuggestions(results);
      setShowDropdown(true);
    }, 300)
  ).current;

  useEffect(() => {
    fetchSuggestionsDebounced(query);
  }, [query, fetchSuggestionsDebounced]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion);
    setShowDropdown(false);
  };

  return (
    <div ref={containerRef} style={{ position: "relative", width: "100%", maxWidth: "400px", marginBottom: "1rem" }}>
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Search products..."
        style={{
          width: "100%",
          padding: "0.5rem 1rem",
          borderRadius: "8px",
          border: "1px solid #ccc",
          fontSize: "1rem",
          outline: "none",
        }}
        onFocus={() => {
          if (suggestions.length > 0) setShowDropdown(true);
        }}
      />
      {showDropdown && suggestions.length > 0 && (
        <ul
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            backgroundColor: "white",
            border: "1px solid #ccc",
            borderRadius: "0 0 8px 8px",
            maxHeight: "200px",
            overflowY: "auto",
            zIndex: 1000,
            marginTop: "2px",
            padding: 0,
            listStyle: "none",
          }}
        >
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              style={{
                padding: "0.5rem 1rem",
                cursor: "pointer",
                borderBottom: "1px solid #eee",
              }}
              onMouseDown={(e) => e.preventDefault()} // Prevent input blur on click
            >
              {highlightMatch(suggestion, query)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
