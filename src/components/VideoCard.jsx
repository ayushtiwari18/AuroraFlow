import React from "react";
import { Link } from "react-router-dom";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { abbreviateNumber } from "js-abbreviation-number";
import VideoLength from "../shared/videoLength";

const VideoCard = ({ video }) => {
  if (!video) {
    console.error("No video data provided to VideoCard");
    return null;
  }

  if (!video.thumbnail || !video.title) {
    console.error("Invalid video data structure:", video);
    return null;
  }

  const thumbnailUrl =
    video.thumbnail && video.thumbnail[0] ? video.thumbnail[0].url : null;
  const authorThumbnailUrl =
    video.channelThumbnail && video.channelThumbnail[0]
      ? video.channelThumbnail[0].url
      : null;

  if (!thumbnailUrl) {
    console.error("No thumbnail URL found for video:", video);
    return null;
  }

  return (
    <Link to={`/video/${video.videoId}`}>
      <div className="flex flex-col mb-8 bg-black">
        <div className="relative h-48 md:h-40 md:rounded-xl overflow-hidden">
          <img
            className="h-full w-full object-cover"
            src={thumbnailUrl}
            alt={video.title}
            onError={(e) => {
              console.error("Error loading image:", e.target.src);
              e.target.src = "path/to/fallback/image.jpg";
            }}
          />
          {video?.lengthText && <VideoLength time={video?.lengthText} />}
        </div>
        <div className="mt-2 flex">
          <div className="flex-shrink-0">
            {authorThumbnailUrl && (
              <img
                className="w-10 h-10 rounded-full"
                src={authorThumbnailUrl}
                alt={video.channelTitle || "Channel"}
                onError={(e) => {
                  console.error("Error loading channel image:", e.target.src);
                  e.target.src = "path/to/fallback/channel-image.jpg"; // Replace with a fallback image
                }}
              />
            )}
          </div>
          <div className="ml-3">
            <h3 className="text-white text-lg font-semibold line-clamp-2">
              {video?.title}
            </h3>
            <div className="flex items-center text-gray-400 text-sm mt-1">
              <span>{video.channelTitle}</span>
              {video.badges && (
                <BsFillCheckCircleFill className="ml-1 text-white/[0.5] text-[12px]" />
              )}
            </div>
            <div className="text-gray-400 text-sm mt-1">
              {video?.viewCount && (
                <span>{abbreviateNumber(video?.viewCount)} views</span>
              )}
              {video.publishedTimeText && (
                <>
                  <span className="mx-1">•</span>
                  <span>{video.publishedTimeText}</span>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default VideoCard;
