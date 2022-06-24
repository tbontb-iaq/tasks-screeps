export function post_tasks({ towers = g.s.towers, needed = 1 } = {}) {
	towers.forEach((tower) => {
		if (tower.store.getFreeCapacity(RESOURCE_ENERGY)) {
			const task = t.carry.task(tower.memory.p_task.carry);
			if (!task) {
				tower.memory.p_task.carry = t.carry.add_task(tower, { needed });
			}
		}
	});
}
