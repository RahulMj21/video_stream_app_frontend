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
        <FaHome /> Home
      </div>
      <div className="item" onClick={() => router.push("/myvideos")}>
        <FaVideo /> My Videos
      </div>
      <div className="item" onClick={() => setShowModal(true)}>
        <FaPlus /> Upload
      </div>
    </aside>
  );
};

export default Sidebar;
