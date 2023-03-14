import Link from "next/link";
import { useTranslation } from "next-i18next";
import cn from "classnames";

import { AuthHomePageProps } from "./AuthHomePage.props";

import { AdvertismentsList, Container } from "../../components";

import styles from "./AuthHomePage.module.scss";

export const AuthHomePage = ({ session, man, woman, shemale, massage }: AuthHomePageProps): JSX.Element => {
  const { i18n } = useTranslation();

  return (
    <Container>
      <div className={cn(styles.home)}>
        {man && man?.length > 0 && (
          <div className={cn(styles.home__inner)}>
            <h3 className={cn(styles.home__heading)}>
              <Link href={{ pathname: "/advertisements", query: { type: "man" } }} locale={i18n.language}>
                Мужчины
              </Link>
            </h3>

            <AdvertismentsList advertisements={man} />
          </div>
        )}

        {woman && woman?.length > 0 && (
          <div className={cn(styles.home__inner)}>
            <h3 className={cn(styles.home__heading)}>
              <Link href={{ pathname: "/advertisements", query: { type: "woman" } }} locale={i18n.language}>
                Ищу парня
              </Link>
            </h3>

            <AdvertismentsList advertisements={woman} />
          </div>
        )}

        {shemale && shemale?.length > 0 && (
          <div className={cn(styles.home__inner)}>
            <h3 className={cn(styles.home__heading)}>
              <Link href={{ pathname: "/advertisements", query: { type: "shemale" } }} locale={i18n.language}>
                Shemale
              </Link>
            </h3>

            <AdvertismentsList advertisements={shemale} />
          </div>
        )}

        {massage && massage?.length > 0 && (
          <div className={cn(styles.home__inner)}>
            <h3 className={cn(styles.home__heading)}>
              <Link href={{ pathname: "/advertisements", query: { type: "massage" } }} locale={i18n.language}>
                Massage
              </Link>
            </h3>

            <AdvertismentsList advertisements={massage} />
          </div>
        )}
      </div>
    </Container>
  );
};
