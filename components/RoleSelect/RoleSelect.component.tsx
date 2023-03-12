import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import cn from "classnames";

import { RoleSelectProps } from "./RoleSelect.props";

import User from "../../assets/roleIcons/user.svg";
import Advertiser from "../../assets/roleIcons/advertiser.svg";

import { Button, Modal } from "..";

import styles from "./RoleSelect.module.scss";

export const RoleSelect = ({ isOpen, setIsOpen, ...props }: RoleSelectProps): JSX.Element => {
  const { t, i18n } = useTranslation();

  const { pathname, push, replace } = useRouter();

  const handleClose = () => {
    if (!setIsOpen) return;

    push(pathname, pathname, { locale: i18n.language });
    setIsOpen(false);
  };

  return (
    <Modal className={cn(styles.select)} setIsOpen={handleClose} isOpen={isOpen} border={50} {...props}>
      <ul className={cn(styles.select__list)}>
        <li className={cn(styles.select__item)}>
          <h3 className={cn(styles.select__item__heading)}>User</h3>

          <User className={cn(styles.select__item__image)} />

          <p className={cn(styles.select__item__text)}>Keep updated on activity in your area!</p>

          <Button
            className={cn(styles.select__item__button)}
            appearance="primary"
            onClick={() => replace("/auth/register/user", "/auth/register/user", { locale: i18n.language })}
          >
            {t("auth:register")}
          </Button>
        </li>

        <li className={cn(styles.select__item)}>
          <h3 className={cn(styles.select__item__heading)}>Advertiser</h3>

          <Advertiser className={cn(styles.select__item__image)} />

          <p className={cn(styles.select__item__text)}>Get listed for free today!</p>

          <Button
            className={cn(styles.select__item__button)}
            appearance="secondary"
            onClick={() => replace("/auth/register/advertiser", "/auth/register/advertiser", { locale: i18n.language })}
          >
            {t("auth:register")}
          </Button>
        </li>
      </ul>
    </Modal>
  );
};
