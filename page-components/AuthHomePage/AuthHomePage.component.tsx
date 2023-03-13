import cn from "classnames";

import { AuthHomePageProps } from "./AuthHomePage.props";

import { AdvertismentsList, Container } from "../../components";

import styles from "./AuthHomePage.module.scss";

export const AuthHomePage = ({ session, men, women, others }: AuthHomePageProps): JSX.Element => {
  return (
    <Container>
      <div className={cn(styles.home)}>
        {men && men?.length > 0 && (
          <div className={cn(styles.home__inner)}>
            <h3 className={cn(styles.home__heading)}>Мужчины</h3>

            <AdvertismentsList advertisements={men} />
          </div>
        )}

        {women && women?.length > 0 && (
          <div className={cn(styles.home__inner)}>
            <h3 className={cn(styles.home__heading)}>Ищу парня</h3>

            <AdvertismentsList advertisements={women} />
          </div>
        )}

        {others && others?.length > 0 && <AdvertismentsList advertisements={others} />}
      </div>
    </Container>
  );
};
