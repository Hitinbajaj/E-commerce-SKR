const devConfig = {
  baseURL: process.env.REACT_APP_API_BASE_URL || "https://e-commerce-backend-nine-omega.vercel.app",
};

const prodConfig = {
  baseURL: "Your production url",
};

export const config = devConfig;
