"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import slideshowImages from "./images";
import classes from "./image-slideshow.module.css";

export default function ImageSlideshow() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex < slideshowImages.length - 1 ? prevIndex + 1 : 0,
      );
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className={classes.slideshow}>
      {slideshowImages.map((image, index) => (
        <Image
          key={index}
          src={image.image}
          className={index === currentImageIndex ? classes.active : ""}
          alt={image.alt}
        />
      ))}
    </section>
  );
}
