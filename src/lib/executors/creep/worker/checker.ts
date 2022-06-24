function harvestable(target: HarvestAble | null): boolean {
	if (target instanceof Source) {
		if (target.energy === 0) return false;
	} else if (target instanceof Mineral) {
		if (target.mineralAmount === 0) return false;
	} else if (target instanceof Deposit) {
		if (target.cooldown !== 0) return false;
	} else return false;
	return true;
}

export { harvestable }