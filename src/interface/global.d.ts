interface GameObjects {
  r: {
    sources: Source[];
    minerals: Mineral[];
    deposits: Deposit[];
  };

  s: {
    extensions: StructureExtension[];
    roads: StructureRoad[];
    walls: StructureWall[];
    ramparts: StructureRampart[];
    towers: StructureTower[];
    containers: StructureContainer[];
    storage: StructureStorage[];
    links: StructureLink[];
    extractor: StructureExtractor[];
    labs: StructureLab[];
    terminal: StructureTerminal[];
    factory: StructureFactory[];
    spawns: StructureSpawn[];
    observer: StructureObserver[];
    power_spawn: StructurePowerSpawn[];
    nuker: StructureNuker[];

    controller: StructureController[];
    invader_core: StructureInvaderCore[];
    keeper_lair: StructureKeeperLair[];
    power_bank: StructurePowerBank[];
    portal: StructurePortal[];
  };

  center: AnyStoreStructure;
}

interface GlobalTasks {
  work: import("lib/tasks").Work.Manager;
  carry: import("lib/tasks").Carry.Manager;
  spawn: import("lib/tasks").Spawn.Manager;
  tower: import("lib/tasks").Tower.Manager;
}

type GlobalRoles = Record<import("types/roles").Role, Creep[]>;

declare var g: GameObjects;
declare var t: GlobalTasks;
declare var r: GlobalRoles;

declare function o<T extends _HasId>(id: Id<T>): T | null;
declare function oa<T extends _HasId>(id_array: Id<T>[]): T[];
