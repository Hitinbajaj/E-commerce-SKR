const devConfig = {
  baseURL: process.env.REACT_APP_API_BASE_URL || "https://e-commerce-backend-wnin.onrender.com/",
};

const prodConfig = {
  baseURL: "Your production url",
};

export const config = devConfig;
