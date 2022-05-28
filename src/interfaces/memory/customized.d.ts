interface CostMemory {
	cost: { [id: Id<Structure>]: number };
}
interface TaskMemory extends ETaskMemory, PTaskMemory { }

interface ETaskMemory {
	e_task_id?: number | undefined;
	e_task_arr?: number[] | undefined;
}
interface PTaskMemory {
	p_task: { [key in keyof GlobalTasks]?: number | undefined };
}
