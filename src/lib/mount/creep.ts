const MoveToOpts: Partial<Record<keyof Creep, MoveToOpts>> = {
	harvest: { visualizePathStyle: { stroke: "#f8e181" } },
	transfer: { visualizePathStyle: { stroke: "#fff" } },
	upgradeController: { visualizePathStyle: { stroke: "#b71c1c" } },
	withdraw: { visualizePathStyle: { stroke: "#fff" } },
	build: { visualizePathStyle: { stroke: "#4a594b" } },
};

function mountCreep() {
	if (Creep.prototype._mounted) return;
	else Creep.prototype._mounted = true;

	Creep.prototype._harvest = Creep.prototype.harvest;
	Creep.prototype.harvest = function (target) {
		const result = this._harvest(target);
		if (result === ERR_NOT_IN_RANGE)
			this.moveTo(target, MoveToOpts.harvest);
		return result;
	};

	Creep.prototype._transfer = Creep.prototype.transfer;
	Creep.prototype.transfer = function (target, resourceType, amount?) {
		const result = this._transfer(target, resourceType, amount);
		if (result === ERR_NOT_IN_RANGE)
			this.moveTo(target, MoveToOpts.transfer);
		return result;
	};

	Creep.prototype._upgradeController = Creep.prototype.upgradeController;
	Creep.prototype.upgradeController = function (target?) {
		target = target || this.room.controller;
		const result = this._upgradeController(target);
		if (result === ERR_NOT_IN_RANGE)
			this.moveTo(target, MoveToOpts.upgradeController);
		return result;
	};

	Creep.prototype._withdraw = Creep.prototype.withdraw;
	Creep.prototype.withdraw = function (target, resourceType, amount) {
		const result = this._withdraw(target, resourceType, amount);
		if (result === ERR_NOT_IN_RANGE)
			this.moveTo(target, MoveToOpts.withdraw);
		return result;
	};

	Creep.prototype._build = Creep.prototype.build;
	Creep.prototype.build = function (target) {
		const result = this._build(target);
		if (result === ERR_NOT_IN_RANGE)
			this.moveTo(target, MoveToOpts.build);
		return result;
	};
}

export { mountCreep };
