import React from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "next-i18next";
import cn from "classnames";

import { IAdvertisementEditor } from "./AdvertisementEditor.interface";

import { AdvertisementEditorProps } from "./AdvertisementEditor.props";

import { Button, DateSelect, Input, Select, Textarea, TypeSelect } from "../../components";

import styles from "./AdvertisementEditor.module.scss";
import { ImageSelect } from "../../components/ImageSelect/ImageSelect.component";
import axios from "axios";
import { API } from "../../helpers";
import { useSession } from "next-auth/react";

export const AdvertisementEditor = ({
  eyes,
  hairs,
  regions,
  advertisement,
  ...props
}: AdvertisementEditorProps): JSX.Element => {
  const { t } = useTranslation();

  const capitalizeFirstLetter = (string: string): string => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const { data: session } = useSession({ required: true });

  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IAdvertisementEditor>();

  const onSubmit = async (formData: IAdvertisementEditor) => {
    if (!session) return;

    setIsLoading(true);

    if (!advertisement) {
      const { data: advertisement } = await axios.post(API.advertisement.create(session.user.id), {
        advName: String(formData.advName).toLowerCase(),
        birthDate: formData.birthDate,
        type: String(formData.type).toLowerCase(),
        region: Number(formData.region),
        fullname: formData.fullname,
        height: Number(formData.height),
        weight: Number(formData.weight),
        hairColor: formData.hairColor,
        eyeColor: formData.eyeColor,
        about: formData.about,
      });

      if (advertisement.status === 201) {
        if (!formData.image) return;

        const formImage = new FormData();

        if (formData.image.first) {
          formImage.append("first", formData.image.first);
        }
        if (formData.image.second) {
          formImage.append("second", formData.image.second);
        }
        if (formData.image.third) {
          formImage.append("third", formData.image.third);
        }
        if (formData.image.fourth) {
          formImage.append("fourth", formData.image.fourth);
        }

        const { data: images } = await axios({
          method: "patch",
          url: API.images.upload(advertisement.advertisement.id),
          data: formImage,
          headers: { "Content-Type": "multipart/form-data" },
        });

        if (images.status === 200) {
          setIsLoading(false);
        }
      }
    }
  };

  return (
    <div className={cn(styles.editor)} {...props}>
      <h2 className={cn(styles.editor__heading)}>craete</h2>

      <div className={cn(styles.editor__left)}>
        <Controller
          control={control}
          name="image.first"
          render={({ field }) => (
            <ImageSelect
              className={cn(styles["editor__image--first"])}
              image={field.value}
              setImage={field.onChange}
              border={50}
              ref={field.ref}
            />
          )}
        />

        <Controller
          control={control}
          name="image.second"
          render={({ field }) => (
            <ImageSelect
              className={cn(styles["editor__image--second"])}
              image={field.value}
              setImage={field.onChange}
              border={30}
              ref={field.ref}
            />
          )}
        />

        <Controller
          control={control}
          name="image.third"
          render={({ field }) => (
            <ImageSelect
              className={cn(styles["editor__image--third"])}
              image={field.value}
              setImage={field.onChange}
              border={30}
              ref={field.ref}
            />
          )}
        />

        <Controller
          control={control}
          name="image.fourth"
          render={({ field }) => (
            <ImageSelect
              className={cn(styles["editor__image--fourth"])}
              image={field.value}
              setImage={field.onChange}
              border={30}
              ref={field.ref}
            />
          )}
        />
      </div>

      <form className={cn(styles.editor__right)} onSubmit={handleSubmit(onSubmit)}>
        <h3 className={cn(styles.editor__right__heading)}>{t("advertisement:main-info")}</h3>

        <div className={cn(styles.editor__right__section)}>
          <label className={cn(styles.editor__label)}>
            <span className={cn(styles.editor__label__text)}>{t("advertisement:title.name")}</span>

            <Input
              {...register("advName", { required: { value: true, message: "Заполните имя" } })}
              className={cn(styles.editor__label__input)}
              autoComplete="off"
              type="text"
              placeholder={`${capitalizeFirstLetter(t("advertisement:title.placeholder"))}`}
              error={errors.advName}
            />
          </label>

          <label className={cn(styles.editor__label)}>
            <span className={cn(styles.editor__label__text)}>{t("advertisement:birth-date")}</span>

            <Controller
              control={control}
              name="birthDate"
              rules={{ required: { value: true, message: "Укажите рейтинг" } }}
              render={({ field }) => <DateSelect date={field.value} setDate={field.onChange} ref={field.ref} />}
            />
          </label>

          <label className={cn(styles.editor__label, styles["editor__label--big"])}>
            <span className={cn(styles.editor__label__text)}>{t("advertisement:type")}</span>

            <Controller
              control={control}
              name="type"
              rules={{ required: true }}
              render={({ field }) => (
                <TypeSelect type={field.value} setType={field.onChange} error={errors.type} isEditable />
              )}
            />
          </label>

          <label className={cn(styles.editor__label)}>
            <span className={cn(styles.editor__label__text)}>{t("advertisement:region.name")}</span>

            <Controller
              control={control}
              name="region"
              rules={{ required: false }}
              render={({ field }) => (
                <Select
                  selectArray={regions}
                  ref={field.ref}
                  selected={field.value}
                  setSelected={field.onChange}
                  placeholder={`${capitalizeFirstLetter(t("advertisement:region.placeholder"))}`}
                  error={errors.region}
                  isEditable
                />
              )}
            />
          </label>
        </div>

        <div className={cn(styles.editor__right__section)}>
          <h3 className={cn(styles.editor__right__heading)}>{t("advertisement:personal-info")}</h3>

          <label className={cn(styles.editor__label)}>
            <span className={cn(styles.editor__label__text)}>{t("advertisement:fullname.name")}</span>

            <Input
              {...register("fullname")}
              className={cn(styles.editor__label__input)}
              autoComplete="off"
              type="text"
              placeholder={`${capitalizeFirstLetter(t("advertisement:fullname.placeholder"))}`}
            />
          </label>

          <label className={cn(styles.editor__label)}>
            <span className={cn(styles.editor__label__text)}>{t("advertisement:height.name")}</span>

            <Input
              {...register("height")}
              className={cn(styles.editor__label__input)}
              autoComplete="off"
              type="number"
              placeholder={`${capitalizeFirstLetter(t("advertisement:height.placeholder"))}`}
            />
          </label>

          <label className={cn(styles.editor__label)}>
            <span className={cn(styles.editor__label__text)}>{t("advertisement:weight.name")}</span>

            <Input
              {...register("weight")}
              className={cn(styles.editor__label__input)}
              autoComplete="off"
              type="number"
              placeholder={`${capitalizeFirstLetter(t("advertisement:weight.placeholder"))}`}
            />
          </label>

          <label className={cn(styles.editor__label)}>
            <span className={cn(styles.editor__label__text)}>{t("advertisement:hair-color.name")}</span>

            <Controller
              control={control}
              name="hairColor"
              rules={{ required: false }}
              render={({ field }) => (
                <Select
                  selectArray={hairs}
                  ref={field.ref}
                  selected={field.value}
                  setSelected={field.onChange}
                  placeholder={`${capitalizeFirstLetter(t("input:not-answer"))}`}
                  isEditable
                />
              )}
            />
          </label>

          <label className={cn(styles.editor__label)}>
            <span className={cn(styles.editor__label__text)}>{t("advertisement:eye-color.name")}</span>

            <Controller
              control={control}
              name="eyeColor"
              rules={{ required: false }}
              render={({ field }) => (
                <Select
                  selectArray={eyes}
                  ref={field.ref}
                  selected={field.value}
                  setSelected={field.onChange}
                  placeholder={`${capitalizeFirstLetter(t("input:not-answer"))}`}
                  isEditable
                />
              )}
            />
          </label>

          <label className={cn(styles.editor__label, styles["editor__label--big"])}>
            <span className={cn(styles.editor__label__text)}>{t("advertisement:about.name")}</span>

            <Textarea
              {...register("about")}
              className={cn(styles.editor__label__input)}
              autoComplete="off"
              placeholder={`${capitalizeFirstLetter(t("advertisement:about.placeholder"))}`}
            />
          </label>
        </div>

        <Button className={cn(styles.editor__button)} isLoading={isLoading}>
          {t("advertisement:publish")}
        </Button>
      </form>
    </div>
  );
};
