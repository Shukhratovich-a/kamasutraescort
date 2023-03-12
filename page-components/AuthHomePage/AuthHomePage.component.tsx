import cn from "classnames";

import { AuthHomePageProps } from "./AuthHomePage.props";

import { AdvertismentsList, Container } from "../../components";

import styles from "./AuthHomePage.module.scss";

export const AuthHomePage = ({ session, men, women, others }: AuthHomePageProps): JSX.Element => {
  return (
    <Container>
      <div className={cn(styles.home)}>
        {men && <AdvertismentsList advertisements={men} />}
        {women && <AdvertismentsList advertisements={women} />}
        {others && <AdvertismentsList advertisements={others} />}
      </div>
    </Container>
  );
};
