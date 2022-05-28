abstract class TaskBase {
	constructor(public needed: number, public undone: number = needed) { }
}

interface AssignAble {
	memory: ETaskMemory;
}

abstract class ManagerBase<Task extends TaskBase> {
	private record: TaskRecord<Task>;
	protected id_arr: number[];
	constructor(memory_task: MemoryTask<Task>) {
		this.record = memory_task.record;
		this.id_arr = memory_task.id_arr;
	}
	private static ID_MAX = 1000000000;
	private get new_id(): number {
		let task_id: number;
		do task_id = Math.floor(Math.random() * ManagerBase.ID_MAX);
		while (task_id in this.record || !task_id);
		return task_id;
	}
	compare(id1: number, id2: number) {
		return -1;
	}
	private insert_id(id: number) {
		var start = 0,
			end = this.id_arr.length - 1,
			mid;
		while (start <= end) {
			mid = Math.floor((start + end) / 2);
			const cmp_result = this.compare(this.id_arr[mid]!, id);
			cmp_result < 0 ? (start = mid + 1) : (end = mid - 1);
		}
		this.id_arr.splice(start, 0, id);
	}
	protected _add_task(task: Task): number {
		let new_id = this.new_id;
		task.needed = Math.floor(task.needed);
		task.undone = Math.floor(task.undone);
		this.record[new_id] = task;
		this.insert_id(new_id);
		return new_id;
	}
	abstract add_task(...args: any): number;
	get total_needed(): number {
		return Object.values(this.record).reduce(
			(sum, task) => sum + task.needed,
			0
		);
	}
	get total_undone(): number {
		return Object.values(this.record).reduce(
			(sum, task) => sum + task.undone,
			0
		);
	}
	task(id?: number): Task | undefined {
		return this.record[id ?? 0];
	}
	assign_task(obj_array: AssignAble[]) {
		let obj_index = 0;
		for (let i = 0; i < this.id_arr.length;) {
			const id = this.id_arr[i],
				task = this.record[id ?? 0];
			if (!task || task.undone <= 0) {
				delete this.record[id!];
				this.id_arr.splice(i, 1);
				continue;
			} else
				while (task.needed && obj_index < obj_array.length) {
					while (
						obj_index < obj_array.length &&
						(obj_array[obj_index]?.memory.e_task_id ?? 0) in this.record
					)
						++obj_index;
					if (obj_index < obj_array.length) {
						obj_array[obj_index]!.memory.e_task_id = id;
						--task.needed;
					}
				}
			++i;
		}
	}
}

export { TaskBase, ManagerBase };
