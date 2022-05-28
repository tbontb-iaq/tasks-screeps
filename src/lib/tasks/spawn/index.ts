import { Role } from "types/roles";
import { ManagerBase, TaskBase } from "../base";

class Task extends TaskBase {
	constructor(
		public readonly role: Role,
		needed: number,
		undone: number = needed
	) {
		super(needed, undone);
	}
}

const Priority_Map: Record<Role, number> = {
	carrier: 2,
	worker: 1,
	attacker: 1,
	r_attacker: 1,
	healer: 1,
	claimer: 1,
};

function get_priority(role: Role): number {
	return r[role].length === 0 ? Infinity : Priority_Map[role];
}

class Manager extends ManagerBase<Task> {
	constructor(tasks = Memory.tasks.spawn) {
		super(tasks);
	}
	override compare(id1: number, id2: number): number {
		return (
			get_priority(this.task(id2)!.role) - get_priority(this.task(id1)!.role)
		);
	}
	add_task(role: Role) {
		return super._add_task(new Task(role, 1));
	}
	get spawning_num(): Record<Role, number> {
		return Object.values(this.id_arr).reduce(
			(num: typeof this.spawning_num, id) => (++num[this.task(id)!.role], num),
			{
				worker: 0,
				carrier: 0,
				attacker: 0,
				r_attacker: 0,
				healer: 0,
				claimer: 0,
			}
		);
	}
	override assign_task(spawns: StructureSpawn[]) {
		return super.assign_task(spawns);
	}
}

export { Task, Manager };
