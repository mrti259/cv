export type ResumeStyle = {
	columns: number;
	textColor: string;
	linkColor: string;
	primaryColor: string;
	font: {
		family: string;
		size: string;
	};
	photo: {
		size: string;
		radius: string;
	};
	section: {
		shadow: string;
		radius: string;
	};
};

const prop = (name: string) => `var(--${name})`;

export const style: ResumeStyle = {
	columns: 2,
	textColor: prop('cyan-12'),
	linkColor: prop('cyan-9'),
	primaryColor: prop('cyan-10'),
	font: {
		family: prop('font-sans'),
		size: prop('font-size-0')
	},
	photo: {
		size: prop('size-px-11'),
		radius: prop('radius-blob-3')
	},
	section: {
		shadow: prop('shadow-3'),
		radius: prop('radius-2')
	}
};
