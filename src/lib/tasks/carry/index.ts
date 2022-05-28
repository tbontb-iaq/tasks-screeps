import { ManagerBase, TaskBase } from "../base";

class Task extends TaskBase {
	constructor(
		readonly from: Id<Structure>,
		readonly to: Id<AnyStoreStructure>,
		readonly res: ResourceConstant,
		readonly amount: number,
		needed: number,
		undone: number = needed
	) {
		super(needed, undone);
	}
}

type AddTaskPara = {
	from: AnyStoreStructure;
	res: ResourceConstant;
	amount: number;
	needed: number;
};

const Carry_Max = 50;

const Priority_Map: Partial<Record<StructureConstant, number>> = {
	spawn: 3,
	extension: 2,
	tower: 4,
};

class Manager extends ManagerBase<Task> {
	constructor(tasks = Memory.tasks.carry) {
		super(tasks);
	}
	override compare(id1: number, id2: number): number {
		return (
			(Priority_Map[o(this.task(id2)!.to)!.structureType] ?? 0) -
			(Priority_Map[o(this.task(id1)!.to)!.structureType] ?? 0)
		);
	}
	override add_task(
		to: AnyStoreStructure,
		{
			from = g.center,
			res = RESOURCE_ENERGY,
			amount = Math.min(Carry_Max, to.store.getFreeCapacity(res)!),
			needed = 1,
		}: Partial<AddTaskPara> = {}
	): number {
		return super._add_task(new Task(from.id, to.id, res, amount, needed));
	}
	// TODO 重写分配方法，允许一个 carrier 执行多个任务
	// TODO 使用 邮差问题 中的算法，最优化 carrier 的路径
	override assign_task(carriers: Creep[]): void {
		super.assign_task(carriers);
	}
}

export { Task, Manager };
