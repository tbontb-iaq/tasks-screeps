import { Tower } from "lib/tasks";

type TaskType = Tower.TaskType;
type Task<T extends TaskType> = Tower.Task<T>;
enum ActionReturn {
	OK = "OK",
	BUSY = "BUSY",
}

type Action<T extends TaskType> = (
	tower: StructureTower,
	task: Task<T>
) => ActionReturn;

const AttackAction: Action<"attack"> = (tower, task) => {
	const target = o(task.target);
	return target ? (tower.attack(target), ActionReturn.BUSY) : ActionReturn.OK;
};

const HealAction: Action<"heal"> = () => ActionReturn.OK;

const RepairAction: Action<"repair"> = () => ActionReturn.OK;

const ActionMap: { [key in TaskType]: Action<key> } = {
	attack: AttackAction,
	heal: HealAction,
	repair: RepairAction,
};

function ExecuteTask<T extends TaskType>(
	tower: StructureTower,
	task: Task<T>
): ActionReturn {
	return ActionMap[task.type](tower, task);
}

export { ExecuteTask, ActionReturn as ExecuteReturn }