import React from "react";
import { signIn, useSession } from "next-auth/react";
import { useTranslation } from "next-i18next";
import { Controller, useForm } from "react-hook-form";
import axios from "axios";
import cn from "classnames";

import { API } from "../../helpers";

import { IProfileEditor } from "./IProfileEditor.interface";

import { ProfileEditorProps } from "./ProfileEditor.props";

import { Button, Input, Select, DateSelect, AvatarSelect } from "../../components";

import styles from "./ProfileEditor.module.scss";

export const ProfileEditor = ({ session, regions, ...props }: ProfileEditorProps): JSX.Element => {
  const { t, i18n } = useTranslation();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IProfileEditor>();

  const [isLoading, setLoading] = React.useState(false);
  const currentSession = useSession();

  const onSubmit = async (formData: IProfileEditor) => {
    setLoading(true);

    const { data } = await axios.patch(
      API.user.edit + session?.user.id,
      {
        ...formData,
      },
      {
        headers: {
          Authorization: JSON.stringify(currentSession.data?.token),
        },
      }
    );

    if (data.status === 202) {
      const user = await signIn("credentials", {
        usernameOrEmail: formData.username,
        password: formData.password,
        redirect: false,
        callbackUrl: "/" + i18n.language,
      });

      if (user?.status === 200) {
        setLoading(false);
      } else {
        setLoading(false);
      }
    }
  };

  return session ? (
    <div className={cn(styles["profile"])} {...props}>
      <h2 className={cn(styles["profile__heading"])}>{t("profile:profile")}</h2>

      <div className={cn(styles.profile__avatar)}>
        <AvatarSelect avatar={session.user.avatar} />
      </div>

      <form className={cn(styles["profile__info"])} onSubmit={handleSubmit(onSubmit)}>
        <div className={cn(styles["profile__main"])}>
          <h3 className={cn(styles["profile__main__heading"], styles["profile__info__heading"])}>
            {t("profile:main-info")}
          </h3>

          <label className={cn(styles["profile__label"])}>
            <span className={cn(styles["profile__label__text"])}>??????</span>
            <Input
              {...register("username", { required: { value: true, message: "?????????????????? ??????" } })}
              defaultValue={session?.user.username}
              placeholder="???????? ??????"
              error={errors.username}
            />
          </label>

          <label className={cn(styles["profile__label"])}>
            <span className={cn(styles["profile__label__text"])}>???????? ????????????????</span>
            <Controller
              defaultValue={session.user.birthDate}
              control={control}
              name="birthDate"
              rules={{ required: { value: true, message: "?????????????? ??????????????" } }}
              render={({ field }) => <DateSelect date={field.value} ref={field.ref} />}
            />
          </label>

          <label className={cn(styles["profile__label"])}>
            <span className={cn(styles["profile__label__text"])}>???????? ??????????</span>
            <Controller
              defaultValue={session.user.region.id}
              control={control}
              name="region"
              rules={{ required: false }}
              render={({ field }) => (
                <Select
                  selectArray={regions}
                  ref={field.ref}
                  selected={field.value}
                  setSelected={field.onChange}
                  placeholder={"?????????????????????? ???? ????????????????"}
                  isEditable
                />
              )}
            />
          </label>
        </div>

        <div className={cn(styles["profile__main"])}>
          <h3 className={cn(styles["profile__main__heading"], styles["profile__info__heading"])}>
            {t("profile:account")}
          </h3>

          <label className={cn(styles["profile__label"])}>
            <span className={cn(styles["profile__label__text"])}>E-mail</span>
            <Input
              defaultValue={session?.user.email}
              placeholder="?????????????? e-mail"
              {...register("email", { required: { value: true, message: "?????????????????? ??????" } })}
              error={errors.email}
            />
          </label>

          <label className={cn(styles["profile__label"])}>
            <span className={cn(styles["profile__label__text"])}>Password</span>
            <Input
              type={"password"}
              placeholder="?????????????? e-mail"
              {...register("password", { required: { value: true, message: "?????????????????? ??????" } })}
              error={errors.password}
            />
          </label>
        </div>

        <Button className={cn(styles["profile__button"])} isLoading={isLoading}>
          ??????????????????
        </Button>
      </form>
    </div>
  ) : (
    <></>
  );
};
