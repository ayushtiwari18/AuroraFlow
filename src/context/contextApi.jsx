import React, { createContext, useState, useEffect } from "react";
import { fetchDataFromApi } from "../utils/api";

export const Context = createContext();

export const AppContext = (props) => {
  const [loading, setLoading] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
  const [selectCategories, setSelectCategories] = useState("New");
  const [mobileMenu, setMobileMenu] = useState(false);

  useEffect(() => {
    fetchSelectedCategoryData(selectCategories);
  }, [selectCategories]);

  const fetchSelectedCategoryData = async (query) => {
    setLoading(true);
    try {
      const res = await fetchDataFromApi("search", { query });

      if (Array.isArray(res.data)) {
        setSearchResult(res.data);
      } else {
        console.error("Unexpected API response structure:", res);
        setSearchResult([]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setSearchResult([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Context.Provider
      value={{
        loading,
        setLoading, // Add this line
        searchResult,
        selectCategories,
        setSelectCategories,
        mobileMenu,
        setMobileMenu,
      }}
    >
      {props.children}
    </Context.Provider>
  );
};
