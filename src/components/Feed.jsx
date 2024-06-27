import React, { useContext, useEffect } from "react";
import { Context } from "../context/contextApi";
import LeftNav from "./LeftNav";
import VideoCard from "./VideoCard";

const Feed = () => {
  const { loading, searchResult } = useContext(Context);

  useEffect(() => {
    // console.log("Feed rendered. Loading:", loading, "Results:", searchResult);
  }, [loading, searchResult]);

  return (
    <div className="flex flex-row h-[calc(100%-56px)]">
      <LeftNav />
      <div className="grow w-[calc(100%-240px)] h-full overflow-y-auto bg-black scrollbar-hide">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-5">
          {loading ? (
            <div></div>
          ) : searchResult.length === 0 ? (
            <div></div>
          ) : (
            searchResult.map((item, index) => {
              // console.log(`Item ${index} in Feed:`, item);
              if (item.type !== "video") {
                // console.log(`Skipping non-video item ${index}:`, item);
                return null;
              }
              return <VideoCard key={item.videoId || index} video={item} />;
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default Feed;
