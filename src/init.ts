import { get_mineable_num } from "lib/utils";

function init_memory(m_key: keyof Memory & keyof Game) {
	Memory[m_key] = {};
	Object.values(Game[m_key]).forEach((g_value) =>
		Reflect.set(Memory[m_key], g_value["name"], {})
	);
}

export const deepInit = () => {
	// @ts-ignore
	for (let key in Memory) delete Memory[key];

	init_memory("creeps");
	init_memory("powerCreeps");
	init_memory("flags");
	init_memory("rooms");
	init_memory("spawns");
};

export const roomInit = () => {
	// @ts-ignore
	Memory.initd = true;
	// @ts-ignore
	Memory.log_level = 0;

	Memory.sources = {};
	Memory.structures = {};
	Memory.construction_sites = {};

	const spawn = Object.values(Game.spawns)[0]!;
	Memory.r = {
		// source id 按距离初始 spawn 远近排序
		sources_id: spawn.room
			.find(FIND_SOURCES)
			.map((source) => {
				return {
					source: source,
					cost: PathFinder.search(spawn.pos, { pos: source.pos, range: 1 })
						.cost,
				};
			})
			.sort((a, b) => a.cost - b.cost)
			.map((obj) => obj.source.id),
		minerals_id: [],
		deposits_id: [],
	};

	Memory.s = {
		extensions_id: [],
		roads_id: [],
		walls_id: [],
		ramparts_id: [],
		towers_id: [],
		containers_id: [],
		storage_id: [],
		links_id: [],
		extractor_id: [],
		labs_id: [],
		terminal_id: [],
		factory_id: [],
		spawns_id: [],
		observer_id: [],
		power_spawn_id: [],
		nuker_id: [],

		controller_id: [],
		invader_core_id: [],
		keeper_lair_id: [],
		power_bank_id: [],
		portal_id: [],
	};

	spawn.room.find(FIND_STRUCTURES).forEach((s) => {
		switch (s.structureType) {
			case STRUCTURE_EXTENSION:
				Memory.s.extensions_id.push(s.id);
				break;
			case STRUCTURE_ROAD:
				Memory.s.roads_id.push(s.id);
				break;
			case STRUCTURE_WALL:
				Memory.s.walls_id.push(s.id);
				break;
			case STRUCTURE_RAMPART:
				Memory.s.ramparts_id.push(s.id);
				break;
			case STRUCTURE_TOWER:
				Memory.s.towers_id.push(s.id);
				break;
			case STRUCTURE_CONTAINER:
				Memory.s.containers_id.push(s.id);
				break;
			case STRUCTURE_STORAGE:
				Memory.s.storage_id.push(s.id);
				break;
			case STRUCTURE_LINK:
				Memory.s.links_id.push(s.id);
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
			case STRUCTURE_FACTORY:
				Memory.s.factory_id.push(s.id);
				break;
			case STRUCTURE_SPAWN:
				Memory.s.spawns_id.push(s.id);
				break;
			case STRUCTURE_OBSERVER:
				Memory.s.observer_id.push(s.id);
				break;
			case STRUCTURE_POWER_SPAWN:
				Memory.s.power_spawn_id.push(s.id);
				break;
			case STRUCTURE_NUKER:
				Memory.s.nuker_id.push(s.id);
				break;

			case STRUCTURE_CONTROLLER:
				Memory.s.controller_id.push(s.id);
				break;
			case STRUCTURE_INVADER_CORE:
				Memory.s.invader_core_id.push(s.id);
				break;
			case STRUCTURE_KEEPER_LAIR:
				Memory.s.keeper_lair_id.push(s.id);
				break;
			case STRUCTURE_POWER_BANK:
				Memory.s.power_bank_id.push(s.id);
				break;
			case STRUCTURE_PORTAL:
				Memory.s.portal_id.push(s.id);
				break;
			default:
				console.log(`不支持的建筑类型 ${s}`);
				for (let k in s as any) console.log(`${k}:${s[k]}`);
		}
	});

	Memory.r.sources_id.forEach((source_id) => {
		Memory.sources[source_id] = {
			cost: {},
			mineable: get_mineable_num(o(source_id)!),
			p_task: {},
		};
	});

	Object.values(Memory.s).forEach((ids) => {
		ids.forEach(
			(id) => (Game.getObjectById(id)!.memory = { cost: {}, p_task: {} })
		);
	});

	Memory.tasks = {
		work: { record: {}, id_arr: [] },
		spawn: { record: {}, id_arr: [] },
		carry: { record: {}, id_arr: [] },
		tower: { record: {}, id_arr: [] },
	};

	Memory.roles = {
		worker: [],
		carrier: [],
	};

	Memory.watch = {
		expressions: {},
		values: {},
	};

	console.log("room initd!");
};
