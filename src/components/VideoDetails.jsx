import React, {
  useState,
  useEffect,
  useContext,
  useCallback,
  useMemo,
} from "react";
import { useParams } from "react-router-dom";
import { fetchDataFromApi } from "../utils/api";
import { Context } from "../context/contextApi";
import ReactPlayer from "react-player/youtube";
import { AiOutlineLike, AiFillEye } from "react-icons/ai";
import { BsFillCheckCircleFill, BsPeople } from "react-icons/bs";
import SuggestionVideoCard from "./SuggestionVideoCard";

const VideoDetails = () => {
  const [video, setVideo] = useState(null);
  const [relatedVideos, setRelatedVideos] = useState([]);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const { setLoading } = useContext(Context);

  const fetchVideoDetails = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetchDataFromApi(`video/info`, { id });
      setVideo(res);
    } catch (error) {
      console.error("Error fetching video details:", error);
      setError("Failed to load video details. Please try again later.");
    } finally {
      setLoading(false);
    }
  }, [id, setLoading]);

  const fetchRelatedVideos = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetchDataFromApi(`related`, { id });
      setRelatedVideos(res.data || []);
    } catch (error) {
      console.error("Error fetching related videos:", error);
      setError("Failed to load related videos. Please try again later.");
    } finally {
      setLoading(false);
    }
  }, [id, setLoading]);

  useEffect(() => {
    fetchVideoDetails();
    fetchRelatedVideos();
  }, [id, fetchVideoDetails, fetchRelatedVideos]);

  const formatCount = useMemo(
    () => (count) => {
      return new Intl.NumberFormat("en-US", { notation: "compact" }).format(
        count
      );
    },
    []
  );

  if (error) return <div className="text-white">{error}</div>;
  if (!video) return <div className="text-white">Loading...</div>;

  return (
    <div className="flex justify-center flex-row h-[calc(100%-56px)] bg-black">
      <div className="w-full max-w-[1280px] flex flex-col lg:flex-row">
        <div className="flex flex-col lg:w-[calc(100%-350px)] xl:w-[calc(100%-400px)] px-4 py-3 lg:py-6 overflow-y-auto">
          <div className="h-[200px] md:h-[400px] lg:h-[400px] xl:h-[550px] ml-[-16px] lg:ml-0 mr-[-16px] lg:mr-0">
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=${id}`}
              width="100%"
              height="100%"
              controls
              style={{ backgroundColor: "#000000" }}
              playing={true}
            />
          </div>
          <div className="text-white font-bold text-sm md:text-xl mt-4 line-clamp-2">
            {video.title}
          </div>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center py-4">
            <div className="flex">
              <div className="flex items-start">
                <div className="flex h-11 w-11 rounded-full overflow-hidden">
                  {video.thumbnail && video.thumbnail[3] && (
                    <img
                      src={video.thumbnail[3].url}
                      alt={video.channelTitle}
                      className="h-full w-full object-cover"
                    />
                  )}
                </div>
              </div>
              <div className="flex flex-col ml-3">
                <div className="text-white text-md font-semibold flex items-center">
                  {video.channelTitle}
                  {video.badges && (
                    <BsFillCheckCircleFill className="text-white/[0.5] text-[12px] ml-1" />
                  )}
                </div>
                <div className="text-white/[0.7] text-sm flex items-center">
                  <BsPeople className="mr-1" />
                  {formatCount(video.subscriberCount)} Subscribers
                </div>
              </div>
            </div>
            <div className="flex mt-4 md:mt-0">
              <div className="flex items-center text-white justify-center h-11 px-6 rounded-3xl bg-white/[0.15]">
                <AiOutlineLike className="text-xl text-white mr-2" />
                {formatCount(video.likeCount)}
              </div>
              <div className="flex items-center justify-center h-11 px-6 rounded-3xl bg-white/[0.15] ml-4 text-white">
                <AiFillEye className="text-xl text-white mr-2" />
                {formatCount(video.viewCount)}
              </div>
            </div>
          </div>
          <div className="mt-4 text-white bg-white/[0.15] rounded-xl p-4 max-h-[200px] overflow-y-auto scrollbar-hide">
            <div className="font-semibold mb-2 scrollbar-hide">
              About this video:
            </div>
            <div className="text-sm whitespace-pre-wrap scrollbar-hide">
              {video.description}
            </div>
          </div>
        </div>
        <div className="flex flex-col py-6 px-4 overflow-y-auto lg:w-[350px] xl:w-[400px] scrollbar-hide">
          {relatedVideos.map((item, index) => {
            if (item.type !== "video") return null; // Skip non-video items
            return <SuggestionVideoCard key={index} video={item} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default VideoDetails;
