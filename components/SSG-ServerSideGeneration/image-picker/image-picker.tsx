"use client";
import classes from "./image-picker.module.css";
import React, { useState, useRef } from "react";
import Image from "next/image";

export default function ImagePicker({
  label,
  name,
}: {
  label: string;
  name: string;
}) {
  const imageInputRef = useRef<HTMLInputElement>(null);

  const [pickedImage, setPickedImage] = useState<string | null>(null);

  const handlePickClick = () => {
    imageInputRef.current?.click();
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];

    const fileReader = new FileReader();
    fileReader.onload = () => {
      if (fileReader.result && typeof fileReader.result === "string") {
        setPickedImage(fileReader.result); // Safely assign result
      }
    };
    fileReader.readAsDataURL(file);
  };

  return (
    <div className={classes.picker}>
      <label htmlFor={name}>{label}</label>
      <div className={classes.controls}>
        <div className={classes.preview}>
          {pickedImage ? (
            <Image
              src={pickedImage}
              alt="The image selected by the user"
              sizes="(max-width: 600px) 100vw, 10rem"
              fill
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
          accept="image/png, image/jpg, image/webp"
          ref={imageInputRef}
          onChange={handleImageChange}
        />
        <button
          type="button"
          className={classes.button}
          onClick={handlePickClick}
        >
          Pick An Image
        </button>
      </div>
    </div>
  );
}
