import { Work } from "lib/tasks";
import { harvestable } from "./checker";

type TaskType = Work.TaskType;
type Task<T extends TaskType> = Work.Task<T>;
enum ActionReturn {
	TO_OK = "TO_OK",
	TO_BUSY = "TO_BUSY",
	FROM_BUSY = "FROM_BUSY",
}

interface Action<T extends TaskType> {
	from(creep: Creep, task: Task<T>): ActionReturn;
	to(creep: Creep, task: Task<T>): ActionReturn;
}

// https://stackoverflow.com/questions/72385709
const defineAction = <T extends TaskType, U extends Action<T>>(obj: U): Action<T> => obj;

const HarvestAction: Action<"harvest"> = defineAction({
	harvestable(target: HarvestAble | null): boolean { return false; },
	from(creep, task) {
		const target = o(task.target);
		return creep.store.getFreeCapacity(task.res) && harvestable(target)
			? (creep.harvest(target!), ActionReturn.FROM_BUSY)
			: ((creep.memory.from_done = true), this.to(creep, task));
	},
	to(creep, task) {
		return creep.store.getUsedCapacity(task.res)
			? (creep.transfer(g.center, task.res), ActionReturn.TO_BUSY)
			: ActionReturn.TO_OK;
	},
});

const UpgradeAction: Action<"upgrade"> = {
	from(creep, task) {
		return creep.store.getFreeCapacity(task.res) &&
			g.center.store.getUsedCapacity(task.res) >=
			creep.store.getFreeCapacity(task.res)
			? (creep.withdraw(g.center, task.res), ActionReturn.FROM_BUSY)
			: ((creep.memory.from_done = true), this.to(creep, task));
	},
	to(creep, task) {
		return creep.store.getUsedCapacity(task.res)
			? (creep.upgradeController(o(task.target)!), ActionReturn.TO_BUSY)
			: ActionReturn.TO_OK;
	},
};

const BuildAction: Action<"build"> = {
	from(creep, task) {
		return creep.store.getFreeCapacity(task.res) &&
			g.center.store.getUsedCapacity(task.res) >=
			creep.store.getFreeCapacity(task.res)
			? (creep.withdraw(g.center, task.res), ActionReturn.FROM_BUSY)
			: ((creep.memory.from_done = true), this.to(creep, task));
	},
	to(creep, task) {
		return creep.store.getUsedCapacity(task.res) && o(task.target)
			? (creep.build(o(task.target)!), ActionReturn.FROM_BUSY)
			: ActionReturn.TO_OK;
	},
};

const RepairAction: Action<"repair"> = {
	from(creep, task) {
		throw new Error("Method not implemented.");
	},
	to(creep, task) {
		throw new Error("Method not implemented.");
	},
};

const DismantleAction: Action<"dismantle"> = {
	from(creep, task) {
		throw new Error("Method not implemented.");
	},
	to(creep, task) {
		throw new Error("Method not implemented.");
	},
};

const ActionMap: {
	[key in TaskType]: Action<key>;
} = {
	harvest: HarvestAction,
	upgrade: UpgradeAction,
	build: BuildAction,
	repair: RepairAction,
	dismantle: DismantleAction,
};

// https://stackoverflow.com/questions/72321759
function ExecuteTask<T extends TaskType>(
	creep: Creep,
	task: Task<T>
): ActionReturn {
	return ActionMap[task.type][creep.memory.from_done ? "to" : "from"](
		creep,
		task
	);
}

export { ExecuteTask, ActionReturn as ExecuteReturn };
