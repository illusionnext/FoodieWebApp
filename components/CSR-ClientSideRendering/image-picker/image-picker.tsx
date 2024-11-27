"use client";

import classes from "./image-picker.module.css";
import React, { useState, useRef } from "react";
import Image from "next/image";

export default function ImagePicker({
  label,
  name,
  maxFileSizeMB = 1,
}: {
  label: string;
  name: string;
  maxFileSizeMB?: number; // Maximum file size in MB
}) {
  const imageInputRef = useRef<HTMLInputElement>(null);
  const [pickedImage, setPickedImage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handlePickClick = () => {
    imageInputRef.current?.click();
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (!files || files.length === 0) {
      setPickedImage(null);
      setErrorMessage("No file selected.");
      return;
    }

    const file = files[0];
    const maxFileSize = maxFileSizeMB * 1024 * 1024; // Convert MB to bytes

    if (file.size > maxFileSize) {
      setErrorMessage(
        `File "${file.name}" exceeds the maximum size of ${maxFileSizeMB}MB.`,
      );
      return;
    }

    const fileReader = new FileReader();
    fileReader.onload = () => {
      if (fileReader.result && typeof fileReader.result === "string") {
        setPickedImage(fileReader.result as string);
        setErrorMessage(null); // Clear error on successful load
      }
    };
    fileReader.onerror = () => {
      console.error(`Failed to read file "${file.name}".`);
      setErrorMessage(`Failed to load "${file.name}". Please try again.`);
    };
    fileReader.readAsDataURL(file); // Read the file as a Data URL
  };

  return (
    <div className={classes.picker}>
      <label htmlFor={name}>{label}</label>
      <div className={classes.controls}>
        <div className={classes.preview}>
          {pickedImage ? (
            <Image
              src={pickedImage}
              alt="Selected image"
              sizes="(max-width: 600px) 100vw, 10rem"
              fill
              onError={(e) => console.error((e.target as HTMLImageElement).id)}
              onLoad={(e) =>
                console.log((e.target as HTMLImageElement).naturalWidth)
              }
              loading="lazy" // {lazy} | {eager}
              placeholder="blur"
              priority
            />
          ) : (
            <p>No image picked yet</p>
          )}
        </div>
        <input
          type="file"
          id={name}
          name={name}
          className={classes.input}
          accept="image/png, image/jpg, image/jpeg, image/webp"
          ref={imageInputRef}
          onChange={handleImageChange}
          required
        />
        <button
          type="button"
          className={classes.button}
          onClick={handlePickClick}
          aria-label={`Pick an image for ${label}`}
        >
          Pick An Image
        </button>
        {errorMessage && <p className={classes.error}>{errorMessage}</p>}
      </div>
    </div>
  );
}
