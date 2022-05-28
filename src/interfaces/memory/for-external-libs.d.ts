interface Memory {
	// 用于 screeps-multimeter 的 watch 插件
	watch: {
		expressions: {};
		values: {
			[key: string]: any;
		};
	};
}
