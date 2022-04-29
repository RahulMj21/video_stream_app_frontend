import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import UploadVideoModal from "./UploadVideoModal";

const Sidebar = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <aside className="sidebar">
      {showModal && <UploadVideoModal setShowModal={setShowModal} />}
      <div className="item" onClick={() => setShowModal(true)}>
        <FaPlus /> Upload
      </div>
    </aside>
  );
};

export default Sidebar;
