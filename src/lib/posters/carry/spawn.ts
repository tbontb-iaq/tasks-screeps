export function post_tasks({ spawns = g.s.spawns, needed = 1 } = {}) {
	spawns.forEach((spawn) => {
		if (spawn.store.getFreeCapacity(RESOURCE_ENERGY)) {
			const task = t.carry.task(spawn.memory.p_task.carry);
			if (!task) {
				spawn.memory.p_task.carry = t.carry.add_task(spawn, { needed });
			}
		}
	});
}
