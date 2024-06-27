import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { fetchDataFromApi } from "../utils/api";
import { Context } from "../context/contextApi";
import LeftNav from "./LeftNav";
import SearchResultVideoCard from "./SearchResultVideoCard";
import SearchResultShortCard from "./SearchResultShortCard";

const SearchResults = () => {
  const [results, setResults] = useState([]);
  const { searchQuery } = useParams();
  const { setLoading } = useContext(Context);

  useEffect(() => {
    document.getElementById("root").classList.remove("custom-h");
    fetchSearchResults();
  }, [searchQuery]);

  const fetchSearchResults = async () => {
    setLoading(true);
    try {
      const data = await fetchDataFromApi("search", { query: searchQuery });
      console.log("API Response:", data);
      if (data && Array.isArray(data.data)) {
        setResults(data.data);
      } else {
        console.error("Unexpected API response structure:", data);
        setResults([]);
      }
    } catch (error) {
      console.error("Error fetching search results:", error);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-row h-[calc(100%-56px)]">
      <LeftNav />
      <div className="grow w-[calc(100%-240px)] h-full overflow-y-auto bg-black">
        <div className="grid grid-cols-1 gap-4 p-5">
          {results.length > 0 ? (
            results.map((item) => {
              if (item.type === "video") {
                return (
                  <SearchResultVideoCard key={item.videoId} video={item} />
                );
              } else if (item.type === "short") {
                return (
                  <SearchResultShortCard key={item.videoId} short={item} />
                );
              } else {
                return null;
              }
            })
          ) : (
            <p className="text-white">Loading.....</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchResults;
