import Image from "next/image";
import React, { FormEvent, useRef, useState } from "react";
import { FaCircleNotch, FaEnvelope, FaFileImage, FaUser } from "react-icons/fa";
import { useMutation } from "react-query";
import { updateUserProfile } from "../api";
import { setUser, User } from "../slices/userSlice";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import Loader from "./Loader";
import { useDispatch } from "react-redux";

const UpdateProfileModal = ({
  setShowUpdateProfileModal,
  user,
}: {
  user: User;
  setShowUpdateProfileModal: Function;
}) => {
  const dispatch = useDispatch();
  const avatarRef = useRef<HTMLInputElement | null>(null);
  const [updatableImg, setUpdatableImg] = useState<string | null>(null);
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);

  const mutation = useMutation<
    { success: Boolean; user: User },
    AxiosError,
    object
  >(updateUserProfile, {
    onSuccess: ({ user }) => {
      toast.success("profile updated");
      dispatch(setUser(user));
      setShowUpdateProfileModal(false);
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message
          ? error.response.data.message
          : error.message
      );
    },
  });

  const handleUpdate = (e: FormEvent) => {
    e.preventDefault();
    if (name === user.name && email === user.email && !updatableImg)
      return toast.error("nothing to update");
    const data = {
      name,
      email,
      avatar: updatableImg,
    };

    mutation.mutate(data);
  };

  const handleAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();
    const [file] = Array.from(
      e.target.files as Iterable<File> | ArrayLike<File>
    );
    if (!file) return;
    reader.readAsDataURL(file);
    reader.onloadend = function () {
      setUpdatableImg(reader.result as string);
    };
  };

  return (
    <div className="modal update-profile">
      <div
        className="overlay"
        onClick={() => setShowUpdateProfileModal(false)}
      />
      <div className="container">
        <div className="content">
          <h1 className="heading">Update Profile</h1>
          <form onSubmit={handleUpdate}>
            <div className="input-group">
              <FaUser />
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="Name"
              />
              <span>Name</span>
            </div>
            <div className="input-group">
              <FaEnvelope />
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Email"
              />
              <span>Email</span>
            </div>
            <div className="update-avatar">
              <Image
                src={
                  updatableImg
                    ? updatableImg
                    : user.avatar.secure_url
                    ? user.avatar.secure_url
                    : "/images/avatar.png"
                }
                height={50}
                width={50}
                objectFit="cover"
                className="avatar"
              />
              <span
                className="btn-outlined"
                onClick={() => avatarRef?.current?.click()}
              >
                Select Avatar <FaFileImage />
              </span>
              <input
                type="file"
                accept="image/*"
                ref={avatarRef}
                hidden
                onChange={handleAvatar}
              />
            </div>
            <button
              type="submit"
              className="btn-brand"
              disabled={mutation.isLoading}
            >
              Update {mutation.isLoading && <FaCircleNotch />}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfileModal;
