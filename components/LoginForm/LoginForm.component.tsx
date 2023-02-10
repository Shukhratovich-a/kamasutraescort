import cn from "classnames";
import { useForm } from "react-hook-form";
import { useTranslation } from "next-i18next";

import { LoginFormProps } from "./LoginForm.props";
import { ILoginForm } from "./LoginForm.interface";

import { Button, Input } from "..";

import styles from "./LoginForm.module.scss";

export const LoginForm = ({ className, ...props }: LoginFormProps): JSX.Element => {
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginForm>();

  const onSubmit = async (formData: ILoginForm) => {
    console.log(formData);
  };

  return (
    <form className={cn(styles["login-form"], className)} onSubmit={handleSubmit(onSubmit)} {...props}>
      <Input
        {...register("username", { required: { value: true, message: "Заполните имя" } })}
        error={errors.username}
        appearance="mail"
        placeholder={t("input:mail") || ""}
      />
      <Input
        {...register("password", { required: { value: true, message: "Заполните имя" } })}
        error={errors.password}
        appearance="password"
        placeholder={t("input:password") || ""}
      />
      <Button>{t("button:enter")}</Button>
    </form>
  );
};
