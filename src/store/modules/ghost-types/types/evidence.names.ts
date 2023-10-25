import Evidence from "./evidence.enum";

export type EvidenceNames = {
	[key in Evidence]: string;
}

const evidenceNames: EvidenceNames = {
	[Evidence.SpiritBox]: "Spirit Box",
	[Evidence.Fingerprints]: "Fingerprints",
	[Evidence.GhostWriting]: "Ghost Writing",
	[Evidence.FreezingTemperature]: "Freezing Temperature",
	[Evidence.EMF5]: "EMF 5",
	[Evidence.GhostOrbs]: "Ghost Orbs",
	[Evidence.DOTS]: "DOTS",
}

export default evidenceNames;