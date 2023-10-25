import { State } from "./state";
import IGhost from "./types/ghost.interface"

const getters = {
	ghosts(state: State): Array<IGhost> {
		return state.ghosts;
	},
	evidenceNames(state: State) {
		return state.evidenceNames;
	}
}

export default getters;