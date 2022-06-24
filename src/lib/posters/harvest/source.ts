export function post_tasks({
	sources = g.r.sources,
	renew = true,
	needed_ratio = 1,
	needed_min = 2,
	needed_max = 3,
} = {}) {
	sources.forEach((source) => {
		if (source.energy) {
			const task = t.work.task(source.memory.p_task.work),
				needed = Math.floor(
					Math.min(
						needed_max,
						Math.max(needed_min, source.memory.mineable * needed_ratio)
					)
				);
			if (!task) {
				source.memory.p_task.work = t.work.add_task(
					"harvest", source, RESOURCE_ENERGY, needed
				);
			} else if (renew && task.undone && task.undone < needed) {
				++task.needed;
				++task.undone;
			}
		}
	});
}
