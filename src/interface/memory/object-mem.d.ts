interface CreepMemory extends TaskMemory {
	role: import("types/roles").Role;
	from_done?: boolean;
}
interface FlagMemory { }
interface PowerCreepMemory { }
interface RoomMemory { }
interface SpawnMemory extends StructureMemory {
	added?: boolean;
	spawned?: boolean;
}

interface SourceMemory extends PTaskMemory, CostMemory {
	mineable: number;
}
interface ConstructionSiteMemory extends PTaskMemory {
	pos: { x: number; y: number };
	type: BuildableStructureConstant;
}
interface StructureMemory extends TaskMemory, CostMemory { }
