import React from "react";
import { signIn, useSession } from "next-auth/react";
import axios from "axios";
import cn from "classnames";

import { API } from "../../helpers";

import { AvatarSelectProps } from "./AvatarSelect.props";

import { Modal } from "..";

import User from "../../assets/icons/profile.svg";

import styles from "./AvatarSelect.module.scss";

export const AvatarSelect = ({ avatar, ...props }: AvatarSelectProps) => {
  const { data: session } = useSession();

  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const [isHover, setIsHover] = React.useState<boolean>(false);

  const [file, setFile] = React.useState<string>(avatar ? API.avatar.get(avatar.filename) : "");

  const inputRef: React.Ref<HTMLInputElement> = React.useRef(null);

  const handleUpload = () => {
    inputRef.current?.click();
  };

  const handleDelete = async () => {
    setFile("");
    if (!session) return;

    try {
      const { data: avatar } = await axios({
        method: "delete",
        url: API.avatar.upload(session.user.id),
      });

      if (avatar.status === 200) {
        const data = await signIn("credentials", {
          token: session?.token,
          redirect: false,
          callbackUrl: "/",
        });

        if (data?.status === 200) {
          handleClose();
          setIsHover(false);
        }
      }
    } catch {
      handleClose();
      setIsHover(false);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !session) {
      return;
    }

    try {
      const image = e.target.files[0];
      setFile(URL.createObjectURL(image));

      const formData = new FormData();
      formData.append("avatar", image);

      const { data: avatar } = await axios({
        method: "patch",
        url: API.avatar.upload(session.user.id),
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (avatar.status === 200) {
        const data = await signIn("credentials", {
          token: session?.token,
          redirect: false,
          callbackUrl: "/",
        });

        if (data?.status === 200) {
          handleClose();
          setIsHover(false);
        }
      }
    } catch {
      handleClose();
      setIsHover(false);
    }
  };

  const handleClose = () => {
    if (!isOpen) return;

    setIsOpen(false);
    setIsHover(false);
  };

  const handleMouseEnter = () => {
    setIsHover(true);
  };

  const handleMouseLeave = () => {
    if (isOpen) return;

    setIsHover(false);
  };

  return (
    <>
      <Modal className={cn(styles.select__modal)} isOpen={isOpen} setIsOpen={setIsOpen}>
        <h4 className={cn(styles.select__modal__heading)}>Change profile photo</h4>

        <div>
          <button
            className={cn(styles.select__modal__button, styles["select__modal__button--upload"])}
            onClick={handleUpload}
          >
            upload a photo
          </button>

          <button
            className={cn(styles.select__modal__button, styles["select__modal__button--cancel"])}
            onClick={handleDelete}
          >
            delete current photo
          </button>

          <button className={cn(styles.select__modal__button)} onClick={handleClose}>
            cancel
          </button>
        </div>
      </Modal>

      <div
        className={cn(styles.select, {
          [cn(styles["select--hover"])]: isHover,
        })}
        {...props}
        onClick={file ? () => setIsOpen(true) : handleUpload}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {session?.user.avatar ? (
          <img className={cn(styles.select__image)} src={file} alt="" width={250} height={250} />
        ) : (
          <User />
        )}

        <input
          className={cn("visually-hidden")}
          type="file"
          ref={inputRef}
          onChange={handleFileChange}
          name="Favatar"
          placeholder="select avatar"
        />
      </div>
    </>
  );
};
