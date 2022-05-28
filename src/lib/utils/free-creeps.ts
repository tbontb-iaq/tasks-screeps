import { Role } from "types/roles";

function free_creeps(role: Role): number {
	return r[role].reduce(
		(sum, creep) => sum + (creep.memory.e_task_id === undefined ? 1 : 0), 0
	)
}

export { free_creeps }