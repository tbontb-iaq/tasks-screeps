import { assertType } from "lib/utils";

function updateMemory() {
	Object.keys(Memory.construction_sites).forEach((site_id) => {
		assertType<Id<ConstructionSite>>(site_id);
		if (!o(site_id)) {
			const memory = Memory.construction_sites[site_id]!;
			Object.values(Game.rooms)[0]!
				.lookForAt(LOOK_STRUCTURES, memory.pos.x, memory.pos.y)
				.filter((s) => s.structureType === memory.type)
				.forEach((s) => {
					assertType<AnyBuildableStructure>(s);
					switch (s.structureType) {
						case STRUCTURE_EXTENSION:
							Memory.s.extensions_id.push(s.id);
							break;
						case STRUCTURE_RAMPART:
							Memory.s.ramparts_id.push(s.id);
							break;
						case STRUCTURE_ROAD:
							Memory.s.roads_id.push(s.id);
							break;
						case STRUCTURE_SPAWN:
							Memory.s.spawns_id.push(s.id);
							break;
						case STRUCTURE_LINK:
							Memory.s.links_id.push(s.id);
							break;
						case STRUCTURE_WALL:
							Memory.s.walls_id.push(s.id);
							break;
						case STRUCTURE_STORAGE:
							Memory.s.storage_id.push(s.id);
							break;
						case STRUCTURE_TOWER:
							Memory.s.towers_id.push(s.id);
							break;
						case STRUCTURE_OBSERVER:
							Memory.s.observer_id.push(s.id);
							break;
						case STRUCTURE_POWER_SPAWN:
							Memory.s.power_spawn_id.push(s.id);
							break;
						case STRUCTURE_EXTRACTOR:
							Memory.s.extractor_id.push(s.id);
							break;
						case STRUCTURE_LAB:
							Memory.s.labs_id.push(s.id);
							break;
						case STRUCTURE_TERMINAL:
							Memory.s.terminal_id.push(s.id);
							break;
						case STRUCTURE_CONTAINER:
							Memory.s.containers_id.push(s.id);
							break;
						case STRUCTURE_NUKER:
							Memory.s.nuker_id.push(s.id);
							break;
						case STRUCTURE_FACTORY:
							Memory.s.factory_id.push(s.id);
							break;
						default:
							console.log(s); // typeof s === never
					}
				});
			delete Memory.construction_sites[site_id];
		}
	});
}

// TODO 工地应该与房间关联，提供多个房间的支持

export function post_tasks({
	needed = 1,
	sites = Object.values(Game.constructionSites),
	renew = true,
} = {}) {
	sites.forEach((site) => {
		const task = t.work.task(site.memory.p_task.work);
		if (!task) {
			site.memory.p_task.work = t.work.add_task(
				"build", site, RESOURCE_ENERGY, needed
			);
		} else if (renew && task.undone && task.undone < needed) {
			++task.needed;
			++task.undone;
		}
	});
	updateMemory();
}
