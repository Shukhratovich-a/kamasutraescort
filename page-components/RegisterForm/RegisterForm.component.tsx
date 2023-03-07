import React from "react";
import { useRouter } from "next/router";
import cn from "classnames";
import { useTranslation } from "next-i18next";
import { Controller, useForm } from "react-hook-form";

import { RegisterFormProps } from "./RegisterForm.props";
import { IRegisterForm } from "./RegisterForm.interface";

import { Button, Input, Select, DateSelect } from "../../components";

import Region from "../../assets/icons/region.svg";

import styles from "./RegisterForm.module.scss";
import axios from "axios";
import { API } from "../../helpers";
import { AuthResponceInterface } from "../../interfaces";
import { signIn } from "next-auth/react";

export const RegisterForm = ({ className, regions, ...props }: RegisterFormProps) => {
  const { t, i18n } = useTranslation();
  const { pathname, push } = useRouter();

  const [isLoading, setLoading] = React.useState(false);

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<IRegisterForm>({ mode: "onSubmit" });

  React.useEffect(() => {
    if (typeof window === "undefined") return;

    window.document.body.style.overflow = "visible";
  }, []);

  const onSubmit = async (formData: IRegisterForm) => {
    setLoading(true);

    try {
      const body = {
        username: formData.username,
        email: formData.email,
        password: formData.confirmPassword,
        birthDate: formData.birthDate,
        role: pathname.split("/").at(-1),
        region: formData.region,
      };

      const { data: user } = await axios.post<AuthResponceInterface>(API.auth.register, { ...body });

      if (user.status) {
        const data = await signIn("credentials", {
          token: user.accessToken,
          redirect: false,
          callbackUrl: "/",
        });

        if (data?.status === 200) {
          push("/", "/", { locale: i18n.language });
          setLoading(false);
        } else {
          setLoading(false);
        }
      }
    } catch {
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className={cn(styles.form, className)} onSubmit={handleSubmit(onSubmit)} {...props}>
      <Input
        {...register("username", { required: { value: true, message: "dfs" }, minLength: 3 })}
        className={cn(styles.form__input)}
        appearance="user"
        placeholder={t("input:username") || ""}
        error={errors.username}
      />

      <Input
        {...register("email", { required: { value: true, message: "" }, minLength: 5 })}
        className={cn(styles.form__input)}
        appearance="mail"
        placeholder={t("input:email") || ""}
        error={errors.email}
      />

      <Controller
        control={control}
        name="birthDate"
        rules={{ required: { value: true, message: "Укажите рейтинг" } }}
        render={({ field }) => <DateSelect date={field.value} setDate={field.onChange} ref={field.ref} />}
      />

      <Controller
        control={control}
        name="region"
        rules={{ required: { value: true, message: "Укажите рейтинг" } }}
        render={({ field }) => (
          <Select
            className={cn(styles.form__input)}
            selectArray={regions}
            selected={field.value}
            setSelected={field.onChange}
            error={errors.region}
            icon={<Region />}
            placeholder={t("input:region") || ""}
            ref={field.ref}
            isEditable
          />
        )}
      />

      <Input
        {...register("password", { required: { value: true, message: "" }, minLength: 8 })}
        className={cn(styles.form__input)}
        appearance="password"
        placeholder={t("input:password") || ""}
        error={errors.password}
      />

      <Input
        {...register("confirmPassword", {
          required: { value: true, message: "const" },
          minLength: 8,
          validate: (value) => watch("password") === value || "sdasd",
        })}
        className={cn(styles.form__input)}
        appearance="password"
        placeholder={t("input:confirm-password") || ""}
        error={errors.confirmPassword}
      />

      <Button className={styles.form__button} isLoading={isLoading} type="submit">
        {t("button:create-account")}
      </Button>
    </form>
  );
};
