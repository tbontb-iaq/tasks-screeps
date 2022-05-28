let func: Function | undefined = () => {
	// Memory.tasks.spawn = { record: {}, id_arr: [] };
	// Memory.tasks.carry = { record: {}, id_arr: [] };
	// Memory.tasks.work = { record: {}, id_arr: [] };
	// Memory.tasks.tower = { record: {}, id_arr: [] };

	// Memory.roles.worker = Object.values(Game.creeps)
	// 	.filter((c) => c.memory.role === "worker")
	// 	.map((c) => c.id);

	// Memory.roles.worker = [];
	// Memory.roles.carrier = [];
};

export const runOnce = () => {
	if (func) {
		func();
		console.log("run once ran!");
		func = undefined;
	}
};
