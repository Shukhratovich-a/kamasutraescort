import Link from "next/link";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useTranslation } from "next-i18next";
import React from "react";
import cn from "classnames";

import { API } from "../../helpers";

import { HeaderProfileProps } from "./HeaderProfile.props";

import User from "../../assets/icons/profile.svg";

import styles from "./HeaderProfile.module.scss";

export const HeaderProfile = ({ className, isMobile = false, ...props }: HeaderProfileProps): JSX.Element => {
  const { data: session } = useSession();
  const { asPath } = useRouter();
  const { i18n } = useTranslation();

  return (
    <div
      className={cn(styles.profile, className, {
        [styles["profile--mobile"]]: isMobile,
      })}
      {...props}
    >
      <Link
        className={cn(styles.profile__link, className, {
          [styles["profile__link--active"]]: asPath.startsWith(`/profile/${session?.user.username}`),
        })}
        href={asPath.startsWith(`/profile/${session?.user.username}`) ? asPath : `/profile/${session?.user.username}`}
        locale={i18n.language}
      >
        {session?.user.avatar ? (
          <img
            className={cn(styles.profile__image)}
            src={API.avatar.get(session.user.avatar.filename)}
            width={40}
            height={40}
            alt={session.user.username}
          />
        ) : (
          <User className={cn(styles.profile__image)} />
        )}

        {!isMobile && <span className={cn(styles.profile__name)}>{session && session.user.username}</span>}
      </Link>
    </div>
  );
};
