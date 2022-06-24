interface Creep {
	_mounted?: boolean;

	_attack(target: AnyCreep | Structure): CreepActionReturnCode;

	_attackController(target: StructureController): CreepActionReturnCode;

	_build(
		target: ConstructionSite
	): CreepActionReturnCode | ERR_NOT_ENOUGH_RESOURCES | ERR_RCL_NOT_ENOUGH;

	_cancelOrder(methodName: string): OK | ERR_NOT_FOUND;

	_claimController(
		target: StructureController
	): CreepActionReturnCode | ERR_FULL | ERR_GCL_NOT_ENOUGH;

	_dismantle(target: Structure): CreepActionReturnCode;

	_drop(
		resourceType: ResourceConstant,
		amount?: number
	): OK | ERR_NOT_OWNER | ERR_BUSY | ERR_NOT_ENOUGH_RESOURCES;

	_generateSafeMode(target: StructureController): CreepActionReturnCode;

	_getActiveBodyparts(type: BodyPartConstant): number;

	_harvest(
		target: Source | Mineral | Deposit
	): CreepActionReturnCode | ERR_NOT_FOUND | ERR_NOT_ENOUGH_RESOURCES;

	_heal(target: AnyCreep): CreepActionReturnCode;

	_move(direction: DirectionConstant): CreepMoveReturnCode;
	_move(
		target: Creep
	): OK | ERR_NOT_OWNER | ERR_BUSY | ERR_NOT_IN_RANGE | ERR_INVALID_ARGS;

	_moveByPath(
		path: PathStep[] | RoomPosition[] | string
	): CreepMoveReturnCode | ERR_NOT_FOUND | ERR_INVALID_ARGS;

	_moveTo(
		x: number,
		y: number,
		opts?: MoveToOpts
	): CreepMoveReturnCode | ERR_NO_PATH | ERR_INVALID_TARGET;

	_moveTo(
		target: RoomPosition | { pos: RoomPosition },
		opts?: MoveToOpts
	): CreepMoveReturnCode | ERR_NO_PATH | ERR_INVALID_TARGET | ERR_NOT_FOUND;

	_notifyWhenAttacked(
		enabled: boolean
	): OK | ERR_NOT_OWNER | ERR_BUSY | ERR_INVALID_ARGS;

	_pickup(target: Resource): CreepActionReturnCode | ERR_FULL;

	_pull(
		target: Creep
	):
		| OK
		| ERR_NOT_OWNER
		| ERR_BUSY
		| ERR_INVALID_TARGET
		| ERR_NOT_IN_RANGE
		| ERR_NO_BODYPART;

	_rangedAttack(target: AnyCreep | Structure): CreepActionReturnCode;

	_rangedHeal(target: AnyCreep): CreepActionReturnCode;

	_rangedMassAttack(): OK | ERR_NOT_OWNER | ERR_BUSY | ERR_NO_BODYPART;

	_repair(target: Structure): CreepActionReturnCode | ERR_NOT_ENOUGH_RESOURCES;

	_reserveController(target: StructureController): CreepActionReturnCode;

	_say(message: string, toPublic?: boolean): OK | ERR_NOT_OWNER | ERR_BUSY;

	_signController(
		target: StructureController,
		text: string
	): OK | ERR_BUSY | ERR_INVALID_TARGET | ERR_NOT_IN_RANGE;

	_suicide(): OK | ERR_NOT_OWNER | ERR_BUSY;

	_transfer(
		target: AnyCreep | Structure,
		resourceType: ResourceConstant,
		amount?: number
	): ScreepsReturnCode;

	_upgradeController(target: StructureController): ScreepsReturnCode;

	_withdraw(
		target: Structure | Tombstone | Ruin,
		resourceType: ResourceConstant,
		amount?: number
	): ScreepsReturnCode;
}
