import { Role } from "types/roles";

const Cost_Map: Record<BodyPartConstant, number> = {
	move: 50,
	work: 100,
	carry: 50,
	attack: 80,
	ranged_attack: 150,
	heal: 250,
	claim: 600,
	tough: 10,
};

const Body_Map: Record<Role, BodyPartConstant[]> = {
	worker: [WORK, CARRY, MOVE, MOVE],
	carrier: [CARRY, MOVE],
	attacker: [ATTACK, MOVE],
	r_attacker: [RANGED_ATTACK, MOVE],
	healer: [HEAL, MOVE],
	claimer: [CLAIM, MOVE],
};

const MaxTimes_Map: Partial<Record<Role, number>> = {
	carrier: 8,
};

interface BodyObj {
	body: BodyPartConstant[];
	cost: number;
	max_times: number;
}

function make_body(role: Role): BodyObj {
	return {
		body: Body_Map[role],
		cost: Body_Map[role].reduce((sum, part) => sum + Cost_Map[part], 0),
		max_times: MaxTimes_Map[role] ?? Infinity,
	};
}

const BodyObjMap: Record<Role, BodyObj> = Object.values(Role)
	.map((role) => ({ [role]: make_body(role) } as { [role in Role]: BodyObj }))
	.reduce((pre, cur) => ({ ...pre, ...cur }));

export { BodyObjMap };
