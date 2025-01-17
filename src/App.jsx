import React from "react";
import Header from "./components/Header";
import Feed from "./components/Feed";
import SearchResults from "./components/SearchResults";
import VideoCard from "./components/VideoCard";
import SearchResultVideoCard from "./components/SearchResultVideoCard";
import SuggestionVideoCard from "./components/SuggestionVideoCard";
import VideoDetails from "./components/VideoDetails";
import { AppContext } from "./context/contextApi";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <AppContext>
      <BrowserRouter>
        <div className="flex flex-col h-full">
          <Header />
          <Routes>
            <Route path="/" exact element={<Feed />} />
            <Route path="/search/:searchQuery" element={<SearchResults />} />

            <Route path="/video/:id" element={<VideoDetails />} />
          </Routes>
        </div>
      </BrowserRouter>
    </AppContext>
  );
};

export default App;
