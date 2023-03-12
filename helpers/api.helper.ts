import { TypeEnum } from "../interfaces";

export const DOMAIN = process.env.NEXT_PUBLIC_DOMAIN;

export const API = {
  auth: {
    login: DOMAIN + "/auth/login",
    register: DOMAIN + "/auth/register",
    checkUser: DOMAIN + "/auth/check-user",
  },

  user: {
    getByGender: DOMAIN + "/user/gender",
    getByUsername: DOMAIN + "/user/username",
    getImageById: DOMAIN + "/image",
    edit: DOMAIN + "/user/edit/",
  },

  avatar: {
    get: (filename: string) => `${DOMAIN}/avatar/${filename}`,
    upload: (id: number) => `${DOMAIN}/avatar/${id}`,
  },

  advertisement: {
    getByUsername: (username: string, limit = 10, page = 1) =>
      `${DOMAIN}/advertisement/username/${username}?limit=${limit}&page=${page}`,

    getByType: (type: TypeEnum) => `${DOMAIN}/advertisement/type/${type}`,

    getBySearchName: (searchName: string) => `${DOMAIN}/advertisement/${searchName}`,

    create: (id: number) => `${DOMAIN}/advertisement/${id}`,
  },

  images: {
    get: (name: string) => `${DOMAIN}/images/${name}`,
    upload: (id: number) => `${DOMAIN}/image/${id}`,
    delete: (id: number, type: "first" | "second" | "third" | "fourth") => `${DOMAIN}/image/${id}?type=${type}`,
  },

  eyes: {
    getAll: DOMAIN + "/eye-color",
  },

  hairs: {
    getAll: DOMAIN + "/hairs",
  },

  regions: {
    getAll: DOMAIN + "/regions",
  },
};
