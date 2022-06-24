type AnyBuildableStructure =
	| StructureExtension
	| StructureRampart
	| StructureRoad
	| StructureSpawn
	| StructureLink
	| StructureWall
	| StructureStorage
	| StructureTower
	| StructureObserver
	| StructurePowerSpawn
	| StructureExtractor
	| StructureLab
	| StructureTerminal
	| StructureContainer
	| StructureNuker
	| StructureFactory;

type HarvestAble = Source | Mineral | Deposit;
type BuildAble = ConstructionSite;
type RepairAble = Structure;
type DismantleAble = Structure;
type UpgradeAble = StructureController;
type TransferAble = AnyCreep | Structure;
type WithdrawAble = Structure | Tombstone | Ruin;

type AttackAble = AnyCreep | Structure;
type HealAble = AnyCreep;
