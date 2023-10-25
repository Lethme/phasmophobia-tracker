import {Evidence, IGhost, EvidenceNames, evidenceNames} from "./types";

export interface State {
	evidenceNames: EvidenceNames;
	ghosts: Array<IGhost>;
}

const state: State = {
	evidenceNames,
	ghosts: [
		{
			name: "Spirit",
			description: [
				"These are the most common ghosts you will come across but still they are powerful and dangerous.",
				"You can usually discover them at one of their hunting grounds after an unexplained death.",
			],
			strength: [],
			weakness: ["Smudge Sticks to stop it from attacking for a long period of time."],
			evidence: [Evidence.SpiritBox, Evidence.GhostWriting, Evidence.EMF5],
		},
		{
			name: "Wraith",
			description: [
				"They are some of the most dangerous ghosts you will find.",
				"They are the only ghosts who can travel through walls and has the ability to fight.",
			],
			strength: ["They never touch the ground, so they can’t be tracked by footsteps."],
			weakness: ["Wraiths have a toxic reaction to salt."],
			evidence: [Evidence.SpiritBox, Evidence.EMF5, Evidence.DOTS],
		},
		{
			name: "Phantom",
			description: [
				"A phantom ghost can possess the living, and most commonly summoned through an Ouija Board.",
				"It also includes fear into those around it.",
			],
			strength: ["If you look at a phantom directly your sanity will drop faster."],
			weakness: ["You can take a picture of the phantom to make it disappear."],
			evidence: [Evidence.SpiritBox, Evidence.Fingerprints, Evidence.DOTS],
		},
		{
			name: "Poltergeist",
			description: [
				"The most famous ghost Poltergeist known to be a noisemaker by manipulating objects around them to instill fear among its victims.",
			],
			strength: ["Throw a huge amount of objects at once."],
			weakness: ["Ineffective in an empty room as there will no objects to toss around."],
			evidence: [Evidence.SpiritBox, Evidence.Fingerprints, Evidence.GhostWriting],
		},
		{
			name: "Banshee",
			description: [
				"These ghosts are natural hunters who love to stalk it’s prey one at a time making its kill.",
				"Banshee will attack anything that comes in its way.",
			],
			strength: ["Will target one person at a time."],
			weakness: ["Fears crucifix and will be less aggressive near one."],
			evidence: [Evidence.Fingerprints, Evidence.GhostOrbs, Evidence.DOTS],
		},
		{
			name: "Jinn",
			description: [
				"These are territorial ghosts that will attack when they feel threatened.",
				"Jinn travels faster than most of the ghosts at a significant speed.",
			],
			strength: ["Will travel faster if the victim is far away."],
			weakness: ["Turning off the location’s power source will prevent Jinn from using its ability."],
			evidence: [Evidence.Fingerprints, Evidence.FreezingTemperature, Evidence.EMF5],
		},
		{
			name: "Mare",
			description: [
				"These ghosts are the source of all the nightmare the victims see, making it the most powerful ghost in the dark.",
			],
			strength: ["Increased chance to attack in the dark."],
			weakness: ["Turning the lights on around the Mare will lower its chance to attack."],
			evidence: [Evidence.SpiritBox, Evidence.GhostWriting, Evidence.GhostOrbs],
		},
		{
			name: "Revenant",
			description: [
				"They are slow but violent ghosts that will attack everyone indiscriminately.",
				"They also travel at a greater speed like Jinn while hunting.",
			],
			strength: ["Travels faster while hunting."],
			weakness: ["If you are hidden from the Revenant, their speed drops, and they travel slowly."],
			evidence: [Evidence.GhostWriting, Evidence.FreezingTemperature, Evidence.GhostOrbs],
		},
		{
			name: "Shade",
			description: [
				"These are shy ghosts and will stop all activity if there are more than one person nearby.",
			],
			strength: ["Harder to find."],
			weakness: ["Won't fall into the hunting mode if there are multiple people nearby."],
			evidence: [Evidence.GhostWriting, Evidence.FreezingTemperature, Evidence.EMF5],
		},
		{
			name: "Demon",
			description: [
				"These are the worst ghosts you can encounter.",
				"They will attack you without any reason.",
			],
			strength: ["Attacks more often than any other ghost."],
			weakness: ["Asking a successful question on the Ouija board won’t lower sanity."],
			evidence: [Evidence.Fingerprints, Evidence.GhostWriting, Evidence.FreezingTemperature],
		},
		{
			name: "Yurei",
			description: [
				"They have returned to the physical world to take revenge or have a deep hatred for a victim.",
			],
			strength: ["Stronger effect on people’s sanity."],
			weakness: ["Smudging the Yurei room will cause it to not wander around the location for a long time."],
			evidence: [Evidence.FreezingTemperature, Evidence.GhostOrbs, Evidence.DOTS],
		},
		{
			name: "Oni",
			description: [
				"Oni’s are the cousin of demons and are extremely strong.",
				"They will become more active if you wander around them for too long.",
			],
			strength: ["More active when players are nearby or when objects move at great speed."],
			weakness: ["Being more active helps players to easily identify the Oni."],
			evidence: [Evidence.FreezingTemperature, Evidence.EMF5, Evidence.DOTS],
		},
		{
			name: "Yokai",
			description: [
				"A Yokai is a common type of ghost that is attracted to human voices.",
				"They can usually be found haunting family houses.",
			],
			strength: ["Talking near a Yokai will anger it and increase it's chance of attacking."],
			weakness: ["When hunting a Yokai can only hear voices close to it."],
			evidence: [Evidence.SpiritBox, Evidence.GhostOrbs, Evidence.DOTS],
		},
		{
			name: "Hantu",
			description: [
				"A Hantu is a rare ghost that can be found in hot climates.",
				"They are known to attack often during cold weather.",
			],
			strength: ["Lower temperatures can cause the Hantu to move at faster speeds."],
			weakness: ["A Hantu will move slower in warmer areas."],
			evidence: [Evidence.Fingerprints, Evidence.FreezingTemperature, Evidence.GhostOrbs],
		},
		{
			name: "Goryo",
			description: [
				"Using a video camera is the only way to view a Goryo, when it passes through a DOTS projector.",
			],
			strength: ["A Goryo will usually only show itself on camera if there are no people nearby."],
			weakness: ["They are rarely seen far from their place of death."],
			evidence: [Evidence.Fingerprints, Evidence.EMF5, Evidence.DOTS],
		},
		{
			name: "Myling",
			description: [
				"A Myling is a very vocal and active ghost.",
				"They are rumoured to be quiet when hunting their prey.",
			],
			strength: ["A Myling is known to be quieter when hunting."],
			weakness: ["Mylings more frequently make paranormal sounds."],
			evidence: [Evidence.Fingerprints, Evidence.GhostWriting, Evidence.EMF5],
		},
		{
			name: "The Twins",
			description: [
				"These ghosts have been reported to mimic each other's actions.",
				"They alternate their attacks to confuse their prey.",
			],
			strength: ["Either Twin can be angered and initiate an attack on their prey."],
			weakness: ["The Twins will often interact with the environment at the same time."],
			evidence: [Evidence.SpiritBox, Evidence.FreezingTemperature, Evidence.EMF5],
		},
		{
			name: "Onryo",
			description: [
				"The Onryo is often referred to as \"The Wraithful Spirit\".",
				"It steals souls from dying victims' bodies to seek revenge.",
				"This ghost has been known to fear any form of fire, and will do anything to be far from it.",
			],
			strength: ["Extinguishing a flame can cause an Onryo to attack."],
			weakness: ["When threatened, this ghost will be less likely to hunt."],
			evidence: [Evidence.SpiritBox, Evidence.FreezingTemperature, Evidence.GhostOrbs],
		},
		{
			name: "Obake",
			description: [
				"Obake are terrifying shape-shifters, capable of taking on many forms.",
				"They have been seen taking on humanoid shapes to attrack their prey.",
			],
			strength: ["While interacting with the environment, Obake will rarely leave a trace."],
			weakness: ["Sometimes this ghost will shapeshift, leaving behind unique evidence."],
			evidence: [Evidence.Fingerprints, Evidence.EMF5, Evidence.GhostOrbs],
		},
		{
			name: "Raiju",
			description: [
				"A Raiju is a demon that thrives on electrical current.",
				"While generally calm, they can become agitated when overwhelmed with power.",
			],
			strength: ["A Raiju can siphon power from nearby electrical devices, making it move faster."],
			weakness: ["Raiju are constantly disrupting electronic equipment, making it easier to track when attacking."],
			evidence: [Evidence.EMF5, Evidence.GhostOrbs, Evidence.DOTS],
		},
		{
			name: "The Mimic",
			description: [
				"The mimic is an elusive, mysterious, copycat ghost that mirrors traits and behavior from others, including other ghost types.",
			],
			strength: ["We're unsure what this ghost is capable of. Be careful."],
			weakness: ["Several reports have noted ghost orb sightings near mimics."],
			evidence: [Evidence.SpiritBox, Evidence.Fingerprints, Evidence.FreezingTemperature],
		},
		{
			name: "Moroi",
			description: [
				"Moroi have risen from the grave to drain energy from the living.",
				"They have been known to place curses on their victims, curable only by antidotes or moving very far away.",
			],
			strength: ["Moves noticeably faster at low player sanity."],
			weakness: ["Smudge sticks blind the ghost for longer during hunts."],
			evidence: [Evidence.SpiritBox, Evidence.GhostWriting, Evidence.FreezingTemperature],
		},
		{
			name: "Deogen",
			description: [
				"Sometimes surrounded by an endless fog, Deogen have been eluding ghost hunters for years.",
				"These ghosts have been reported to find even the most hidden prey, before stalking them into exhaustion.",
			],
			strength: [
				"Always knows where players are during a hunt.",
				"Moves at a high speed with no player in sight.",
			],
			weakness: ["Significantly slows down when near the player."],
			evidence: [Evidence.SpiritBox, Evidence.GhostWriting, Evidence.DOTS],
		},
		{
			name: "Thaye",
			description: [
				"Thaye have been known to rapidly age over time, even in the afterlife.",
				"From what we've learned, they seem to deteriorate faster while within the presence of the living.",
			],
			strength: ["Entering the location makes it active, defensive and agile."],
			weakness: ["Becomes slower and less active overtime."],
			evidence: [Evidence.GhostWriting, Evidence.GhostOrbs, Evidence.DOTS],
		},
	].sort((a: IGhost, b: IGhost) => {
		if (a.name < b.name) {
			return -1;
		}
		if (a.name > b.name) {
			return 1;
		}
		return 0;
	}),
}

export default state;