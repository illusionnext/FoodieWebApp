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

    if (!files || files.length === 0) {
      setPickedImage(null);
      return;
    }

    const file = files[0];
    console.log("file:", file);

    const fileReader = new FileReader(); // Create a new file reader
    fileReader.onload = () => {
      // Set the onload event handler
      if (fileReader.result && typeof fileReader.result === "string") {
        setPickedImage(fileReader.result); // Set the picked image to the result of the file reader
      }
    };
    fileReader.readAsDataURL(file); // Start reading the file. it triggers the onload event handler
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
          accept="image/png, image/jpg, image/jpeg, image/webp"
          ref={imageInputRef}
          onChange={handleImageChange}
          required
          // multiple
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
