import { ReactElement } from "react";
import toast from "react-hot-toast";
import HomePageLayout from "../layouts/HomePageLayout";

const Home = () => {
  return <div>Home page</div>;
};

Home.getLayout = function getLayout(page: ReactElement) {
  return <HomePageLayout>{page}</HomePageLayout>;
};

export default Home;
