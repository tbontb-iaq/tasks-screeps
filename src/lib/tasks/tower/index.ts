import { ManagerBase, TaskBase } from "../base";

type TMap = {
	attack: AttackAble;
	heal: HealAble;
	repair: RepairAble;
};

type TaskType = keyof TMap;

class Task<T extends TaskType = TaskType> extends TaskBase {
	constructor(
		public readonly type: T,
		public readonly target: Id<TMap[T]>,
		needed: number,
		undone: number = needed
	) { super(needed, undone); }
}

class Manager extends ManagerBase<Task> {
	constructor(tasks = Memory.tasks.tower) {
		super(tasks);
	}
	override add_task<T extends TaskType>(
		type: T,
		target: { id: Id<TMap[T]> },
		needed: number = 1
	): number {
		return super._add_task(new Task(type, target.id, needed));
	}
	override assign_task(towers: StructureTower[]): void {
		super.assign_task(towers);
	}
}

export { TaskType, Task, Manager };
