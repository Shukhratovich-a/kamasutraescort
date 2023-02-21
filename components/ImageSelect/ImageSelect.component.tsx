import cn from "classnames";

import { ImageSelectProps } from "./ImageSelect.props";

import ImageIcon from "../../assets/icons/image.svg";

import styles from "./ImageSelect.module.scss";

export const ImageSelect = ({ ...props }: ImageSelectProps) => {
  return (
    <div className={cn(styles.select)} {...props}>
      <div className={cn(styles.select__first, styles.select__image)} tabIndex={0}>
        <ImageIcon />
      </div>

      <div className={cn(styles.select__second, styles.select__image)} tabIndex={0}>
        <ImageIcon />
      </div>
      <div className={cn(styles.select__third, styles.select__image)} tabIndex={0}>
        <ImageIcon />
      </div>
      <div className={cn(styles.select__fourth, styles.select__image)} tabIndex={0}>
        <ImageIcon />
      </div>
    </div>
  );
};
