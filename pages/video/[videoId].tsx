import { useRouter } from "next/router";
import React from "react";
import AuthProtectedRoute from "../../components/AuthProtectedRoute";
import HomePageLayout from "../../layouts/HomePageLayout";

const SingleVideo = AuthProtectedRoute(() => {
  const router = useRouter();
  const { videoId } = router.query;
  const videoUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/video/watch/${videoId}`;
  return (
    <HomePageLayout>
      <div className="singleVideo">
        <video
          className="streamedVideo"
          src={videoUrl}
          controls
          autoPlay
          id={videoId as string}
        />
        <h1 className="title">This is the Title</h1>
        <p className="description">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur
          ad hic exercitationem excepturi consequatur atque quaerat, quas
          necessitatibus praesentium reiciendis? Et reiciendis repellat
          architecto, quia dolore nulla! Eaque, ea nisi!{" "}
        </p>
      </div>
    </HomePageLayout>
  );
});

export default SingleVideo;
