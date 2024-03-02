"use client";

import React, { useRef, useState } from "react";
import classes from "./image-picker.module.css";
import Image from "next/image";

function ImagePicker({ label, name }) {
  const imageInput = useRef();
  const [pickedImage, setPickedImage] = useState(null);

  const handlePickClick = () => {
    imageInput.current.click();
  };

  function handleImageChange(event) {
    const file = event.target.files[0];
    console.log(file);

    if (!file) {
      return setPickedImage(null);
    }

    // changing file to a data url so  that it can be as src:
    const fileReader = new FileReader();

    fileReader.onload = () => {
      setPickedImage(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  }

  return (
    <div className={classes.picker}>
      <label htmlFor={name}>{label}</label>
      <div className={classes.controls}>
        <div className={classes.preview}>
          {!pickedImage && <p>No Image picked yet!</p>}
          {pickedImage && (
            <Image src={pickedImage} alt="Image selected by the user" fill />
          )}
        </div>
        <input
          className={classes.input}
          type="file"
          id={name}
          accept="image/png ,image/jpeg"
          name={name}
          onChange={handleImageChange}
          ref={imageInput}
          required
        />
        <button
          type="button"
          className={classes.button}
          onClick={handlePickClick}
        >
          Pick an Image
        </button>
      </div>
    </div>
  );
}

export default ImagePicker;
