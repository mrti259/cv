const base = import.meta.env.BASE_URL;

export type ResumeData = {
  info: {
    name: string;
    position: string;
    location: string;
    email: string;
    linkedin: string;
    photo?: string;
  };
  sections: Array<{
    title: string;
    content: string[];
  }>;
};

export const data: ResumeData = {
  info: {
    name: "Borja Garibotti",
    position: "Desarrollador Full Stack",
    location: "Buenos Aires, AR",
    email: "borjagaribotti@gmail.com",
    linkedin: "borjagaribotti",
    photo: `${base}/photo.jpg`,
  },
  sections: [
    {
      title: "Sobre mí",
      content: [
        `
Actualmente me encuentro trabajando como Desarrollador Full Stack, cursando el cuarto año de la carrera Ingeniería en Informática, y ejerciendo como ayudante activo en la materia Ingeniería de Software I, donde realizo tareas de gestión, corrijo trabajos y exámenes y asisto en 
consultas del alumnado. Soy responsable y organizado. Me gusta
trabajar en equipo, abrir debates y ver distintos puntos de vista.
`,
      ],
    },
    {
      title: "Aptitudes",
      content: [
        `
Tecnologías:
* Lenguajes: C#, JavaScript, TypeScript, Python
* Backend: .NET, .NET Core, .NET Framework, Node.js
* Frontend: HTML, CSS, jQuery, Bootstrap, React, Svelte
* Mobile: React Native, Flutter
* DB: SQL Server
`,
        `
Idiomas:
* Español: Nativo
* Inglés: B2
`,
      ],
    },
    {
      title: "Proyectos",
      content: [
        `
Disponibles en: [github.com/mrti259](https://github.com/mrti259)

* **dbotion**: gestiona las bases de datos de Notion con facilidad
* **open-api**: genera una especificación de OpenAPI en formato JSON
* **insoft1-api**: usa las funciones Serverless de Vercel para automatizar tareas. Hace uso de *dbotion* y *open-api*
`,
      ],
    },
    {
      title: "Experiencia",
      content: [
        `
Mayo 2021 - Presente | 3 años
### Desarrollador Full Stack, Okapii

Desarrollo de aplicaciones.

*Aptitudes:
Metodologías ágiles -
Desarrollo de aplicaciones web, mobile, desktop, API Rest -
Tests unitarios, de integración -
.NET Framework - .NET Core - C# -
JavaScript - TypeScript - React Native - Flutter -
jQuery - Bootstrap -
SQL Server*
`,
        `
Noviembre 2020 - Mayo 2021 | 7 meses
### Desarrollador Full Stack, Ejército Argentino

Desarrollo de aplicaciones en equipos de tres personas.

*Aptitudes:
Desarrollo de aplicaciones web, API Rest -
.NET - C# - PHP - Laravel - JavaScript - jQuery - Bootstrap*
`,
      ],
    },
    {
      title: "Educación",
      content: [
        `
Abril 2020 - Presente | 4to. año
### Ingeniería en Informática, Universidad de Buenos Aires

Promedio: 8.35 (19 materias aprobadas)
`,
      ],
    },
    {
      title: "Ayudantías",
      content: [
        `
Agosto 2023 - Presente | 1 año
### Ayudante Ad-Honorem, Universidad de Buenos Aires
Ingeniería de Software I
`,
        `
Agosto 2021 - Agosto 2023 | 2 años
### Colaborador, Universidad de Buenos Aires
Algoritmos y Programación III
`,
      ],
    },
  ],
};
