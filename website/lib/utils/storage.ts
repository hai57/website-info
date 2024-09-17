/* eslint-disable prettier/prettier */
export const storage = {
  set: (key: string, v: any) => {
    localStorage.setItem(key, JSON.stringify(v));
  },

  get: (key: string) => {
    try {
      let s = localStorage.getItem(key) as string;

      return JSON.parse(s);
    } catch (e) {
      return null;
    }
  },

  remove: (key: string) => {
    localStorage.removeItem(key);
  },
};
