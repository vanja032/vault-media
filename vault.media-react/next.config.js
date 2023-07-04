require("dotenv").config();

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    FETCH_API_URL: process.env.FETCH_API_URL,
    CONVERT_API_URL: process.env.CONVERT_API_URL,
    DOWNLOAD_API_URL: process.env.DOWNLOAD_API_URL
  }
};

module.exports = nextConfig;
