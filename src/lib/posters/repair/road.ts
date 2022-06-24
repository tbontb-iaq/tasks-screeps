export function post_tasks({ roads = g.s.roads }) {
	roads.forEach(road => {
		if (road.hits < road.hitsMax) t.tower.add_task("repair", road);
	});
}