import React, { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { FcCancel, FcUpload } from "react-icons/fc";
import { useMutation } from "react-query";
import { uploadVideo } from "../api";

const UploadVideoModal = ({ setShowModal }: { setShowModal: Function }) => {
  const [progress, setProgress] = useState(0);
  const [dropRejected, setDropRejected] = useState(false);

  const mutation = useMutation(uploadVideo);

  const config = {
    onUploadProgress: (progressEvent: any) => {
      const percent = Math.round(
        (progressEvent.loaded * 100) / progressEvent.total
      );
      setProgress(percent);
    },
  };

  const handleOndrop = useCallback((acceptedFiles: File[]) => {
    if (!acceptedFiles?.[0]) return;
    const formData = new FormData();
    formData.append("video", acceptedFiles[0]);
    mutation.mutate({ formData, config });
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: handleOndrop,
    onDropRejected: () => setDropRejected(true),

    multiple: false,
    accept: "video/mp4",
  });

  useEffect(() => {
    setTimeout(() => setDropRejected(false), 3000);
  }, [dropRejected]);

  return (
    <div className="modal uploadVideoModal">
      <div className="overlay" onClick={() => setShowModal(false)} />
      <div className="container">
        <div className="content" {...getRootProps()}>
          <input {...getInputProps()} />
          {progress > 0 ? (
            <>
              <h1 className="big">Uploading Progress</h1>
              <p>{progress}%</p>
              <div className="progress-bar">
                <div className="progress" style={{ width: `${progress}%` }} />
              </div>
            </>
          ) : dropRejected ? (
            <>
              <FcCancel />
              <h1>We accept only .mp4 files</h1>
            </>
          ) : (
            <>
              <FcUpload />
              <h1>Drag a Video or Click to Select One</h1>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default UploadVideoModal;
