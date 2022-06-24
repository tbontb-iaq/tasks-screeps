type TaskRecord<T extends import("lib/tasks/base").TaskBase>
	= Record<number, T>;

type MemoryTask<T extends import("lib/tasks/base").TaskBase> = {
	record: TaskRecord<T>;
	id_arr: number[];
};
