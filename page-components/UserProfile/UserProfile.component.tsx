import cn from "classnames";
import { useTranslation } from "next-i18next";

import { calculateFullAge, DOMAIN } from "../../helpers";

import { UserProfileProps } from "./UserProfile.props";

import { Container } from "../../components";

import styles from "./UserProfile.module.scss";
import { format } from "date-fns";

export const UserProfile = ({ user, ...props }: UserProfileProps): JSX.Element => {
  const { t, i18n } = useTranslation();

  const { years } = calculateFullAge(user.birthDate);

  return (
    <Container>
      <div className={cn(styles.profile)} {...props}>
        {/* <div className={cn(styles.profile__images)}>
          <div className={cn(styles.profile__image, styles["profile__image--first"])}>
            {user.images?.profileImageFirst && (
              <img src={`${DOMAIN}/${user.images.profileImageFirst}`} alt={user.about} width={380} height={500} />
            )}
          </div>
          <div className={cn(styles.profile__image, styles["profile__image--second"])}>
            {user.images?.profileImageSecond && (
              <img src={`${DOMAIN}/${user.images.profileImageSecond}`} alt={user.about} width={380} height={500} />
            )}
          </div>
          <div className={cn(styles.profile__image, styles["profile__image--third"])}>
            {user.images?.profileImageThirth && (
              <img src={`${DOMAIN}/${user.images.profileImageThirth}`} alt={user.about} width={380} height={500} />
            )}
          </div>
          <div className={cn(styles.profile__image, styles["profile__image--fourth"])}>
            {user.images?.profileImageFourth && (
              <img src={`${DOMAIN}/${user.images.profileImageFourth}`} alt={user.about} width={380} height={500} />
            )}
          </div>
        </div> */}

        <div className={cn(styles.profile__info)}>
          <h3 className={cn(styles.profile__username)}>
            {user.username} {years}
          </h3>

          {/* <ul className={cn(styles.profile__list)}>
            {user.fullname && (
              <li className={cn(styles.profile__item)}>
                <span className={cn(styles.profile__text)}>полное имя</span>

                <span className={cn(styles.profile__text, styles.profile__fullname)}>{user.fullname}</span>
              </li>
            )}
            {user.gender && (
              <li className={cn(styles.profile__item)}>
                <span className={cn(styles.profile__text)}>пол</span>

                <span className={cn(styles.profile__text)}>{t(`gender:${user.gender}`)}</span>
              </li>
            )}
            {user.region && (
              <li className={cn(styles.profile__item)}>
                <span className={cn(styles.profile__text)}>регион</span>

                <span className={cn(styles.profile__text)}>
                  {i18n.language === "ru" ? user.region.nameRu : user.region.nameEn}
                </span>
              </li>
            )}
            {user.height && (
              <li className={cn(styles.profile__item)}>
                <span className={cn(styles.profile__text)}>Рост</span>

                <span className={cn(styles.profile__text)}>{user.height}</span>
              </li>
            )}
            {user.weight && (
              <li className={cn(styles.profile__item)}>
                <span className={cn(styles.profile__text)}>Вес</span>

                <span className={cn(styles.profile__text)}>{user.weight}</span>
              </li>
            )}
            {user.eyeColor && (
              <li className={cn(styles.profile__item)}>
                <span className={cn(styles.profile__text)}>Цвет глаз</span>

                <span className={cn(styles.profile__text)}>
                  {i18n.language === "ru" ? user.eyeColor.nameRu : user.eyeColor.nameEn}
                </span>
              </li>
            )}
            {user.hairColor && (
              <li className={cn(styles.profile__item)}>
                <span className={cn(styles.profile__text)}>Цвет волос</span>

                <span className={cn(styles.profile__text)}>
                  {i18n.language === "ru" ? user.hairColor.nameRu : user.hairColor.nameEn}
                </span>
              </li>
            )}
            {user.goal && (
              <li className={cn(styles.profile__item)}>
                <span className={cn(styles.profile__text)}>Цель знакомства</span>

                <span className={cn(styles.profile__text)}>{user.goal}</span>
              </li>
            )}
          </ul> */}

          {/* {user.about && (
            <div className={cn(styles.profile__about)}>
              <h4 className={cn(styles.profile__about__heading)}>О себе</h4>

              <p className={cn(styles.profile__about__text)}>{user.about}</p>
            </div>
          )} */}

          {/* {user.createdAt && (
            <div className={cn(styles.profile__time)}>
              <span>На сайте с </span>

              <time dateTime={format(new Date(user.createdAt), "dd-MM-yyyy")}>
                {format(new Date(user.createdAt), "dd.MM.yyyy")}
              </time>
            </div>
          )} */}
        </div>
      </div>
    </Container>
  );
};
