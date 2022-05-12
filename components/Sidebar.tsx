import { useRouter } from "next/router";
import React, { useState } from "react";
import { FaHome, FaPlus, FaUser, FaVideo } from "react-icons/fa";
import UploadVideoModal from "./UploadVideoModal";

const Sidebar = () => {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const items = [
    {
      text: "Home",
      path: "/",
      icon: <FaHome />,
      action: () => router.push("/"),
    },
    {
      text: "My Uploads",
      path: "/myuploads",
      icon: <FaVideo />,
      action: () => router.push("/myuploads"),
    },
    {
      text: "Profile",
      path: "/profile/me",
      icon: <FaUser />,
      action: () => router.push("/profile/me"),
    },
    {
      text: "Upload",
      icon: <FaPlus />,
      action: () => setShowModal(true),
    },
  ];

  return (
    <aside className="sidebar">
      {showModal && <UploadVideoModal setShowModal={setShowModal} />}
      {items.map(({ text, icon, action, path }) => (
        <div
          className={`item ${router.pathname === path ? "active" : ""}`}
          onClick={action}
          key={text}
        >
          {icon} <p>{text}</p>
        </div>
      ))}
    </aside>
  );
};

export default Sidebar;
