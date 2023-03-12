import React from "react";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";
import { useTranslation } from "next-i18next";
import { useForm } from "react-hook-form";
import axios from "axios";
import cn from "classnames";

import { API } from "../../helpers";
import { AuthResponceInterface, LoginInterface } from "../../interfaces";

import { LoginFormProps } from "./LoginForm.props";
import { ILoginForm } from "./LoginForm.interface";

import { Button, Input } from "../../components";

import styles from "./LoginForm.module.scss";

export const LoginForm = ({ className, ...props }: LoginFormProps): JSX.Element => {
  const { t, i18n } = useTranslation();
  const router = useRouter();

  const [isLoading, setLoading] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginForm>();

  const onSubmit = async (formData: ILoginForm) => {
    setLoading(true);

    const body: LoginInterface = {
      usernameOrEmail: formData.username,
      password: formData.password,
    };

    try {
      const { data: user } = await axios.patch<AuthResponceInterface>(API.auth.login, { ...body });

      if (user.status === 200) {
        const data = await signIn("credentials", {
          token: user.accessToken,
          redirect: false,
          callbackUrl: "/",
        });

        if (data?.status === 200) {
          router.push("/", "/", { locale: i18n.language });
          setLoading(false);
        } else {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    } catch {
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      className={cn(styles["login-form"], className)}
      onSubmit={handleSubmit(onSubmit)}
      {...props}
      autoComplete={"off"}
    >
      <Input
        {...register("username", { required: { value: true, message: "Заполните имя" } })}
        error={errors.username}
        appearance="user"
        placeholder={t("input:username") || ""}
      />

      <Input
        {...register("password", { required: { value: true, message: "Заполните имя" }, minLength: 8 })}
        error={errors.password}
        appearance="password"
        placeholder={t("input:password") || ""}
      />
      <Button isLoading={isLoading} type="submit">
        {t("button:enter")}
      </Button>
    </form>
  );
};
