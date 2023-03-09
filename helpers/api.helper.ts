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
    create: (id: number) => `${DOMAIN}/advertisement/${id}`,
  },

  images: {
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
