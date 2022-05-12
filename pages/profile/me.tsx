import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import AuthProtectedRoute from "../../components/AuthProtectedRoute";
import SectionHeading from "../../components/SectionHeading";
import UpdateProfileModal from "../../components/UpdateProfileModal";
import HomePageLayout from "../../layouts/HomePageLayout";
import { selectUser } from "../../slices/userSlice";

const Me = AuthProtectedRoute(() => {
  const router = useRouter();

  const [showUpdateProfileModal, setShowUpdateProfileModal] = useState(false);
  const user = useSelector(selectUser);

  return (
    user && (
      <HomePageLayout>
        {showUpdateProfileModal && user && (
          <UpdateProfileModal
            user={user}
            setShowUpdateProfileModal={setShowUpdateProfileModal}
          />
        )}
        <div className="profile">
          <SectionHeading text="My Profile" width={12} />
          <div className="content">
            <div className="left">
              <Image
                src={
                  user?.avatar?.secure_url
                    ? user.avatar.secure_url
                    : "/images/avatar.png"
                }
                height="250"
                width="250"
                objectFit="cover"
                className="avatar"
              />
            </div>
            <div className="right">
              <div className="info">
                <p className="info-group">
                  Name : <span>{user?.name}</span>
                </p>
                <p className="info-group">
                  Email : <span>{user?.email}</span>
                </p>
              </div>
              <div className="action-group">
                <button
                  className="btn-outlined"
                  onClick={() => setShowUpdateProfileModal(true)}
                >
                  Update Profile
                </button>
                {!user?.isLoggedInWithGoogle && (
                  <button
                    className="btn-outlined"
                    onClick={() => router.push("/auth/updatepassword")}
                  >
                    Update Password
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </HomePageLayout>
    )
  );
});

export default Me;
