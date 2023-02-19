import Link from "next/link";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useTranslation } from "next-i18next";
import cn from "classnames";

import { HeaderProfileProps } from "./HeaderProfile.props";

import User from "../../assets/icons/profile.svg";

import styles from "./HeaderProfile.module.scss";

export const HeaderProfile = ({ className, ...props }: HeaderProfileProps): JSX.Element => {
  const { data: session } = useSession();
  const router = useRouter();
  const { asPath } = router;
  const { i18n } = useTranslation();

  return (
    <div className={cn(styles.profile, className)} {...props}>
      <Link
        className={cn(styles.profile__link, className, {
          [styles["profile__link--active"]]: asPath.startsWith("/profile"),
        })}
        href="/profile"
        locale={i18n.language}
      >
        <User className={cn(styles.profile__image)} />
        <span className={cn(styles.profile__name)}>{session && session.user.username}</span>
      </Link>
    </div>
  );
};
