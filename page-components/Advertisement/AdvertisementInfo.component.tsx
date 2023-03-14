import cn from "classnames";
import { useTranslation } from "next-i18next";
import { format } from "date-fns";
import { ru, enUS } from "date-fns/locale";

import { API, calculateFullAge } from "../../helpers";

import { AdvertisementInfoProps } from "./AdvertisementInfo.props";

import styles from "./AdvertisementInfo.module.scss";

export const AdvertisementInfo = ({ advertisement, ...props }: AdvertisementInfoProps): JSX.Element => {
  const { years } = calculateFullAge(new Date(advertisement.birthDate));

  const { t, i18n } = useTranslation();

  const renderImages = (): JSX.Element => {
    if (!advertisement.images) return <div></div>;

    const { first, second, third, fourth } = advertisement.images;

    return (
      <>
        {first && <img className={cn(styles.advertisement__image)} src={API.images.get(first)} alt="" />}
        {second && <img className={cn(styles.advertisement__image)} src={API.images.get(second)} alt="" />}
        {third && <img className={cn(styles.advertisement__image)} src={API.images.get(third)} alt="" />}
        {fourth && <img className={cn(styles.advertisement__image)} src={API.images.get(fourth)} alt="" />}
      </>
    );
  };

  return (
    <div className={cn(styles.advertisement)} {...props}>
      <div className={cn(styles.advertisement__left)}>{renderImages()}</div>

      <div className={cn(styles.advertisement__right)}>
        <h2 className={cn(styles.advertisement__heading)}>
          {advertisement.advName} {years}
        </h2>

        {advertisement.fullname && (
          <div className={cn(styles.advertisement__item, styles["advertisement__item--big"])}>
            <span className={cn(styles.advertisement__item__heading)}>{t("advertisement:fullname.name")}</span>
            <span className={cn(styles.advertisement__item__text)}>{advertisement.fullname}</span>
          </div>
        )}

        <ul className={cn(styles.advertisement__list)}>
          <li className={cn(styles.advertisement__item)}>
            <span className={cn(styles.advertisement__item__heading)}>{t("advertisement:birth-date")}</span>
            <span className={cn(styles.advertisement__item__text)}>
              {format(new Date(advertisement.birthDate), "dd.LL.yyyy")}
            </span>
          </li>

          <li className={cn(styles.advertisement__item)}>
            <span className={cn(styles.advertisement__item__heading)}>{t("advertisement:region.name")}</span>
            <span className={cn(styles.advertisement__item__text)}>
              {i18n.language === "ru" ? advertisement.region.nameRu : advertisement.region.nameEn}
            </span>
          </li>

          {advertisement.type && (
            <li className={cn(styles.advertisement__item)}>
              <span className={cn(styles.advertisement__item__heading)}>{t("advertisement:type")}</span>
              <span className={cn(styles.advertisement__item__text)}>{t(`type:${advertisement.type}`)}</span>
            </li>
          )}

          {advertisement.height && (
            <li className={cn(styles.advertisement__item)}>
              <span className={cn(styles.advertisement__item__heading)}>{t("advertisement:height.name")}</span>
              <span className={cn(styles.advertisement__item__text)}>{advertisement.height}</span>
            </li>
          )}

          {advertisement.weight && (
            <li className={cn(styles.advertisement__item)}>
              <span className={cn(styles.advertisement__item__heading)}>{t("advertisement:weight.name")}</span>
              <span className={cn(styles.advertisement__item__text)}>{advertisement.weight}</span>
            </li>
          )}

          {advertisement.eyeColor && (
            <li className={cn(styles.advertisement__item)}>
              <span className={cn(styles.advertisement__item__heading)}>{t("advertisement:eye-color.name")}</span>
              <span className={cn(styles.advertisement__item__text)}>
                {i18n.language === "ru" ? advertisement.eyeColor.nameRu : advertisement.eyeColor.nameEn}
              </span>
            </li>
          )}

          {advertisement.hairColor && (
            <li className={cn(styles.advertisement__item)}>
              <span className={cn(styles.advertisement__item__heading)}>{t("advertisement:hair-color.name")}</span>
              <span className={cn(styles.advertisement__item__text)}>
                {i18n.language === "ru" ? advertisement.hairColor.nameRu : advertisement.hairColor.nameEn}
              </span>
            </li>
          )}
        </ul>

        {advertisement.about && (
          <div className={cn(styles.advertisement__about)}>
            <span className={cn(styles.advertisement__about__heading)}>{t("advertisement:about.name")}</span>

            {advertisement.about.split("\n").map((text, index) => (
              <p className={cn(styles.advertisement__about__text)} key={index}>
                {text}
              </p>
            ))}
          </div>
        )}

        <time className={cn(styles.advertisement__time)}>
          На сайте с{" "}
          {format(new Date(advertisement.createdAt), "dd LLLL yyyy", { locale: i18n.language === "ru" ? ru : enUS })}
        </time>
      </div>
    </div>
  );
};
