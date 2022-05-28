import { get_mineable_num } from "lib/utils";

function mountSource() {
	if (Source.prototype._mounted) return;
	else Source.prototype._mounted = true;

	Object.defineProperty(Source.prototype, "memory", {
		get(this: Source): SourceMemory {
			return (Memory.sources[this.id] ??= {
				cost: {},
				p_task: {},
				mineable: get_mineable_num(this),
			});
		},
	});
}

export { mountSource };
