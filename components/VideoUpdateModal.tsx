import { AxiosError } from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FaPhotoVideo, FaTag } from "react-icons/fa";
import { useMutation } from "react-query";
import { updateVideo } from "../api";
import { UpdateVideoInput } from "../schemas";
import { Video } from "../types";
import Loader from "./Loader";

const VideoUpdateModal = ({
  video,
  setIsUpdateTriggered,
  setShowVideoUpdateModal,
}: {
  video: Video;
  setIsUpdateTriggered: Function;
  setShowVideoUpdateModal: Function;
}) => {
  const [published, setPublished] = useState(video.published);
  const [videoTitle, setVideoTitle] = useState(video.videoTitle);
  const [videoDescription, setVideoDescription] = useState(
    video.videoDescription
  );

  const data = {
    published: published,
    videoTitle,
    videoDescription,
  };

  const mutation = useMutation<
    { success: Boolean; video: Video },
    AxiosError,
    {
      input: UpdateVideoInput;
      videoId: string;
    }
  >(updateVideo, {
    onSuccess: () => {
      toast.success("video updated");
      setIsUpdateTriggered(true);
      setShowVideoUpdateModal(false);
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message
          ? error.response.data.message
          : error.message
      );
    },
  });

  return mutation.isLoading ? (
    <Loader />
  ) : (
    <div className="modal">
      <div className="overlay" onClick={() => setShowVideoUpdateModal(false)} />
      <div className="container">
        <div className="content">
          <h1 className="heading">Update Video</h1>
          <form
            onSubmit={() =>
              mutation.mutate({
                input: data as UpdateVideoInput,
                videoId: video.videoId,
              })
            }
          >
            <div className="input-group">
              <FaTag />
              <input
                type="text"
                required
                value={videoTitle}
                onChange={(e) => setVideoTitle(e.target.value)}
              />
              <span>Video Title</span>
            </div>
            <div className="input-group textarea">
              <FaPhotoVideo />
              <textarea
                required
                value={videoDescription}
                onChange={(e) => setVideoDescription(e.target.value)}
              />
              <span>Video Description</span>
            </div>
            <div className="toggle-status">
              <div
                className={`toggle-switch ${published ? "active" : ""}`}
                onClick={() => setPublished(!published)}
              />
              <p>{published ? "Public" : "Private"}</p>
            </div>
            <button type="submit" className="btn-brand">
              Update
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default VideoUpdateModal;
