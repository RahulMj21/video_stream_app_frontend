import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { getMyVideos } from "../api";
import AuthProtectedRoute from "../components/AuthProtectedRoute";
import VideoCard from "../components/VideoCard";
import HomePageLayout from "../layouts/HomePageLayout";
import { Video } from "../types";

const myvideos = AuthProtectedRoute(() => {
  const [isUpdateTriggered, setIsUpdateTriggered] = useState(false);
  const { isLoading, data, error, refetch } = useQuery(
    "allVideos",
    getMyVideos
  );

  useEffect(() => {
    if (isUpdateTriggered) {
      refetch();
    }
  }, [isUpdateTriggered]);

  return (
    <HomePageLayout>
      {error || data?.videos?.length < 1 ? (
        <h1 className="empty-heading">No Videos to show</h1>
      ) : isLoading ? (
        <h1 className="empty-heading">Loading..</h1>
      ) : (
        <div className="video-container">
          {data?.videos?.map((video: Video) => (
            <VideoCard
              setIsUpdateTriggered={setIsUpdateTriggered}
              video={video}
              key={video.videoId}
            />
          ))}
        </div>
      )}
    </HomePageLayout>
  );
});

export default myvideos;
