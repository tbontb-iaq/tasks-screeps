export function post_tasks({
	controllers = g.s.controller,
	needed = 3,
	renew = true,
} = {}) {
	controllers.forEach((controller) => {
		const task = t.work.task(controller.memory.p_task.work);
		if (!task) {
			controller.memory.p_task.work = t.work.add_task(
				"upgrade", controller, RESOURCE_ENERGY, needed
			);
		} else if (renew && task.undone && task.undone < needed) {
			++task.needed;
			++task.undone;
		}
	});
}
