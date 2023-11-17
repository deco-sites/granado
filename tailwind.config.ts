import daisyui from "daisyui";

export default {
  plugins: [daisyui],
  daisyui: { themes: [], logs: false },
  content: ["./**/*.tsx"],
  theme: {
    container: {
      center: true,
    },
    fontFamily: {
      sans: ["'Mr_Eaves'", "Mr_Eaves", "sans-serif"],
      serif: ["inherit", "serif"],
      arial: ["Arial", "sans-serif"],
      granado: ["Granado", "sans-serif"]
    },
  },
};
