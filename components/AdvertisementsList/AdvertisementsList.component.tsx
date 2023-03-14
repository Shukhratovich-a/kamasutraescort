import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper";
import cn from "classnames";

import { useMediaQuery } from "../../hooks";

import { AdvertisementsListProps } from "./AdvertisementsList.props";

import { Advertisement } from "..";

import "swiper/scss";
import "swiper/scss/free-mode";
import styles from "./AdvertisementsList.module.scss";

export const AdvertismentsList = ({ advertisements, ...props }: AdvertisementsListProps): JSX.Element => {
  const isMiddle = useMediaQuery("(max-width: 475px)");
  const isSmall = useMediaQuery("(max-width: 375px)");

  return (
    <div className={cn(styles.advertisements)} {...props}>
      <Swiper
        className={cn(styles.advertisements__list)}
        spaceBetween={isSmall ? 10 : isMiddle ? 15 : 20}
        grabCursor={true}
        freeMode={true}
        modules={[FreeMode]}
        slidesPerView={"auto"}
      >
        {advertisements.map((advertisement) => (
          <SwiperSlide className={cn(styles.advertisement)} key={advertisement.id}>
            <Advertisement advertisement={advertisement} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
