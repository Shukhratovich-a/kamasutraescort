import cn from "classnames";

import { AuthHomePageProps } from "./AuthHomePage.props";

import { UserList } from "../../components/UserList/UserList.component";

import styles from "./AuthHomePage.module.scss";

export const AuthHomePage = ({ session, men, women }: AuthHomePageProps): JSX.Element => {
  return (
    <div className={cn(styles.home)}>
      {/* {session?.user.gender === "female"
        ? women?.length && <UserList users={women} heading={"Ищу девушку"} />
        : men?.length && <UserList users={men} heading={"Ищу парня"} />}

      {session?.user.gender === "male"
        ? women?.length && <UserList users={women} heading={"Ищу девушку"} />
        : men && <UserList users={men} heading={"Ищу парня"} />} */}
    </div>
  );
};
