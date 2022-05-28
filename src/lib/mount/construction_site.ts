function mountConstructionSite() {
	if (ConstructionSite.prototype._mounted) return;
	else ConstructionSite.prototype._mounted = true;

	Object.defineProperty(ConstructionSite.prototype, "memory", {
		get(this: ConstructionSite): ConstructionSiteMemory {
			return (Memory.construction_sites[this.id] ??= {
				pos: { x: this.pos.x, y: this.pos.y },
				type: this.structureType,
				p_task: {},
			});
		},
	});
}

export { mountConstructionSite };
