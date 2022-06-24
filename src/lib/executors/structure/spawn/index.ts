import { arr_repeat } from "lib/utils";
import { BodyObjMap } from "./body";

export function loop({ spawns = g.s.spawns } = {}) {
	t.spawn.assign_task(spawns);
	spawns.forEach((spawn) => {
		let task = t.spawn.task(spawn.memory.e_task_id);
		if (task) {
			if (!spawn.memory.spawned) {
				const body = BodyObjMap[task.role];
				if (
					spawn.spawnCreep(
						arr_repeat(
							body.body,
							Math.min(
								body.max_times,
								Math.floor(
									spawn.room[
									r[task.role].length === 0
										? "energyAvailable"
										: "energyCapacityAvailable"
									] / body.cost
								)
							)
						),
						`${task.role}-${Game.time}`,
						{ memory: { role: task.role, p_task: {} } }
					) === OK
				)
					spawn.memory.spawned = true;
				else {
					++task.needed;
					spawn.memory.e_task_id = undefined;
				}
			} else if (spawn.spawning === null) {
				--task.undone;
				spawn.memory.e_task_id = undefined;
				spawn.memory.spawned = spawn.memory.added = false;
			} else if (!spawn.memory.added && spawn.spawning.name) {
				r[task.role].push(Game.creeps[spawn.spawning.name]!);
				spawn.memory.added = true;
			}
		}
	});
}
