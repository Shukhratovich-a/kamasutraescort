import React from "react";
import { signIn, useSession } from "next-auth/react";
import cn from "classnames";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "next-i18next";
import axios from "axios";

import { API } from "../../helpers";

import { GenderEnum } from "../../interfaces";
import { IProfileForm } from "./IProfileForm.interface";

import { ProfileInfoProps } from "./ProfileInfo.props";

import { Button, GenderSelect, Input, Select, Textarea, ImageSelect, DateSelect } from "../../components";

import styles from "./ProfileInfo.module.scss";

export const ProfileInfo = ({ session, hairs, eyes, regions }: ProfileInfoProps): JSX.Element => {
  const { t, i18n } = useTranslation();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IProfileForm>();

  const [isLoading, setLoading] = React.useState(false);
  const currentSession = useSession();

  const onSubmit = async (formData: IProfileForm) => {
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
    <div className={cn(styles["profile"])} onSubmit={handleSubmit(onSubmit)}>
      <h2 className={cn(styles["profile__heading"])}>{t("profile:profile")}</h2>

      <div className={cn(styles["profile__image"])}>
        <ImageSelect />
      </div>

      <form className={cn(styles["profile__info"])}>
        <div className={cn(styles["profile__main"])}>
          <h3 className={cn(styles["profile__main__heading"], styles["profile__info__heading"])}>
            {t("profile:main-info")}
          </h3>

          <label className={cn(styles["profile__label"])}>
            <span className={cn(styles["profile__label__text"])}>Имя</span>
            <Input
              defaultValue={session?.user.username}
              placeholder="Ваше имя"
              {...register("username", { required: { value: true, message: "Заполните имя" } })}
              error={errors.username}
            />
          </label>

          <label className={cn(styles["profile__label"])}>
            <span className={cn(styles["profile__label__text"])}>Полное имя</span>
            <Input
              defaultValue={session?.user.fullname}
              placeholder="Ваше имя"
              {...register("fullname", { required: { value: false, message: "Заполните имя" } })}
              error={errors.fullname}
            />
          </label>

          <label className={cn(styles["profile__label"])}>
            <span className={cn(styles["profile__label__text"])}>Дата рождения</span>
            <Controller
              defaultValue={session.user.birthDate}
              control={control}
              name="birthDate"
              rules={{ required: { value: true, message: "Укажите рейтинг" } }}
              render={({ field }) => <DateSelect date={field.value} ref={field.ref} />}
            />
          </label>

          <label className={cn(styles["profile__label"])}>
            <span className={cn(styles["profile__label__text"])}>Цвет волос</span>
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
                  placeholder={"Предпочитаю не отвечать"}
                  isEditable
                />
              )}
            />
          </label>

          <label className={cn(styles["profile__label"])}>
            <span className={cn(styles["profile__label__text"])}>Пол</span>
            <Controller
              defaultValue={session ? session?.user.gender : GenderEnum.Male}
              control={control}
              name="gender"
              rules={{ required: { value: true, message: "Укажите рейтинг" } }}
              render={({ field }) => (
                <GenderSelect
                  gender={field.value ? field.value : GenderEnum.Male}
                  ref={field.ref}
                  setGender={field.onChange}
                  isEditable
                />
              )}
            />
          </label>
        </div>

        <div className={cn(styles["profile__main"])}>
          <h3 className={cn(styles["profile__main__heading"], styles["profile__info__heading"])}>
            {t("profile:personal-info")}
          </h3>

          <label className={cn(styles["profile__label"])}>
            <span className={cn(styles["profile__label__text"])}>Рост</span>
            <Input
              defaultValue={session?.user.height}
              placeholder="Предпочитаю не отвечать"
              {...register("height", { required: { value: false, message: "Заполните имя" } })}
              error={errors.height}
              type={"number"}
            />
          </label>

          <label className={cn(styles["profile__label"])}>
            <span className={cn(styles["profile__label__text"])}>Вес</span>
            <Input
              defaultValue={session?.user.weight}
              placeholder="Предпочитаю не отвечать"
              {...register("weight", { required: { value: false, message: "Заполните имя" } })}
              error={errors.weight}
              type={"number"}
            />
          </label>

          <label className={cn(styles["profile__label"])}>
            <span className={cn(styles["profile__label__text"])}>Цвет волос</span>
            <Controller
              defaultValue={session.user.hairColor?.id}
              control={control}
              name="hairColor"
              rules={{ required: false }}
              render={({ field }) => (
                <Select
                  selectArray={hairs}
                  ref={field.ref}
                  selected={field.value}
                  setSelected={field.onChange}
                  placeholder={"Предпочитаю не отвечать"}
                  isEditable
                />
              )}
            />
          </label>

          <label className={cn(styles["profile__label"])}>
            <span className={cn(styles["profile__label__text"])}>Цвет глаз</span>
            <Controller
              defaultValue={session.user.eyeColor?.id}
              control={control}
              name="eyeColor"
              rules={{ required: false }}
              render={({ field }) => (
                <Select
                  selectArray={eyes}
                  ref={field.ref}
                  selected={field.value}
                  setSelected={field.onChange}
                  placeholder={"Предпочитаю не отвечать"}
                  isEditable
                />
              )}
            />
          </label>

          <label className={cn(styles["profile__label"])}>
            <span className={cn(styles["profile__label__text"])}>Цель знакомства</span>
            <Input
              defaultValue={session?.user.goal}
              placeholder="Предпочитаю не отвечать"
              {...register("goal", { required: { value: false, message: "Заполните имя" } })}
              error={errors.goal}
            />
          </label>

          <label className={cn(styles["profile__label"], styles["profile__label--about"])}>
            <span className={cn(styles["profile__label__text"])}>О себе</span>
            <Textarea
              defaultValue={session?.user.about}
              placeholder="Напишите о себе"
              {...register("about", { required: { value: false, message: "Заполните имя" } })}
              error={errors.about}
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
              placeholder="Введите e-mail"
              {...register("email", { required: { value: true, message: "Заполните имя" } })}
              error={errors.email}
            />
          </label>

          <label className={cn(styles["profile__label"])}>
            <span className={cn(styles["profile__label__text"])}>Password</span>
            <Input
              type={"password"}
              placeholder="Введите e-mail"
              {...register("password", { required: { value: true, message: "Заполните имя" } })}
              error={errors.password}
            />
          </label>
        </div>

        <Button className={cn(styles["profile__button"])} isLoading={isLoading}>
          Сохранить
        </Button>
      </form>
    </div>
  ) : (
    <></>
  );
};
