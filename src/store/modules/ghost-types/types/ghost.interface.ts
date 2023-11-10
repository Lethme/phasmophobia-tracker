import Evidence from "./evidence.enum";

interface IGhost {
	name: string;
	description: Array<string>;
	strength: Array<string>;
	weakness: Array<string>;
	evidence: Array<Evidence>;
	speed: {
		min: number,
		max: number,
	},
}

export default IGhost;