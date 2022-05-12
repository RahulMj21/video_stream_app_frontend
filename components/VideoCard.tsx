import { useRouter } from "next/router";
import React, { useState } from "react";
import { FaRegPlayCircle } from "react-icons/fa";
import { Video } from "../types";
import VideoUpdateModal from "./VideoUpdateModal";

const VideoCard = ({
  video,
  setIsUpdateTriggered,
}: {
  video: Video;
  setIsUpdateTriggered: Function;
}) => {
  const router = useRouter();
  const [showVideoUpdateModal, setShowVideoUpdateModal] = useState(false);

  return (
    <div className="videocard">
      {showVideoUpdateModal && (
        <VideoUpdateModal
          video={video}
          setIsUpdateTriggered={setIsUpdateTriggered}
          setShowVideoUpdateModal={setShowVideoUpdateModal}
        />
      )}
      <div
        className="video"
        onClick={() => router.push(`/video/${video.videoId}`)}
      >
        <FaRegPlayCircle />
        <span>click to play</span>
      </div>
      <div className="info">
        {video.videoTitle ? (
          <>
            <h3 className="title">{video.videoTitle}</h3>
            <p className="description">{video.videoDescription}</p>
          </>
        ) : (
          <div className="no-info">
            <p className="empty">
              Title and Description are not set. Please Update
            </p>
            <button
              className="btn-brand"
              onClick={() => setShowVideoUpdateModal(true)}
            >
              Update
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoCard;
