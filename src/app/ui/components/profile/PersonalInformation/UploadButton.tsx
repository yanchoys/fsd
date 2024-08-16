"use client";

import React from "react";
import { useDropzone } from "react-dropzone";
import { Toaster } from "react-hot-toast";
import {
  deleteProfilePicture,
  uploadProfilePicture,
} from "~/app/(application)/actions";
import { toastNotifier } from "~/app/utils/helpers";
import type { TUserData } from "~/app/(application)/definitions";

export default function UploadButton({
  profileInfo,
  editMode,
  files,
  setFiles,
  setEditMode,
}: {
  profileInfo: TUserData["profile"];
  editMode: boolean;
  files: File[];
  setFiles: (value: React.SetStateAction<File[]>) => void;
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { getRootProps, getInputProps } = useDropzone({
    noDrag: true,
    disabled: !editMode,
    maxSize: 3000 * 1000,
    accept: {
      "image/png": [".png"],
      "image/jpeg": [".jpeg"],
      "image/jpg": [".jpg"],
    },
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          }),
        ),
      );
    },
  });

  return (
    <section className="flex items-center gap-4">
      <div {...getRootProps({})}>
        <input {...getInputProps()} />
        <div
          className={`w-[152px] rounded-full px-5 py-3  ${!editMode ? "bg-[#E7E7E7] text-[#676D73]" : "cursor-pointer border border-[#29ABE2] text-primary"}`}
        >
          <p>Change Photo</p>
        </div>
      </div>
      {files.length > 0 ? (
        <button
          onClick={async () => {
            const formData = new FormData();
            files.forEach((file) => formData.append(`[${file.name}]`, file));
            if (profileInfo.profilePicture) {
              await deleteProfilePicture(profileInfo.id.toString());
            }
            const res = await uploadProfilePicture({
              userId: profileInfo.id.toString(),
              formData: formData,
            });
            toastNotifier(res);
            setFiles([]);
            setEditMode(false);
          }}
          className={`w-[152px] rounded-full border border-[#29ABE2] bg-primary px-5 py-3 text-white`}
        >
          Save Photo
        </button>
      ) : null}
      <Toaster />
    </section>
  );
}
