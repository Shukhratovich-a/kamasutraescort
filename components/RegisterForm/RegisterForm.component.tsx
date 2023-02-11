import cn from "classnames";
import { useForm } from "react-hook-form";
import { useTranslation } from "next-i18next";

import { RegisterFormProps } from "./RegisterForm.props";
import { IRegisterForm } from "./RegisterForm.interface";

import { Button, Input } from "..";

import styles from "./RegisterForm.module.scss";

export const RegisterForm = ({ className, ...props }: RegisterFormProps): JSX.Element => {
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IRegisterForm>();

  const onSubmit = async (formData: IRegisterForm) => {
    console.log(formData);
  };

  return (
    <form className={cn(styles["Register-form"], className)} onSubmit={handleSubmit(onSubmit)} {...props}>
      <Input
        {...register("mail", { required: { value: true, message: "Заполните имя" } })}
        error={errors.mail}
        appearance="mail"
        placeholder={t("input:mail") || ""}
      />

      <Input
        {...register("username", { required: { value: true, message: "Заполните имя" } })}
        error={errors.username}
        appearance="user"
        placeholder={t("input:user") || ""}
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
