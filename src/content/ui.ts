import type { T } from "./profile";

/** Interface labels (navigation, buttons, section titles). */
export const ui = {
  nav: {
    work: { en: "Work", es: "Experiencia" },
    cases: { en: "Cases", es: "Casos" },
    stack: { en: "Stack", es: "Stack" },
    contact: { en: "Contact", es: "Contacto" },
  },
  downloadCv: { en: "Download CV", es: "Descargar CV" },
  getInTouch: { en: "Get in touch", es: "Escríbeme" },
  themeToggle: { en: "Switch color theme", es: "Cambiar tema de color" },
  languageToggle: { en: "Leer en español", es: "Read in English" },
  skipToContent: { en: "Skip to content", es: "Saltar al contenido" },
  passed: { en: "passed", es: "passed" },
} satisfies Record<string, T | Record<string, T>>;
