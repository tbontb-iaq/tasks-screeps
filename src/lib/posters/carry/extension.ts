export function post_tasks({ extensions = g.s.extensions } = {}) {
	extensions.forEach((extension) => {
		if (extension.store.getFreeCapacity(RESOURCE_ENERGY)) {
			let task = t.carry.task(extension.memory.p_task.carry);
			if (!task) {
				extension.memory.p_task.carry = t.carry.add_task(extension);
			}
		}
	});
}
