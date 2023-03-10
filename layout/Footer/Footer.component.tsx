import Link from "next/link";
import { format } from "date-fns";
import { useTranslation } from "next-i18next";
import cn from "classnames";

import { FooterProps } from "./Footer.props";

import { Container, Language } from "../../components";

import styles from "./Footer.module.scss";

export const Footer = ({ className, ...props }: FooterProps): JSX.Element => {
  const { t, i18n } = useTranslation();

  return (
    <footer className={cn(styles.footer, className)} {...props}>
      <Container className={cn(styles.footer__container)}>
        <div className={cn(styles.footer__wrapper)}>
          <ul className={cn(styles.footer__nav)}>
            <li className={cn(styles.footer__item)}>
              <Link className={cn(styles.footer__link)} href={"/about"} locale={i18n.language}>
                {t("footer:about")}
              </Link>
            </li>
            <li className={cn(styles.footer__item)}>
              <Link className={cn(styles.footer__link)} href={"/support"} locale={i18n.language}>
                {t("footer:support")}
              </Link>
            </li>
            <li className={cn(styles.footer__item)}>
              <Link className={cn(styles.footer__link)} href={"/advice"} locale={i18n.language}>
                {t("footer:advice")}
              </Link>
            </li>
            <li className={cn(styles.footer__item)}>
              <Link className={cn(styles.footer__link)} href={"/contacts"} locale={i18n.language}>
                {t("footer:contacts")}
              </Link>
            </li>
            <li className={cn(styles.footer__item)}>
              <Link className={cn(styles.footer__link)} href={"/pay-policy"} locale={i18n.language}>
                {t("footer:pay-policy")}
              </Link>
            </li>
          </ul>

          <div className={cn(styles.footer__personal)}>
            <Link className={cn(styles.footer__link)} href={"/personal"} locale={i18n.language}>
              {t("footer:personal")}
            </Link>
          </div>

          <div className={cn(styles.footer__language)}>
            <Language language={i18n.language} />
          </div>

          <div className={cn(styles.footer__copyright)}>
            <span>Kamasutraescort ?? 2021 - {format(new Date(), "yyyy")}</span>
          </div>
        </div>
      </Container>
    </footer>
  );
};
