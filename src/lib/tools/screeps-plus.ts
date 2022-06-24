export default function (rate: number) {
	if (Game.time % rate === 0) {
		Memory.stats = {
			tick: Game.time,
			gcl_progress: Game.gcl.progress,
			gcl_percent: Game.gcl.progress / Game.gcl.progressTotal,
			gpl_progress: Game.gpl.progress,
			gpl_percent: Game.gpl.progress / Game.gpl.progressTotal,
			cpu_used: Game.cpu.getUsed(),
			bucket: Game.cpu.bucket,
			room: {},
		};
		const room = g.center.room;
		Memory.stats.room[room.name] = {
			store: {
				energy: g.center.store.getUsedCapacity(RESOURCE_ENERGY),
			},
			rcl_progress: room.controller!.progress,
			rcl_percent: room.controller!.progress / room.controller!.progressTotal,
		};
	}
}
