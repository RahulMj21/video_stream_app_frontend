import { useRouter } from "next/router";
import React, { useState } from "react";
import {
  FaCaretRight,
  FaLongArrowAltRight,
  FaRegPlayCircle,
  FaUser,
} from "react-icons/fa";
import { Video } from "../types";
import VideoUpdateModal from "./VideoUpdateModal";
import moment from "moment";

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
      {video.videoTitle ? (
        <div className="info">
          <div className="top">
            <h3 className="title">
              <FaCaretRight />
              {video.videoTitle}
            </h3>
            <p className="description">
              <FaLongArrowAltRight />
              {video.videoDescription}
            </p>
          </div>
          <div className="footer">
            <p className="creator">
              <FaUser />
              {video.creator.name}
            </p>
            <p className="date">{moment(video.createdAt).format("L")}</p>
          </div>
        </div>
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
  );
};

export default VideoCard;
