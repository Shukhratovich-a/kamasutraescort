import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { signOut, useSession } from "next-auth/react";
import { useTranslation } from "next-i18next";
import cn from "classnames";

import { profileMenu } from "../../helpers";

import ExitIcon from "../../assets/icons/exit.svg";

import styles from "./ProfileMenu.module.scss";

export const ProfileMenu = (): JSX.Element => {
  const { data: session } = useSession();
  const { t, i18n } = useTranslation();
  const router = useRouter();

  const { asPath } = router;

  return session ? (
    <div className={cn(styles["profile-menu"])}>
      <ul className={cn(styles.profile__list)}>
        {profileMenu.length > 0 &&
          profileMenu.map((item) => (
            <li className={cn(styles.profile__item)} key={item.id}>
              <Link
                className={cn(styles.profile__link, {
                  [styles["profile__link--active"]]:
                    item.name !== "advertisements"
                      ? asPath === `/profile/${session.user.username}${item.route}`
                      : asPath.startsWith(`/profile/${session.user.username}${item.route}`),
                })}
                href={`/profile/${session.user.username}${item.route}`}
              >
                {item.icon}
                <span>{t(`profile:${item.name}`)}</span>
              </Link>
            </li>
          ))}
      </ul>

      <button className={cn(styles.profile__link)} onClick={() => signOut({ callbackUrl: "/" + i18n.language })}>
        <ExitIcon />
        <span>{t(`profile:exit`)}</span>
      </button>
    </div>
  ) : (
    <></>
  );
};
