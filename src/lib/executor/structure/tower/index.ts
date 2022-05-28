export function loop(towers: StructureTower[] = g.s.towers) {
	t.tower.assign_task(towers);
	// TODO IMPORTANT
	const enemies = g.center.room.find(FIND_HOSTILE_CREEPS);
	towers.forEach(tower => {
		tower.attack(enemies[0]!);
	});
}