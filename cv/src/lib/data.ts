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
		name: 'Borja Garibotti',
		position: 'Desarrollador Full Stack',
		location: 'Ciudad de Buenos Aires, AR',
		email: 'borjagaribotti@gmail.com',
		linkedin: 'borjagaribotti',
		photo: `${base}/photo.jpg`,
	},
	sections: [
		{
			title: 'Sobre mí',
			content: [
				`
Desarrollador Full Stack con 4 años de experiencia en arquitecturas .NET, React Native y cloud (Azure). Actualmente cursando el 5to año de Ingeniería en Informática (UBA) con promedio destacado (8.33).
				
Apasionado por la calidad del código y las buenas prácticas (TDD, Clean Code).
`,
			],
		},
		{
			title: 'Educación',
			content: [
				`
### Ingeniería en Informática
Universidad de Buenos Aires | Abril 2020 - Presente

Promedio: 8.33 (22 materias aprobadas)
`,
			],
		},

		{
			title: 'Habilitades Técnicas',
			content: [
				`
Tecnologías:
* Lenguajes: C#, JavaScript, TypeScript, Python
* Backend: .NET Framework, .NET Core, Node.js
* Frontend: HTML, CSS, jQuery, Bootstrap, React, Svelte
* Mobile: React Native, Expo
* DB: SQL Server
* Cloud: Azure
* Arquitecturas: MVC, Server-Client, Serverless
* Versionado de código: Git, GitHub
* Herramientas: Notion, Asana, Slack, Gsuite
* Idiomas: Español (nativo), Inglés (B2 técnico)
`,
			],
		},
		{
			title: 'Proyectos',
			content: [
				`
Disponibles en: [github.com/mrti259](https://github.com/mrti259)
`,
			],
		},
		{
			title: 'Experiencia',
			content: [
				`
### Líder de Proyecto
Okapii | Enero 2025 - Presente

* Lideré un equipo de 2 desarrolladores en el desarrollo completo de una aplicación móvil (React Native/TypeScript) y una API REST (.NET/C#), con arquitectura escalable en Azure y gestión de bases de datos (SQL Server).
* Gestioné la comunicación directa con el cliente, priorizando requerimientos y garantizando entregas semanales mediante metodologías ágiles (Scrum/Kanban), lo que aseguró una alineación constante con sus necesidades.
* Estandaricé flujos de trabajo en GitHub (branches, PRs), acelerando la entrega de features.
* Implementé revisiones de código (PRs en GitHub), pruebas de endpoints con Postman e integración continua, reduciendo bugs críticos en producción.
`,
				`
### Desarrollador Full Stack
Okapii | Mayo 2021 - Presente

* Desarrollo de APIs escalables con .NET Core y SQL Server, siguiendo patrones Clean Architecture.
* Creación de aplicaciones móviles React Native/TypeScript y web (HTML/CSS/Bootstrap).
* Colaboración en equipos ágiles (Scrum), garantizando entregas puntuales y calidad mediante PRs en Github.
`,
				`
### Desarrollador Full Stack
Ejército Argentino | Noviembre 2020 - Mayo 2021

* Desarrollo de aplicaciones web e integración con API REST.
`,
			],
		},
		{
			title: 'Docencia Universitaria',
			content: [
				`
### Ayudante Ad Honorem
Universidad de Buenos Aires | Agosto 2023 - Diciembre 2024

* Introducción a la Ingeniería de Software y metodologías de trabajo.
* Enseñanza de Heurísticas de Diseño, Patrones de Diseño, Test Driven Development.
* Corrección de ejercicios y exámenes.
* Gestión de workspace en Notion
`,
				`
### Colaborador
Universidad de Buenos Aires | Agosto 2021 - Agosto 2023

* Enseñanza de Programación Orientada a Objetos.
* Corrección de ejercicios y exámenes.
`,
			],
		},
	],
};
