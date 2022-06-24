interface Memory {
	// 用于 screeps-multimeter 的 watch 插件
	watch: {
		expressions: {};
		values: {
			[key: string]: any;
		};
	};
	// https://www.jianshu.com/p/de74baf6fb48
	// 用于 screepsPlus 统计信息
	stats: {
		tick: number;
		gcl_progress: number;
		gcl_percent: number;
		gpl_progress: number;
		gpl_percent: number;
		cpu_used: number;
		bucket: number;
		room: {
			[name: string]: {
				store: {
					energy: number;
				};
				rcl_progress: number;
				rcl_percent: number;
			};
		};
	};
}
