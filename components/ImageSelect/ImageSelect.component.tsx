import React from "react";
import cn from "classnames";

import { ImageSelectProps } from "./ImageSelect.props";

// import { DOMAIN } from "../../helpers";

import ImageIcon from "../../assets/icons/image.svg";

import styles from "./ImageSelect.module.scss";

export const ImageSelect = React.forwardRef(
  (
    { className, image, setImage, url, border = 30, ...props }: ImageSelectProps,
    ref: React.Ref<HTMLDivElement>
  ): JSX.Element => {
    const [newUrl, setNewUrl] = React.useState<string | null>(url ? url : null);

    const [isHover, setIsHover] = React.useState<boolean>(false);

    const inputRef: React.Ref<HTMLInputElement> = React.useRef(null);

    const handleUpload = () => {
      if (image) return;

      inputRef.current?.click();
    };

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!e.target.files || !setImage) return;

      const newImage = e.target.files[0];
      setImage(newImage);
      setNewUrl(URL.createObjectURL(newImage));
    };

    const handleMouseEnter = () => {
      setIsHover(true);
    };

    const handleMouseLeave = () => {
      setIsHover(false);
    };

    return (
      <>
        <div
          className={cn(styles.select, styles[`select--${border}`], className)}
          ref={ref}
          onClick={handleUpload}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          {...props}
        >
          {newUrl && (
            <div
              className={cn(styles.select__modal, {
                [styles["select__modal--open"]]: isHover,
              })}
            ></div>
          )}

          {newUrl && <img className={cn(styles.select__image)} src={newUrl} alt="" />}

          <ImageIcon className={cn(styles.select__icon)} />

          <input className={cn("visually-hidden")} ref={inputRef} type="file" onChange={handleFileChange} />
        </div>
      </>
    );
  }
);
