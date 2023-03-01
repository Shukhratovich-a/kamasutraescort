import React from "react";
import cn from "classnames";
import axios from "axios";
import { useSession } from "next-auth/react";

import { API, DOMAIN } from "../../helpers";

import { ImageSelectProps } from "./ImageSelect.props";

import ImageIcon from "../../assets/icons/image.svg";

import Close from "../../assets/icons/close.svg";

import styles from "./ImageSelect.module.scss";

export const ImageSelect = ({ firstImage, secondImage, thirdImage, fourthImage, ...props }: ImageSelectProps) => {
  const [uploadFirst, setUploadFirst] = React.useState<string | ArrayBuffer | null>(
    firstImage ? `${DOMAIN}/${firstImage}` : null
  );
  const [uploadSecond, setUploadSecond] = React.useState<string | ArrayBuffer | null>(
    secondImage ? `${DOMAIN}/${secondImage}` : null
  );
  const [uploadThird, setUploadThird] = React.useState<string | ArrayBuffer | null>(
    thirdImage ? `${DOMAIN}/${thirdImage}` : null
  );
  const [uploadFourth, setUploadFourth] = React.useState<string | ArrayBuffer | null>(
    fourthImage ? `${DOMAIN}/${fourthImage}` : null
  );
  const { data: session } = useSession();

  const handleUpload = async (
    evt: React.ChangeEvent<HTMLInputElement>,
    type: "profileImageFirst" | "profileImageSecond" | "profileImageThirth" | "profileImageFourth",
    setFile: React.Dispatch<React.SetStateAction<string | ArrayBuffer | null>>
  ) => {
    if (evt.target.files) {
      const image = evt.target.files[0];

      setFile(URL.createObjectURL(image));

      const formDate = new FormData();
      formDate.append(type, image);

      const { data: images } = await axios({
        method: "patch",
        url: API.image.upload + session?.user.id,
        data: formDate,
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log(images);
    }
  };

  const handleDelete = async (
    type: "profileImageFirst" | "profileImageSecond" | "profileImageThirth" | "profileImageFourth",
    setFile: React.Dispatch<React.SetStateAction<string | ArrayBuffer | null>>
  ) => {
    setFile(null);

    const { data: images } = await axios({
      method: "delete",
      url: API.image.delete + session?.user.id,
      data: { type },
    });

    console.log(images);
  };

  return (
    <div className={cn(styles.select)} {...props}>
      <div className={cn(styles.select__first, styles.select__selector)}>
        <label className={cn(styles.select__label)} tabIndex={0}>
          {uploadFirst && <img className={cn(styles.select__image)} src={String(uploadFirst)} alt="" />}

          <input
            className={cn("visually-hidden")}
            type="file"
            accept="image/*"
            onChange={(evt) => handleUpload(evt, "profileImageFirst", setUploadFirst)}
          />

          <ImageIcon />
        </label>

        {uploadFirst && (
          <button
            className={cn(styles.select__image__delete)}
            onClick={() => handleDelete("profileImageFirst", setUploadFirst)}
          >
            <Close />
          </button>
        )}
      </div>

      <div className={cn(styles.select__second, styles.select__selector)}>
        <label className={cn(styles.select__label)} tabIndex={0}>
          {uploadSecond && <img className={cn(styles.select__image)} src={String(uploadSecond)} alt="" />}

          <input
            className={cn("visually-hidden")}
            type="file"
            accept="image/*"
            onChange={(evt) => handleUpload(evt, "profileImageSecond", setUploadSecond)}
          />

          <ImageIcon />
        </label>

        {uploadSecond && (
          <button
            className={cn(styles.select__image__delete)}
            onClick={() => handleDelete("profileImageSecond", setUploadSecond)}
          >
            <Close />
          </button>
        )}
      </div>

      <div className={cn(styles.select__third, styles.select__selector)}>
        <label className={cn(styles.select__label)} tabIndex={0}>
          {uploadThird && <img className={cn(styles.select__image)} src={String(uploadThird)} alt="" />}

          <input
            className={cn("visually-hidden")}
            type="file"
            accept="image/*"
            onChange={(evt) => handleUpload(evt, "profileImageThirth", setUploadThird)}
          />

          <ImageIcon />
        </label>

        {uploadThird && (
          <button
            className={cn(styles.select__image__delete)}
            onClick={() => handleDelete("profileImageThirth", setUploadThird)}
          >
            <Close />
          </button>
        )}
      </div>

      <div className={cn(styles.select__fourth, styles.select__selector)}>
        <label className={cn(styles.select__label)} tabIndex={0}>
          {uploadFourth && <img className={cn(styles.select__image)} src={String(uploadFourth)} alt="" />}

          <input
            className={cn("visually-hidden")}
            type="file"
            accept="image/*"
            onChange={(evt) => handleUpload(evt, "profileImageFourth", setUploadFourth)}
          />

          <ImageIcon />
        </label>

        {uploadFourth && (
          <button
            className={cn(styles.select__image__delete)}
            onClick={() => handleDelete("profileImageFourth", setUploadFourth)}
          >
            <Close />
          </button>
        )}
      </div>
    </div>
  );
};
