module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        stellar: {
          50: "#f0f9ff",
          500: "#001a7f",
          900: "#000d2b",
        },
      },
    },
  },
  plugins: [],
};
