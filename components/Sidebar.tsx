import { useRouter } from "next/router";
import React, { useState } from "react";
import { FaHome, FaPlus, FaVideo } from "react-icons/fa";
import UploadVideoModal from "./UploadVideoModal";

const Sidebar = () => {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);

  return (
    <aside className="sidebar">
      {showModal && <UploadVideoModal setShowModal={setShowModal} />}
      <div className="item" onClick={() => router.push("/")}>
        <FaHome /> <p>Home</p>
      </div>
      <div className="item" onClick={() => router.push("/myvideos")}>
        <FaVideo /> <p>My Videos</p>
      </div>
      <div className="item" onClick={() => setShowModal(true)}>
        <FaPlus /> <p>Upload</p>
      </div>
    </aside>
  );
};

export default Sidebar;
