import { Carry } from "lib/tasks";
import { Meeting_Point } from "types/flags";

export function loop(carriers: Creep[] = r.carrier) {
	t.carry.assign_task(carriers);
	carriers.forEach((creep) => {
		let task = t.carry.task(creep.memory.e_task_id);
		if (task) {
			if ((creep.ticksToLive ?? Infinity) <= 2) {
				++task.needed;
			} else if (ExecuteTask(creep, task) === ActionReturn.TO_OK) {
				--task.undone;
				creep.memory.from_done = false;
				creep.memory.e_task_id = undefined;
			}
		} else {
			const point = Game.flags[Meeting_Point.carrier];
			if (point) creep.moveTo(point);
		}
	});
}

enum ActionReturn {
	TO_OK = "TO_OK",
	FROM_OK = "FROM_OK",
	TO_BUSY = "TO_BUSY",
	FROM_BUSY = "FROM_BUSY",
}

type Task = Carry.Task;

function ExeFrom(creep: Creep, task: Task): ActionReturn {
	return creep.store.getUsedCapacity(task.res) < task.amount
		? (creep.withdraw(o(task.from)!, task.res), ActionReturn.FROM_BUSY)
		: ((creep.memory.from_done = true), ExeTo(creep, task));
}

function ExeTo(creep: Creep, task: Task): ActionReturn {
	const target_free = o(task.to)?.store.getFreeCapacity(task.res);
	const creep_used = creep.store.getUsedCapacity(task.res);
	return creep_used && target_free
		? (creep.transfer(
			o(task.to)!,
			task.res,
			Math.min(task.amount, target_free, creep_used)
		),
			ActionReturn.TO_BUSY)
		: ActionReturn.TO_OK;
}

function ExecuteTask(creep: Creep, task: Task): ActionReturn {
	return (creep.memory.from_done ? ExeTo : ExeFrom)(creep, task);
}
