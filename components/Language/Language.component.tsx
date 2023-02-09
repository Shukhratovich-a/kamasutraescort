import React from "react";
import cn from "classnames";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";

import { LanguageProps } from "./Language.props";

import Marker from "./marker.svg";

import styles from "./Language.module.scss";

export const Language = ({ className, language, languages = ["ru", "en"], ...props }: LanguageProps): JSX.Element => {
  const { i18n } = useTranslation();
  const router = useRouter();
  const { pathname, asPath, query } = router;

  const [languageState, setLanguageState] = React.useState<string>(language);
  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  React.useEffect(() => {
    setIsOpen(false);
    setLanguageState(language);
  }, [language]);

  const handleChange = (lang: string) => {
    setLanguageState(lang);
    setIsOpen(false);

    router.push({ pathname, query }, asPath, { locale: lang });

    return i18n.changeLanguage(lang);
  };

  return (
    <div className={cn(styles.language, className)} {...props}>
      <span className={cn(styles["language--selected"])} onClick={() => setIsOpen(!isOpen)}>
        <span>{language}</span>
        <Marker />
      </span>

      <span
        className={cn(styles["language__list"], {
          [styles["language__list--open"]]: isOpen,
        })}
      >
        {languages.map(
          (lang) =>
            lang !== languageState && (
              <span className={cn(styles.language__list__item)} key={lang} onClick={() => handleChange(lang)}>
                {lang}
              </span>
            )
        )}
      </span>
    </div>
  );
};
