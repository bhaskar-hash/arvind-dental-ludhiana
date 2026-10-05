/** Shared RedCity Dental Care brand theme. Extend this preset from every app's tailwind.config. */
module.exports = {
  theme: {
    extend: {
      colors: {
        brand: {
          red: "#A61C2E",
          "red-dark": "#7D1523",
          maroon: "#2B0A0F",
          black: "#1A1A1A",
          gold: "#D4AF37",
          "gold-light": "#F2D98A",
          // Patient-centred redesign tokens (see the design canvas style guide).
          ink: "#1F1718",
          muted: "#5E5456",
          warm: "#FBF6F4",
          blush: "#F6ECE9",
          line: "#EADFDC",
          // WhatsApp actions only; dark enough for white text (5.3:1).
          wa: "#0B7A55",
          footer: "#1C1213",
        },
      },
      backgroundImage: {
        "brand-band": "linear-gradient(135deg, #1A1A1A 0%, #2B0A0F 100%)",
      },
      fontFamily: {
        headline: ["var(--font-headline)", "serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
    },
  },
};
