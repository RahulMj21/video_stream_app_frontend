import { useRouter } from "next/router";
import React from "react";
import HomePageLayout from "../../layouts/HomePageLayout";

const SingleVideo = () => {
  const router = useRouter();
  const { videoId } = router.query;
  const videoUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/video/watch/${videoId}`;
  return (
    <HomePageLayout>
      <video
        src={videoUrl}
        width="800px"
        height="auto"
        controls
        autoPlay
        id={videoId as string}
      />
    </HomePageLayout>
  );
};

export default SingleVideo;
