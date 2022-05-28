function count_body(creep: Creep): Record<BodyPartConstant, number> {
	return creep.body.reduce((count, body_part) => (++count[body_part.type], count), {
		move: 0,
		work: 0,
		carry: 0,
		attack: 0,
		ranged_attack: 0,
		heal: 0,
		claim: 0,
		tough: 0,
	});
}

export { count_body }