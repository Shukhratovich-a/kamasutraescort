import Link from "next/link";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useTranslation } from "next-i18next";
import React from "react";
import cn from "classnames";

import { DOMAIN } from "../../helpers";

import { HeaderProfileProps } from "./HeaderProfile.props";

import User from "../../assets/icons/profile.svg";

import styles from "./HeaderProfile.module.scss";

export const HeaderProfile = ({ className, isMobile = false, ...props }: HeaderProfileProps): JSX.Element => {
  const { data: session } = useSession();
  const router = useRouter();
  const { asPath } = router;
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
          [styles["profile__link--active"]]: asPath.startsWith(`/${session?.user.username}`),
        })}
        href={asPath.startsWith(`/${session?.user.username}`) ? asPath : `/${session?.user.username}`}
        locale={i18n.language}
      >
        {session?.user.avatar ? (
          <img
            className={cn(styles.profile__image)}
            src={`${DOMAIN}/files/avatar/${session.user.avatar.filename}`}
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
