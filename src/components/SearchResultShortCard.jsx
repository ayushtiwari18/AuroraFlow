import React from "react";
import { Link } from "react-router-dom";
import { abbreviateNumber } from "js-abbreviation-number";

const SearchResultShortCard = ({ short }) => {
  if (!short) return null;

  const thumbnailUrl =
    short.thumbnail && short.thumbnail[0] ? short.thumbnail[0].url : "";

  return (
    <Link to={`/video/${short.videoId}`} className="flex flex-col">
      <div className="relative aspect-w-9 aspect-h-16 rounded-xl overflow-hidden">
        {thumbnailUrl && (
          <img
            className="object-cover w-full h-full"
            src={thumbnailUrl}
            alt={short.title}
          />
        )}
        <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 px-2 py-1 text-white text-xs rounded">
          Short
        </div>
      </div>
      <div className="mt-2">
        <h3 className="text-white text-sm font-semibold line-clamp-2">
          {short.title}
        </h3>
        <div className="flex items-center mt-1">
          <span className="text-white text-opacity-70 text-xs">
            {abbreviateNumber(short.viewCount || 0, 2)} views
          </span>
        </div>
      </div>
    </Link>
  );
};

export default SearchResultShortCard;
