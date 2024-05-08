export const ironOptions = {
  cookieName: process.env.COOKIENAME,
  password: process.env.SESSION_KEY,

  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
    maxAge: process.env.COOKIE_AGE,
  },
};
