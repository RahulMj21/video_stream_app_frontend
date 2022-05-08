import React from "react";
import { Video } from "../types";

const VideoCard = ({ video }: { video: Video }) => {
  return <h1>{video.videoId}</h1>;
};

export default VideoCard;
