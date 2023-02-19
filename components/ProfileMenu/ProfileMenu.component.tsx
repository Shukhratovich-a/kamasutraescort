import cn from "classnames";

import styles from "./ProfileMenu.module.scss";

export const ProfileMenu = () => {
  return (
    <div className={cn(styles["profile--menu"])}>
      <ul className={cn(styles.profile__list)}>
        <li></li>
      </ul>

      <button></button>
    </div>
  );
};
