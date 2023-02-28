import cn from "classnames";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper";

import { UserListProps } from "./UserList.props";

import { User } from "../User/User.component";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

import styles from "./UserList.module.scss";

export const UserList = ({ users, heading }: UserListProps) => {
  return (
    <div className={cn(styles.users)}>
      <h2 className={cn(styles.users__heading)}>{heading}</h2>

      <Swiper
        className={cn(styles.users__list)}
        slidesPerView={"auto"}
        spaceBetween={20}
        freeMode={true}
        grabCursor={true}
        modules={[FreeMode]}
      >
        {users.map((user) => (
          <SwiperSlide className={cn(styles.user__slide)} key={user.id}>
            <User className={cn(styles.user)} user={user} key={user.id} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
