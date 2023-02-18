import { useRouter } from "next/router";
import { signIn } from "next-auth/react";
import cn from "classnames";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useTranslation } from "next-i18next";

import { API } from "../../helpers";

import { RegisterFormProps } from "./RegisterForm.props";
import { IRegisterForm } from "./RegisterForm.interface";
import { AuthResponceInterface } from "../../interfaces";

import { Button, Input } from "..";

import styles from "./RegisterForm.module.scss";

export const RegisterForm = ({ className, ...props }: RegisterFormProps): JSX.Element => {
  const { t, i18n } = useTranslation();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IRegisterForm>();

  const onSubmit = async (formData: IRegisterForm) => {
    const { data } = await axios.post<AuthResponceInterface>(API.auth.register, {
      username: formData.username,
      email: formData.email,
      password: formData.password,
      gender: "male",
      birthDate: new Date(),
    });

    if (data.status) {
      const user = await signIn("credentials", {
        usernameOrEmail: formData.username,
        password: formData.password,
        redirect: false,
        callbackUrl: "/",
      });

      if (user?.status === 200) {
        router.push("/", "/", { locale: i18n.language });
      }
    }
  };

  return (
    <form className={cn(styles["register-form"], className)} onSubmit={handleSubmit(onSubmit)} {...props}>
      <Input
        {...register("username", { required: { value: true, message: "Заполните имя" } })}
        error={errors.username}
        appearance="user"
        placeholder={t("input:username") || ""}
      />

      <Input
        {...register("email", { required: { value: true, message: "Заполните имя" } })}
        error={errors.email}
        appearance="mail"
        placeholder={t("input:email") || ""}
      />

      <Input
        {...register("password", { required: { value: true, message: "Заполните имя" }, minLength: 8 })}
        error={errors.password}
        appearance="password"
        placeholder={t("input:password") || ""}
      />
      <Button>{t("button:enter")}</Button>
    </form>
  );
};
