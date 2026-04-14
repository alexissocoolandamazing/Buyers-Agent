import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          navy: "#0F2942",
          blue: "#1D5FA8",
          skyblue: "#3B82F6",
          mist: "#EFF4FB",
          border: "#D9E5F3",
        },
        neutral: {
          50: "#F8FAFC",
          100: "#F1F5F9",
          200: "#E2E8F0",
          300: "#CBD5E1",
          600: "#475569",
          700: "#334155",
          900: "#0F172A",
        },
      },
      fontFamily: {
        sans: [
          "ui-sans-serif",
          "-apple-system",
          "BlinkMacSystemFont",
          "\"Segoe UI\"",
          "sans-serif",
        ],
        mono: [
          "ui-monospace",
          "SFMono-Regular",
          "SF Mono",
          "Menlo",
          "Consolas",
          "monospace",
        ],
      },
      boxShadow: {
        sm: "0 12px 28px -24px rgba(15, 41, 66, 0.18)",
        md: "0 18px 38px -26px rgba(15, 41, 66, 0.24)",
        lg: "0 -18px 40px -28px rgba(15, 41, 66, 0.28)",
      },
      backgroundImage: {
        "hero-grid":
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='72' height='72' viewBox='0 0 72 72'%3E%3Cpath d='M72 0H0V72' fill='none' stroke='%23ffffff' stroke-opacity='0.05' stroke-width='1'/%3E%3C/svg%3E\")",
      },
    },
  },
};

export default config;
