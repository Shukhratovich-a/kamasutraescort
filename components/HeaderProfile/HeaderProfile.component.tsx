import Link from "next/link";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useTranslation } from "next-i18next";
import React from "react";
import cn from "classnames";

import { HeaderProfileProps } from "./HeaderProfile.props";

import User from "../../assets/icons/profile.svg";

import styles from "./HeaderProfile.module.scss";
import { DOMAIN } from "../../helpers";
import axios from "axios";
// import Image from "next/image";

export const HeaderProfile = ({ className, ...props }: HeaderProfileProps): JSX.Element => {
  const { data: session } = useSession();
  const router = useRouter();
  const { asPath } = router;
  const { i18n } = useTranslation();
  const [withImage, setWithImage] = React.useState(false);

  const fetchImage = React.useCallback(async () => {
    try {
      if (!session) return;

      const { data } = await axios.get(`${DOMAIN}/${session.user.images?.avatar}`);
      if (data) setWithImage(data);
    } catch {
      setWithImage(false);
    }
  }, [session]);

  React.useEffect(() => {
    fetchImage();
  }, [fetchImage]);

  return (
    <div className={cn(styles.profile, className)} {...props}>
      <Link
        className={cn(styles.profile__link, className, {
          [styles["profile__link--active"]]: asPath.startsWith(`/${session?.user.username}`),
        })}
        href={
          asPath.startsWith(`/${session?.user.username}`) ? asPath : `/${session?.user.username}`
        }
        locale={i18n.language}
      >
        {withImage && session ? (
          <img
            className={cn(styles.profile__image)}
            src={`${DOMAIN}/${session.user.images?.avatar}`}
            width={40}
            height={40}
            alt={session.user.username}
          />
        ) : (
          <User className={cn(styles.profile__image)} />
        )}

        <span className={cn(styles.profile__name)}>{session && session.user.username}</span>
      </Link>
    </div>
  );
};
