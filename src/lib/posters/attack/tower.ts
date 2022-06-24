export function post_tasks({
	enemy_creeps = g.center.room.find(FIND_HOSTILE_CREEPS),
	enemy_power_creeps = g.center.room.find(FIND_HOSTILE_POWER_CREEPS)
} = {}) {
	enemy_creeps.forEach(c => t.tower.add_task("attack", c));
	enemy_power_creeps.forEach(c => t.tower.add_task("attack", c));
}