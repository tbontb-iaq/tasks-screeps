interface Memory {
	creeps: { [name: string]: CreepMemory };
	powerCreeps: { [name: string]: PowerCreepMemory };
	flags: { [name: string]: FlagMemory };
	rooms: { [name: string]: RoomMemory };
	spawns: { [name: string]: SpawnMemory };

	readonly initd: boolean;
	readonly log_level: number;

	sources: { [id: Id<Source>]: SourceMemory };
	structures: { [id: Id<Structure>]: StructureMemory };
	construction_sites: { [id: Id<ConstructionSite>]: ConstructionSiteMemory };

	// 游戏对象的 id

	r: {
		sources_id: Id<Source>[];
		minerals_id: Id<Mineral>[];
		deposits_id: Id<Deposit>[];
	};

	s: {
		extensions_id: Id<StructureExtension>[];
		roads_id: Id<StructureRoad>[];
		walls_id: Id<StructureWall>[];
		ramparts_id: Id<StructureRampart>[];
		towers_id: Id<StructureTower>[];
		containers_id: Id<StructureContainer>[];
		storage_id: Id<StructureStorage>[];
		links_id: Id<StructureLink>[];
		extractor_id: Id<StructureExtractor>[];
		labs_id: Id<StructureLab>[];
		terminal_id: Id<StructureTerminal>[];
		factory_id: Id<StructureFactory>[];
		spawns_id: Id<StructureSpawn>[];
		observer_id: Id<StructureObserver>[];
		power_spawn_id: Id<StructurePowerSpawn>[];
		nuker_id: Id<StructureNuker>[];

		controller_id: Id<StructureController>[];
		invader_core_id: Id<StructureInvaderCore>[];
		keeper_lair_id: Id<StructureKeeperLair>[];
		power_bank_id: Id<StructurePowerBank>[];
		portal_id: Id<StructurePortal>[];
	};

	tasks: {
		work: MemoryTask<import("lib/tasks").Work.Task>;
		carry: MemoryTask<import("lib/tasks").Carry.Task>;
		spawn: MemoryTask<import("lib/tasks").Spawn.Task>;
		tower: MemoryTask<import("lib/tasks").Tower.Task>
	};

	roles: {
		worker: Id<Creep>[];
		carrier: Id<Creep>[];
	};
}
