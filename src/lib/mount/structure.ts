function mountStructure() {
	if (Structure.prototype._mounted) return;
	else Structure.prototype._mounted = true;

	Object.defineProperty(Structure.prototype, "memory", {
		get(this: Structure): StructureMemory {
			return Memory.structures[this.id]
				??= { cost: {}, p_task: {} };
		},
	});
}

export { mountStructure };
