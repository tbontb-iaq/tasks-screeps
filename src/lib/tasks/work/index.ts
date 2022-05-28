import { ManagerBase, TaskBase } from "../base";

type TMap = {
	harvest: HarvestAble;
	build: BuildAble;
	repair: RepairAble;
	dismantle: DismantleAble;
	upgrade: UpgradeAble;
};

type TaskType = keyof TMap;

type HarvestAbleRes = RESOURCE_ENERGY | MineralConstant | DepositConstant;

class Task<T extends TaskType = TaskType> extends TaskBase {
	constructor(
		public readonly type: T,
		public readonly target: Id<TMap[T]>,
		public readonly res: T extends "harvest" ? HarvestAbleRes : RESOURCE_ENERGY,
		needed: number,
		undone: number = needed
	) {
		super(needed, undone);
	}
}

const Priority_Map: Record<TaskType, number> = {
	harvest: 5,
	repair: 4,
	upgrade: 3,
	build: 2,
	dismantle: 1,
};

class Manager extends ManagerBase<Task>  {
	constructor(tasks = Memory.tasks.work) {
		super(tasks);
	}
	override compare(id1: number, id2: number): number {
		return (
			Priority_Map[this.task(id2)!.type] - Priority_Map[this.task(id1)!.type]
		);
	}
	override add_task<T extends TaskType>(
		type: T,
		// target: TMap[T] 会出现错误
		target: { id: Id<TMap[T]> },
		res: T extends "harvest"
			? HarvestAbleRes
			: RESOURCE_ENERGY = RESOURCE_ENERGY,
		needed: number = 1
	): number {
		return super._add_task(new Task(type, target.id, res, needed));
	}
	override assign_task(workers: Creep[]) {
		super.assign_task(workers);
	}
}

export { TaskType, Task, Manager };
