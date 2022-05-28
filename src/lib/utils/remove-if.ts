function remove_if<T>(arr: T[], judge: (value: T) => boolean): void;
function remove_if<T>(obj: T, judge: (key: keyof T) => boolean): void;
function remove_if<T>(arg1: T[] | T, judge: (value: T | keyof T) => boolean) {
	if (Array.isArray(arg1)) {
		for (let i = arg1.length - 1; i >= 0; --i)
			if (judge(arg1[i]!)) arg1.splice(i, 1);
	}
	// for (let i = 0; i < arg1.length;)
	// 	judge(arg1[i]!) ? arg1.splice(i, 1) : ++i;
	else for (let key in arg1) if (judge(key)) delete arg1[key];
}

export { remove_if };
