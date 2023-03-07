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
    upload: DOMAIN + "/avatar/",
  },

  advertisement: {
    getByUsername: DOMAIN + "/advertisement/username/",
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
