import Multiselect from "./Multiselect";
import React, { useEffect, useState } from "react";
import {
  getDownloadURL,
  ref,
  uploadBytes,
  uploadBytesResumable,
} from "firebase/storage";
import axios from "axios";
import { storage } from "./../firebase";
import { url_api } from "../constant";
import { toast } from "react-toastify";

const SendFile = () => {
  const [uploadStatus, setUploadStatus] = useState([0]);
  const [selectedFile, setSelectedFile] = useState<
    { name: string; url: string }[]
  >([]);
  const [users, setUsers] = useState<
    { name: string; image: string; id: string }[]
  >([]);
  const [selectedUsers, setSelectedUsers] = useState<
    { name: string; image: string; id: string }[]
  >([]);

  const [isPublic, setIsPublic] = useState(true);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  function classNames(...classes: any) {
    return classes.filter(Boolean).join(" ");
  }
  const sendNewSharedFiles = (e: any) => {
    e.preventDefault();

    const token: any = localStorage.getItem("access_token");
    axios({
      method: "post",
      url: url_api + "/file",
      data: {
        isPublic,
        title,
        description,
        users: selectedUsers,
        files: selectedFile,
      },
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => {
        toast.success("Fichier partagé avec success!");
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    const token: any = localStorage.getItem("access_token");

    axios({
      method: "get",
      url: url_api + "/users",
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => {
        setUsers([]);
      });
  };

  const uploadFile = async (file: any, index: number) => {
    if (!file) return;
    const storageRef = ref(storage, "shared/" + file.name + Math.random() * 10);
    const uploadTask = uploadBytesResumable(storageRef, file);

    let selectedFileCopy = [...selectedFile];
    selectedFileCopy[index] = { name: file.name, url: "" };
    setSelectedFile(selectedFileCopy);
    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on(
      "state_changed",
      async (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        let uploadStatusCopy = [...uploadStatus];
        uploadStatusCopy[index] = Math.round(progress);
        await setUploadStatus(uploadStatusCopy);
        console.log("Upload is " + progress + "% done");
      },
      (error) => {
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
          case "storage/unauthorized":
            // User doesn't have permission to access the object
            break;
          case "storage/canceled":
            // User canceled the upload
            break;

          // ...

          case "storage/unknown":
            // Unknown error occurred, inspect error.serverResponse
            break;
        }
      },
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          let selectedFileCopy = [...selectedFile];
          selectedFileCopy[index] = { name: file.name, url: downloadURL };
          setSelectedFile(selectedFileCopy);
          console.log("File available at", downloadURL);
        });
      }
    );
  };
  return (
    <div className="flex items-center justify-center w-full p-12">
      <div className="w-full mx-auto bg-white">
        <form className="py-6 px-9" onSubmit={sendNewSharedFiles}>
          <fieldset>
            <legend className="text-sm font-medium text-gray-900 contents">
              Option de Partage
            </legend>
            <p className="text-sm text-gray-500">Partager avec :</p>
            <div className="mt-4 space-y-4">
              <div className="flex items-center">
                <input
                  id="push-everything"
                  name="isForEveryone"
                  type="radio"
                  checked={isPublic}
                  onChange={(e) => setIsPublic(e.target.checked)}
                  className="w-4 h-4 text-green-600 border-gray-300 focus:ring-green-500"
                />
                <label
                  htmlFor="push-everything"
                  className="block ml-3 text-sm font-medium text-gray-700"
                >
                  Tous le monde
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="push-email"
                  name="isForEveryone"
                  type="radio"
                  checked={!isPublic}
                  onChange={(e) => setIsPublic(!e.target.checked)}
                  className="w-4 h-4 text-green-600 border-gray-300 focus:ring-green-500"
                />
                <label
                  htmlFor="push-email"
                  className="block ml-3 text-sm font-medium text-gray-700"
                >
                  Des utilisateurs spécifiques
                </label>
              </div>
            </div>
          </fieldset>
          {!isPublic && users.length ? (
            <div className="my-5">
              <Multiselect
                seletedUsers={selectedUsers}
                setSelectedUsers={setSelectedUsers}
                users={users}
              />
            </div>
          ) : (
            ""
          )}

          <div className="my-5">
            <label
              htmlFor="first-name"
              className="block text-sm font-medium text-gray-700"
            >
              Titre
            </label>
            <input
              type="text"
              name="title"
              id="title"
              autoComplete="given-name"
              onChange={(e) => setTitle(e.target.value)}
              className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="about"
              className="block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <div className="mt-1">
              <textarea
                id="about"
                name="about"
                rows={3}
                className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
                placeholder="Les plans de mission"
                defaultValue={""}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <p className="mt-2 text-sm text-gray-500">
              Brief description for your profile. URLs are hyperlinked.
            </p>
          </div>

          <div className="pt-4 mb-6">
            <label className="mb-5 block text-xl font-semibold text-[#07074D]">
              Charger un fichier
            </label>

            <div className="mb-8">
              <input
                type="file"
                onChange={(e) =>
                  uploadFile(e.target?.files![0], selectedFile.length)
                }
                name="file"
                id="file"
                className="sr-only"
              />
              <label
                htmlFor="file"
                className="relative flex min-h-[200px] cursor-pointer items-center justify-center rounded-md border border-dashed bg-green-50 border-[#e0e0e0] p-12 text-center"
              >
                <div>
                  <span className="mb-2 block text-xl font-semibold text-[#07074D]">
                    Cliquer ici
                  </span>
                  <span className="mb-2 block text-sm font-medium text-[#6B7280]">
                    pour
                  </span>
                  <span className="inline-flex rounded border border-[#e0e0e0] bg-white py-2 px-7 text-sm font-medium text-[#07074D]">
                    Choisir un fichier
                  </span>
                </div>
              </label>
            </div>

            {selectedFile?.map((el, index) => (
              <div
                key={index}
                className="rounded-md bg-[#F5F7FB] my-5 py-4 px-8"
              >
                <div className="flex items-center justify-between">
                  <span className="truncate pr-3 text-sm font-medium text-[#07074D]">
                    {el.name}
                  </span>
                  <button
                    className="text-[#284d07]"
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setSelectedFile(
                        [...selectedFile]?.filter(
                          (file) => el.name != file.name
                        )
                      );
                    }}
                  >
                    <svg
                      width="10"
                      height="10"
                      viewBox="0 0 10 10"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M0.279337 0.279338C0.651787 -0.0931121 1.25565 -0.0931121 1.6281 0.279338L9.72066 8.3719C10.0931 8.74435 10.0931 9.34821 9.72066 9.72066C9.34821 10.0931 8.74435 10.0931 8.3719 9.72066L0.279337 1.6281C-0.0931125 1.25565 -0.0931125 0.651788 0.279337 0.279338Z"
                        fill="currentColor"
                      />
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M0.279337 9.72066C-0.0931125 9.34821 -0.0931125 8.74435 0.279337 8.3719L8.3719 0.279338C8.74435 -0.0931127 9.34821 -0.0931123 9.72066 0.279338C10.0931 0.651787 10.0931 1.25565 9.72066 1.6281L1.6281 9.72066C1.25565 10.0931 0.651787 10.0931 0.279337 9.72066Z"
                        fill="currentColor"
                      />
                    </svg>
                  </button>
                </div>
                {uploadStatus[index] < 100 && (
                  <div className="relative flex items-center justify-center h-12 m-3">
                    <div className="absolute top-0 w-12 h-12 border border-gray-200 border-solid rounded-full"></div>
                    <div className="">{uploadStatus[index]}%</div>
                    <div className="absolute top-0 w-12 h-12 border border-yellow-500 border-solid rounded-full animate-spin border-t-transparent"></div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div>
            <button
              type="submit"
              className="w-full px-8 py-3 text-sm font-semibold text-center text-white bg-green-600 rounded-md outline-none hover:shadow-form"
            >
              Partager
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SendFile;
