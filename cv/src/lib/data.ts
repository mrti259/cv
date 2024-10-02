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
		location: 'San Isidro, Buenos Aires, AR',
		email: 'borjagaribotti@gmail.com',
		linkedin: 'borjagaribotti',
		photo: `${base}/photo.jpg`
	},
	sections: [
		{
			title: 'Sobre mí',
			content: [
				`
Actualmente trabajo como desarrollador de Software, mientras curso el cuarto año de Ingeniería en Informática y tengo un cargo como ayudante ad honorem.

Soy una persona responsable y organizada.
Me gusta aprender nuevas tecnologías, incursionar en proyectos propios, trabajar en equipo y colaborar con más personas.

`
			]
		},
		{
			title: 'Aptitudes',
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
`,
				`
Idiomas:
* Español: Nativo
* Inglés: B2
`
			]
		},
		{
			title: 'Proyectos',
			content: [
				`
Disponibles en: [github.com/mrti259](https://github.com/mrti259)

* **dbotion**: gestiona las bases de datos de Notion fácilmente.
* **open-api**: genera una especificación de OpenAPI en formato JSON.
* **insoft1-api**: automatiza la creación de páginas de Notion para la corrección de entregas, y el envío de mails.
* **gastos**: registra nuevos gastos en Notion con un bot de Telegram.
`
			]
		},
		{
			title: 'Experiencia',
			content: [
				`
Mayo 2021 - Presente | 3 años
### Desarrollador Full Stack, Okapii

* Trabajo en diferentes equipos de dos hasta cinco personas con metodologías ágiles.
* Desarrollo de aplicaciones web, mobile, desktop y API Rest.
* Implementación de tests unitarios y de integración.
* Manejo de bases de datos SQL Server.
* Integración con medios de pagos (entidades bancarias, Payway).
`,
				`
Noviembre 2020 - Mayo 2021 | 7 meses
### Desarrollador Full Stack, Ejército Argentino

* Trabajo en un equipo de tres personas.
* Desarrollo de aplicaciones web e integración con API Rest.
`
			]
		},
		{
			title: 'Educación',
			content: [
				`
Abril 2020 - Presente | 4to. año
### Ingeniería en Informática, Universidad de Buenos Aires

Promedio: 8.35 (19 materias aprobadas)
`
			]
		},
		{
			title: 'Ayudantías',
			content: [
				`
Agosto 2023 - Presente | 1 año
### Ayudante Ad Honorem, Universidad de Buenos Aires
Ingeniería de Software I

* Introducción a la Ingeniería de Software y metodologías de trabajo.
* Enseñanza de Heurísticas de Diseño, Patrones de Diseño, Test Driven Development.
* Asistencia en consultas en clase y por Discord.
* Corrección de ejercicios y exámenes.
* Gestión de workspace en Notion
`,
				`
Agosto 2021 - Agosto 2023 | 2 años
### Colaborador, Universidad de Buenos Aires
Algoritmos y Programación III

* Enseñanza de Programación Orientada a Objetos, Heurísticas de Diseño, Patrones de Diseño, Test Driven Development.
`,
			]
		},
	]
};
