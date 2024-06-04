import React, { useState, useEffect } from "react";
import axios from "axios";
import fileDialog from "file-dialog";
import "./Upload.css";
import trash from "../assets/trash.svg";
import check from "../assets/true.svg";
import cloud from "../assets/cloud.svg";

const PUBLIC_KEY = "4b4333d97cb1bb353e55";
const SECRET_KEY = "22fbad1d191df600f26b";

const formatFileSize = (size) => {
  if (size < 1024 * 1024) return `${(size / 1024).toFixed(2)} KB`;
  if (size < 1024 * 1024 * 1024) return `${(size / 1024 / 1024).toFixed(2)} MB`;
};

function File() {
  const [files, setFiles] = useState([]);
  const [progress, setProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    fetchFiles();
  }, []);

  const fetchFiles = async () => {
    try {
      const response = await fetch("https://api.uploadcare.com/files/", {
        headers: {
          Authorization: `Uploadcare.Simple ${PUBLIC_KEY}:${SECRET_KEY}`,
          Accept: "application/vnd.uploadcare-v0.5+json",
        },
      });
      const data = await response.json();
      setFiles(data.results);
    } catch (error) {
      console.error("Fetch files error: ", error);
    }
  };

  const handleFileChange = (files) => {
    const file = files[0];
    if (file) {
      uploadFile(file);
    }
  };

  const uploadFile = (file) => {
    setIsUploading(true);
    const formData = new FormData();
    formData.append("UPLOADCARE_PUB_KEY", PUBLIC_KEY);
    formData.append("UPLOADCARE_STORE", "auto");
    formData.append("file", file);

    axios
      .post("https://upload.uploadcare.com/base/", formData, {
        onUploadProgress: (progressEvent) => {
          setProgress(progressEvent.loaded / progressEvent.total);
        },
      })
      .then((response) => {
        setProgress(0);
        setIsUploading(false);
        fetchFiles();
      })
      .catch((error) => {
        console.error("Upload error: ", error);
        setProgress(0);
        setIsUploading(false);
      });
  };

  const handleFileDelete = async (fileId) => {
    try {
      const response = await fetch(
        `https://api.uploadcare.com/files/${fileId}/`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Uploadcare.Simple ${PUBLIC_KEY}:${SECRET_KEY}`,
            Accept: "application/vnd.uploadcare-v0.5+json",
          },
        }
      );
      if (response.ok) {
        fetchFiles(); // Refresh the list of files
      } else {
        console.error("Delete error: ", response.statusText);
      }
    } catch (error) {
      console.error("Delete error: ", error);
    }
  };

  const openFileDialog = () => {
    fileDialog()
      .then(handleFileChange)
      .catch((err) => {
        console.error("File selection error: ", err);
      });
  };
  const downloadFile = async (url, filename) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const urlObject = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = urlObject;
      link.setAttribute("download", filename);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Download error: ", error);
    }
  };
  const handleDownloadAll = () => {
    files.forEach((file) => {
      const fileUrl = file.original_file_url;
      const fileName = file.original_filename;
      downloadFile(fileUrl, fileName);
    });
  };

  return (
    <div className="container">
      <div className="upload-input">
        <button className="file-upload-button" onClick={openFileDialog}>
          <img src={cloud} alt="Upload" />
        </button>
      </div>
      <div className="upload-box">
        {isUploading && (
          <div className="loading">
            <h1>Loading....</h1>
            <div className="progress">
              <div className="progress-bar-container">
                <div
                  className="progress-bar"
                  style={{ width: `${progress * 100}%` }}
                ></div>
              </div>
            </div>
            <p>{(progress * 100).toFixed(2)}% of 100%</p>
          </div>
        )}
        {files.length > 0 && (
          <div className="file-list">
            {files.map((file) => (
              <div className="file-item" key={file.uuid}>
                <div className="file">
                  <div className="checkbox">
                    <img src={check} alt="Uploaded" />
                  </div>
                  <div className="info">
                    <p className="fileName">{file.original_filename}</p>
                    <p className="fileSize">
                      {file.size
                        ? formatFileSize(file.size)
                        : "Size not available"}
                    </p>
                  </div>
                </div>
                <button
                  className="delete-button"
                  onClick={() => handleFileDelete(file.uuid)}
                >
                  <img src={trash} alt="Delete" />
                </button>
              </div>
            ))}
          </div>
        )}
        <button className="download-button" onClick={handleDownloadAll}>
          Go to downloads
        </button>
      </div>
    </div>
  );
}

export default File;
