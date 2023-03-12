import Swiper from "swiper";
import cn from "classnames";

import { AdvertisementsListProps } from "./AdvertisementsList.props";

import { Advertisement } from "..";

import styles from "./AdvertisementsList.module.scss";

export const AdvertismentsList = ({ advertisements, ...props }: AdvertisementsListProps): JSX.Element => {
  return (
    <div className={cn(styles.advertisements)} {...props}>
      <ul className={cn(styles.advertisements__list)}>
        {advertisements.map((advertisement) => (
          <li className={cn(styles.advertisement)}>
            <Advertisement advertisement={advertisement} />
          </li>
        ))}
      </ul>
    </div>
  );
};
