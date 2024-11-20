import React, { useState } from "react";

const SearchSuggestions = () => {
    // Sample data (e.g., fetched from an API)
    const items = [
        "Apple",
        "Banana",
        "Orange",
        "Mango",
        "Grapes",
        "Blueberry",
        "Strawberry",
    ];

    // State for the search input and filtered suggestions
    const [searchTerm, setSearchTerm] = useState("");
    const [suggestions, setSuggestions] = useState([]);

    // Handle search input changes
    const handleChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);

        // Filter suggestions based on the input
        if (value.length > 0) {
            const filtered = items.filter((item) =>
                item.toLowerCase().startsWith(value.toLowerCase())
            );
            setSuggestions(filtered);
        } else {
            setSuggestions([]); // Clear suggestions if input is empty
        }
    };

    // Handle suggestion click
    const handleSuggestionClick = (suggestion) => {
        setSearchTerm(suggestion); // Set the clicked suggestion as the input
        setSuggestions([]); // Clear suggestions
    };

    return (
        <div style={{ width: "300px", margin: "50px auto" }}>
            <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={handleChange}
                style={{ width: "100%", padding: "10px", fontSize: "16px" }}
            />
            {/* Suggestions dropdown */}
            {suggestions.length > 0 && (
                <ul
                    style={{
                        listStyleType: "none",
                        margin: 0,
                        padding: 0,
                        border: "1px solid #ccc",
                        maxHeight: "150px",
                        overflowY: "auto",
                    }}
                >
                    {suggestions.map((suggestion, index) => (
                        <li
                            key={index}
                            style={{
                                padding: "10px",
                                cursor: "pointer",
                                background: "#f9f9f9",
                            }}
                            onClick={() => handleSuggestionClick(suggestion)}
                        >
                            {suggestion}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default SearchSuggestions;
