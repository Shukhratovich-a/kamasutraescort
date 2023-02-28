import cn from "classnames";

import { ImageSelectProps } from "./ImageSelect.props";

import ImageIcon from "../../assets/icons/image.svg";

import styles from "./ImageSelect.module.scss";
import { DOMAIN } from "../../helpers";

export const ImageSelect = ({ firstImage, secondImage, thirdImage, fourthImage, ...props }: ImageSelectProps) => {
  return (
    <div className={cn(styles.select)} {...props}>
      <div className={cn(styles.select__first, styles.select__selector)} tabIndex={0}>
        {firstImage && <img className={cn(styles.select__image)} src={`${DOMAIN}/${firstImage}`} alt="" />}

        <ImageIcon />
      </div>

      <div className={cn(styles.select__second, styles.select__selector)} tabIndex={0}>
        {secondImage && <img className={cn(styles.select__image)} src={`${DOMAIN}/${secondImage}`} alt="" />}

        <ImageIcon />
      </div>

      <div className={cn(styles.select__third, styles.select__selector)} tabIndex={0}>
        {thirdImage && <img className={cn(styles.select__image)} src={`${DOMAIN}/${thirdImage}`} alt="" />}

        <ImageIcon />
      </div>

      <div className={cn(styles.select__fourth, styles.select__selector)} tabIndex={0}>
        {fourthImage && <img className={cn(styles.select__image)} src={`${DOMAIN}/${fourthImage}`} alt="" />}

        <ImageIcon />
      </div>
    </div>
  );
};
