import { useRouter } from "next/router";
import { motion } from "framer-motion";
import cn from "classnames";

import { leftBig, leftMedium, leftSmall, rightBig, rightMedium, rightSmall } from "../../helpers";

import VectorLeft from "../../assets/background/vector-big.svg";
import VectorRight from "../../assets/background/vector-small.svg";

import styles from "./BgVectors.module.scss";

export const Vectors = (): JSX.Element => {
  const router = useRouter();

  const { pathname } = router;

  const variantsLeft =
    typeof window !== "undefined" &&
    (window.innerWidth <= 650 ? leftSmall : window.innerWidth <= 1000 ? leftMedium : leftBig);

  const variantsRight =
    typeof window !== "undefined" &&
    (window.innerWidth <= 650 ? rightSmall : window.innerWidth <= 1000 ? rightMedium : rightBig);

  return router.asPath.startsWith("/auth") ? (
    <>
      <motion.svg
        className={cn(styles.background)}
        variants={variantsLeft || leftBig}
        animate={pathname === "/auth/login" ? "login" : "register"}
        initial={pathname === "/auth/login" ? "register" : "login"}
        transition={{ type: "spring", stiffness: 100 }}
      >
        <VectorLeft />
      </motion.svg>

      <motion.svg
        className={cn(styles.background)}
        variants={variantsRight || rightBig}
        animate={pathname === "/auth/login" ? "login" : "register"}
        initial={pathname === "/auth/login" ? "register" : "login"}
        transition={{ type: "spring", stiffness: 100 }}
      >
        <VectorRight />
      </motion.svg>
    </>
  ) : (
    <></>
  );
};
