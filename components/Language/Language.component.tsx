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
  const langRef: React.RefObject<HTMLDivElement> = React.useRef(null);

  React.useEffect(() => {
    setIsOpen(false);
    setLanguageState(language);
  }, [language]);

  React.useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function handleClickOutside(evt: any) {
      if (langRef?.current && !langRef?.current.contains(evt.target)) {
        setIsOpen(false);
      }
    }

    if (!isOpen) return;

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [langRef, isOpen]);

  const handleChange = (lang: string) => {
    setLanguageState(lang);
    setIsOpen(false);

    router.push({ pathname, query }, asPath, { locale: lang });

    return i18n.changeLanguage(lang);
  };

  const handleSpaceToOpen = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.code != "Space") return;
    setIsOpen(!isOpen);
  };

  const handleSpaceToSelect = (e: React.KeyboardEvent<HTMLSpanElement>, lang: string) => {
    if (e.code == "Tab") return setIsOpen(false);

    if (e.code != "Space") return;

    setLanguageState(lang);
    setIsOpen(false);

    router.push({ pathname, query }, asPath, { locale: lang });

    return i18n.changeLanguage(lang);
  };

  return (
    <div
      className={cn(styles.language, className)}
      {...props}
      tabIndex={0}
      onKeyDown={(e) => handleSpaceToOpen(e)}
      ref={langRef}
    >
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
              <span
                className={cn(styles.language__list__item)}
                key={lang}
                tabIndex={1}
                onClick={() => handleChange(lang)}
                onKeyDown={(e) => handleSpaceToSelect(e, lang)}
              >
                {lang}
              </span>
            )
        )}
      </span>
    </div>
  );
};
