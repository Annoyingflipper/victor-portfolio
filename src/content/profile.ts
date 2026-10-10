/**
 * Single source of truth for everything the site says about Victor.
 * Edit text here; components never hard-code copy.
 *
 * Every user-facing string is bilingual: { en, es }.
 * Rule: only real, confirmed facts. No invented metrics.
 */

export const locales = ["en", "es"] as const;
export type Locale = (typeof locales)[number];
export type T = Record<Locale, string>;

export const profile = {
  name: "Victor Maniglia",
  initials: "VM",
  role: { en: "QA Automation Engineer", es: "QA Automation Engineer" } satisfies T,
  location: { en: "Caracas, Venezuela", es: "Caracas, Venezuela" } satisfies T,
  availability: {
    en: "Open to remote roles · available in US time zones",
    es: "Disponible para roles remotos · horario de EE. UU.",
  } satisfies T,
  languages: { en: "English and Spanish, both native", es: "Inglés y español nativos" } satisfies T,
  positioning: {
    en: "I find out what breaks before your users do. Sole QA at a SaaS platform, writing Playwright suites and asking the database awkward questions.",
    es: "Me encargo de descubrir qué se rompe antes de que lo vean tus usuarios. Soy el único QA de una plataforma SaaS: escribo suites de Playwright y le hago preguntas incómodas a la base de datos.",
  } satisfies T,
  /** The console line in the hero. Only real numbers. */
  runLine: {
    en: "300+ tests · 400+ bugs caught · 65% faster regression",
    es: "300+ pruebas · 400+ bugs encontrados · 65% menos regresión",
  } satisfies T,

  contact: {
    email: "victor.maniglia.dev@gmail.com",
    linkedin: "https://linkedin.com/in/victormaniglia",
    github: "https://github.com/Annoyingflipper",
    cv: "/Victor-Maniglia-CV.pdf",
  },

  photo: {
    src: "/images/victor.jpg",
    alt: {
      en: "Victor Maniglia smiling, working on a laptop by a window",
      es: "Victor Maniglia sonriendo, trabajando en una laptop junto a una ventana",
    } satisfies T,
  },

  metrics: [
    {
      value: 300,
      suffix: "+",
      label: { en: "automated tests", es: "pruebas automatizadas" },
      context: {
        en: "Run in Jenkins and GitHub Actions on every release.",
        es: "Corren en Jenkins y GitHub Actions en cada release.",
      },
    },
    {
      value: 65,
      suffix: "%",
      label: { en: "less regression time", es: "menos tiempo de regresión" },
      context: {
        en: "Manual regression replaced by automated suites.",
        es: "La regresión manual pasó a suites automatizadas.",
      },
    },
    {
      value: 80,
      suffix: "%",
      label: { en: "less time writing tests", es: "menos tiempo escribiendo pruebas" },
      context: {
        en: "Writing and debugging tests with Claude Code, Codex and Gemini.",
        es: "Escribiendo y depurando pruebas con Claude Code, Codex y Gemini.",
      },
    },
    {
      value: 400,
      suffix: "+",
      label: { en: "defects found", es: "defectos encontrados" },
      context: {
        en: "Across every project I've tested.",
        es: "Entre todos los proyectos que he probado.",
      },
    },
    {
      value: 50,
      prefix: "20–",
      suffix: { en: "/wk", es: "/sem" },
      label: { en: "support cases", es: "casos de soporte" },
      context: {
        en: "Technical and customer cases I reproduce and resolve each week.",
        es: "Casos técnicos y de clientes que reproduzco y resuelvo cada semana.",
      },
    },
  ],

  experience: [
    {
      company: "DANAconnect",
      role: { en: "Automation Engineer", es: "Automation Engineer" },
      start: "2024-02",
      end: null,
      context: {
        en: "Omnichannel communications SaaS (AWS Partner of the Year NOLA 2026). Sole QA alongside 2 developers, hybrid. Every feature and release goes through me first, and I own the test suite.",
        es: "SaaS de comunicaciones omnicanal (AWS Partner of the Year NOLA 2026). Único QA junto a 2 desarrolladores, modalidad híbrida. Toda feature y release pasa primero por mí y soy dueño de la suite de pruebas.",
      },
      highlights: [
        {
          en: "Cut regression time by 65% by building a Playwright framework (Page Object Model, reusable fixtures, test-data setup) with 300+ tests that run in Jenkins and GitHub Actions.",
          es: "Reduje un 65% el tiempo de regresión construyendo un framework de Playwright (Page Object Model, fixtures reutilizables, preparación de datos) con más de 300 pruebas que corren en Jenkins y GitHub Actions.",
        },
        {
          en: "Spend 80% less time writing and debugging tests by working with Claude Code, Codex and Gemini, and reviewing every change they make.",
          es: "Dedico un 80% menos de tiempo a escribir y depurar pruebas trabajando con Claude Code, Codex y Gemini, y revisando cada cambio que proponen.",
        },
        {
          en: "Test REST APIs of Java/Spring Boot services with Postman and Swagger (payloads, status codes, error handling), run JMeter load tests, and check logins, sessions, roles and tenant data isolation.",
          es: "Pruebo APIs REST de servicios Java/Spring Boot con Postman y Swagger (payloads, status codes, manejo de errores), corro pruebas de carga con JMeter y verifico login, sesiones, roles y aislamiento de datos entre tenants.",
        },
        {
          en: "Handle 20–50 technical and customer support cases a week, and push test improvements and small fixes through Git pull requests.",
          es: "Atiendo entre 20 y 50 casos de soporte técnico y de clientes por semana, y subo mejoras de pruebas y fixes pequeños mediante pull requests.",
        },
      ],
    },
    {
      company: "Auronix / DaCodes",
      role: { en: "QA Engineer", es: "QA Engineer" },
      start: "2023-01",
      end: "2024-02",
      context: {
        en: "iOS and Android apps, chatbots and integrated flows. One of 5 QAs under a QA Lead, working in client Scrum squads.",
        es: "Apps iOS y Android, chatbots y flujos integrados. Uno de 5 QAs bajo un QA Lead, en squads Scrum por cliente.",
      },
      highlights: [
        {
          en: "Automated chatbot regression with Python and Selenium.",
          es: "Automaticé la regresión del chatbot con Python y Selenium.",
        },
        {
          en: "Designed test cases from acceptance criteria with equivalence partitioning and boundary values, and ran functional, regression and E2E cycles.",
          es: "Diseñé casos de prueba a partir de criterios de aceptación con particiones de equivalencia y valores límite, y ejecuté ciclos funcionales, de regresión y E2E.",
        },
        {
          en: "Presented results in client demos. Named Employee of the Month twice in a row.",
          es: "Presenté resultados en demos con clientes. Empleado del mes dos veces seguidas.",
        },
      ],
    },
    {
      company: "VOS Learning Center",
      role: { en: "English Teacher & Co-Founder", es: "Profesor de inglés y cofundador" },
      start: "2023-01",
      end: null,
      secondary: true,
      context: {
        en: "Coaching students and explaining hard things simply.",
        es: "Acompaño a estudiantes y explico cosas difíciles de forma simple.",
      },
      highlights: [],
    },
  ],

  cases: [
    {
      slug: "false-10m-email-spike",
      featured: true,
      title: { en: "The 10M emails that weren't", es: "Los 10 millones de correos que no eran" },
      tags: ["SQL", "Root cause", "Production"],
      context: {
        en: "Email delivery degraded. It looked like one client was sending more than 10 million emails.",
        es: "Las entregas de correo se degradaron. Parecía que un cliente estaba enviando más de 10 millones de correos.",
      },
      did: {
        en: "I queried the campaign-activation data instead of trusting the dashboard. The real volume was about 3M: the campaign had been activated 2 extra times by accident against empty records, which produced errors at scale.",
        es: "Consulté los datos de activación de campañas en vez de confiar en el dashboard. El volumen real era de unos 3M: la campaña se había activado 2 veces extra por accidente sobre registros vacíos, lo que generaba errores masivos.",
      },
      result: {
        en: "We stopped the duplicate runs before the traffic affected other clients.",
        es: "Paramos las ejecuciones duplicadas antes de que el tráfico afectara a otros clientes.",
      },
    },
    {
      slug: "conversations-module",
      title: { en: "A test suite from zero", es: "Una suite de pruebas desde cero" },
      tags: ["Playwright", "Test design", "Frontend"],
      context: {
        en: "The Conversations module got a visual redesign of its frontend and new nodes in its conversation flows.",
        es: "El módulo de Conversaciones tuvo un rediseño visual del frontend y nuevos nodos en sus flujos de conversación.",
      },
      did: {
        en: "I built its test suite from scratch, with new scenarios for the redesigned screens and each new node.",
        es: "Construí su suite de pruebas desde cero, con escenarios nuevos para las pantallas rediseñadas y cada nodo nuevo.",
      },
      result: {
        en: "The module shipped with its own regression suite instead of borrowed tests.",
        es: "El módulo salió con su propia suite de regresión en lugar de pruebas heredadas.",
      },
    },
    {
      slug: "agentic-qa",
      title: { en: "QA with AI agents", es: "QA con agentes de IA" },
      tags: ["Claude Code", "Codex", "Gemini"],
      context: {
        en: "As the only QA, writing and fixing tests was the bottleneck.",
        es: "Siendo el único QA, escribir y arreglar pruebas era el cuello de botella.",
      },
      did: {
        en: "I use Claude Code, Codex and Gemini to draft tests, debug failures and prepare data, and I review every change before it lands.",
        es: "Uso Claude Code, Codex y Gemini para escribir borradores de pruebas, depurar fallos y preparar datos, y reviso cada cambio antes de integrarlo.",
      },
      result: {
        en: "80% less time writing and debugging tests.",
        es: "80% menos tiempo escribiendo y depurando pruebas.",
      },
    },
    {
      slug: "chatbot-automation",
      title: { en: "Automating a chatbot", es: "Automatizar un chatbot" },
      tags: ["Python", "Selenium"],
      context: {
        en: "At Auronix, chatbot conversation flows had to be checked again after every change.",
        es: "En Auronix, los flujos de conversación del chatbot había que revisarlos de nuevo tras cada cambio.",
      },
      did: {
        en: "I automated the chatbot regression with Python and Selenium.",
        es: "Automaticé la regresión del chatbot con Python y Selenium.",
      },
      result: {
        en: "Repeat checks ran as a script instead of by hand.",
        es: "Las revisiones repetidas pasaron a correr como script en vez de a mano.",
      },
    },
  ],

  process: [
    {
      title: { en: "Plan by risk", es: "Planificar por riesgo" },
      body: {
        en: "Start where a failure would hurt most: money, data, other tenants.",
        es: "Empiezo donde un fallo dolería más: dinero, datos, otros tenants.",
      },
    },
    {
      title: { en: "Design the cases", es: "Diseñar los casos" },
      body: {
        en: "Equivalence partitioning and boundary values, so fewer tests cover more.",
        es: "Particiones de equivalencia y valores límite, para cubrir más con menos pruebas.",
      },
    },
    {
      title: { en: "Automate", es: "Automatizar" },
      body: {
        en: "Playwright with Page Object Model, reusable fixtures and test data.",
        es: "Playwright con Page Object Model, fixtures reutilizables y datos de prueba.",
      },
    },
    {
      title: { en: "Run in CI", es: "Correr en CI" },
      body: {
        en: "Every push and release in GitHub Actions or Jenkins.",
        es: "Cada push y release en GitHub Actions o Jenkins.",
      },
    },
    {
      title: { en: "Report bugs", es: "Reportar bugs" },
      body: {
        en: "Steps, evidence and impact, so a developer can act right away.",
        es: "Pasos, evidencia e impacto, para que un desarrollador actúe de inmediato.",
      },
    },
    {
      title: { en: "Guard with regression", es: "Proteger con regresión" },
      body: {
        en: "Each fixed bug becomes a test, so it stays fixed.",
        es: "Cada bug corregido se vuelve una prueba, para que no regrese.",
      },
    },
  ],

  stack: [
    {
      group: { en: "Automation", es: "Automatización" },
      items: ["Playwright", "Selenium", "Cypress"],
    },
    { group: { en: "Languages", es: "Lenguajes" }, items: ["TypeScript", "JavaScript", "Python"] },
    {
      group: { en: "APIs & performance", es: "APIs y rendimiento" },
      items: ["Postman", "Swagger", "REST", "JMeter"],
    },
    {
      group: { en: "CI/CD", es: "CI/CD" },
      items: ["GitHub Actions", "Jenkins", "GitLab", "Azure DevOps", "Docker"],
    },
    { group: { en: "Data", es: "Datos" }, items: ["PostgreSQL", "MySQL", "MongoDB", "SQL"] },
    {
      group: { en: "Test management", es: "Gestión" },
      items: ["Jira", "Xray", "TestRail", "PractiTest"],
    },
    { group: { en: "AI", es: "IA" }, items: ["Claude Code", "Codex", "Gemini", "Perplexity"] },
  ],

  education: {
    degree: { en: "Computer Engineering", es: "Ingeniería de la Computación" },
    school: "Universidad Simón Bolívar",
    years: "2019–2023",
    courses: [
      "AWS Cloud Practitioner",
      "Scrum Foundation Professional",
      "Test Automation with Playwright and Python",
      "Selenium",
      "SQL",
    ],
  },

  beyondQa: {
    en: "I co-founded VOS Learning Center, where I still teach English. Years of explaining grammar to beginners made me good at explaining a bug to a client.",
    es: "Cofundé VOS Learning Center, donde sigo enseñando inglés. Años explicando gramática a principiantes me enseñaron a explicarle un bug a un cliente.",
  } satisfies T,

  /** Personal projects. Empty for now; the section shows an empty state. */
  projects: [] as { name: string; url: string; description: T; tags: string[] }[],
};

export type Profile = typeof profile;
