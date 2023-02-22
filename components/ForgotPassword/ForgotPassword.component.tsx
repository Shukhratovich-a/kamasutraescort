import cn from "classnames";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { useTranslation } from "next-i18next";

import { ForgotPasswordProps } from "./ForgotPassword.props";

import { IForgotPassword } from "./ForgotPassword.interface";

import { Input, Button } from "../";

import styles from "./ForgotPassword.module.scss";

export const ForgotPassword = ({ isOpen = false, ...props }: ForgotPasswordProps): JSX.Element => {
  const { t } = useTranslation();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IForgotPassword>();

  const handleClose = () => {
    router.replace(router.pathname);
  };

  const onSubmit = async (formData: IForgotPassword) => {
    console.log(formData);
  };

  return isOpen ? (
    <div className={cn(styles.forgot)} {...props}>
      <div className={cn(styles.forgot__back)} onClick={handleClose}></div>

      <div className={cn(styles.forgot__inner)}>
        <span className={cn(styles.forgot__heading)}>{t("auth:login-password")}</span>

        <span className={cn(styles.forgot__description)}>{t("auth:login-password-description")}</span>

        <form className={cn(styles.forgot__form)} onSubmit={handleSubmit(onSubmit)}>
          <Input
            className={cn(styles.forgot__form__input)}
            {...register("mail", { required: { value: true, message: "Заполните имя" } })}
            error={errors.mail}
            appearance={"mail"}
            placeholder={t("input:email") || "email"}
          />
          <Button type="submit">{t("auth:login-password-request")}</Button>
        </form>
      </div>
    </div>
  ) : (
    <></>
  );
};
