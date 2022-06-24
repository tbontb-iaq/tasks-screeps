import { Meeting_Point } from "types/flags";
import { ExecuteReturn, ExecuteTask } from "./actions";

export function loop(workers: Creep[] = r.worker) {
	t.work.assign_task(workers);
	workers.forEach((creep) => {
		let task = t.work.task(creep.memory.e_task_id);
		if (task) {
			if ((creep.ticksToLive ?? Infinity) <= 2) {
				++task.needed;
				creep.memory.e_task_id = undefined;
			} else if (ExecuteTask(creep, task) === ExecuteReturn.TO_OK) {
				--task.undone;
				creep.memory.from_done = false;
				creep.memory.e_task_id = undefined;
			}
		} else {
			const point = Game.flags[Meeting_Point.worker];
			if (point) creep.moveTo(point);
		}
	});
}
