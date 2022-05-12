import { useQuery } from "react-query";
import { getAllVideos } from "../api";
import AuthProtectedRoute from "../components/AuthProtectedRoute";
import SectionHeading from "../components/SectionHeading";
import VideoCard from "../components/VideoCard";
import HomePageLayout from "../layouts/HomePageLayout";
import { Video } from "../types";

const Home = AuthProtectedRoute(() => {
  const { isLoading, data, error } = useQuery("allVideos", getAllVideos);

  return (
    <HomePageLayout>
      {error || data?.videos?.length < 1 ? (
        <h1 className="empty-heading">No Videos to show</h1>
      ) : isLoading ? (
        <h1 className="empty-heading">Loading..</h1>
      ) : (
        <>
          <SectionHeading text="Home" width={8} />
          <div className="video-container">
            {data?.videos?.map((video: Video) => (
              <VideoCard
                setIsUpdateTriggered={() => {}}
                video={video}
                key={video.videoId}
              />
            ))}
          </div>
        </>
      )}
    </HomePageLayout>
  );
});

export default Home;
