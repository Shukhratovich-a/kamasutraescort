import cn from "classnames";
import { format } from "date-fns";
import Link from "next/link";
import { useTranslation } from "next-i18next";

import { FooterProps } from "./Footer.props";

import { Container, Language } from "../../components";

import styles from "./Footer.module.scss";

export const Footer = ({ className, ...props }: FooterProps): JSX.Element => {
  const { t, i18n } = useTranslation();

  return (
    <footer className={cn(styles.footer, className)} {...props}>
      <Container className={cn(styles.footer__container)}>
        <div className={cn(styles.footer__wrapper)}>
          <div className={cn(styles.footer__nav)}>
            <Link className={cn(styles.footer__link)} href={"/about"} locale={i18n.language}>
              {t("footer:about")}
            </Link>
            <Link className={cn(styles.footer__link)} href={"/about"} locale={i18n.language}>
              {t("footer:support")}
            </Link>
            <Link className={cn(styles.footer__link)} href={"/about"} locale={i18n.language}>
              {t("footer:advice")}
            </Link>
            <Link className={cn(styles.footer__link)} href={"/about"} locale={i18n.language}>
              {t("footer:contacts")}
            </Link>
            <Link className={cn(styles.footer__link)} href={"/about"} locale={i18n.language}>
              {t("footer:pay-policy")}
            </Link>
          </div>

          <div className={cn(styles.footer__personal)}>
            <span>{t("footer:personal")}</span>
          </div>

          <div className={cn(styles.footer__language)}>
            <Language language={i18n.language} />
          </div>

          <div className={cn(styles.footer__copyright)}>
            <span>Kamasutraescort © 2021 - {format(new Date(), "yyyy")}</span>
          </div>
        </div>
      </Container>
    </footer>
  );
};
