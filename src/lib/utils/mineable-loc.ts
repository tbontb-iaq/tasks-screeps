function get_mineable_num(source: Source) {
	const x = source.pos.x,
		y = source.pos.y,
		around = [
			{ x: x - 1, y: y - 1 },
			{ x: x - 1, y: y },
			{ x: x - 1, y: y + 1 },
			{ x: x, y: y - 1 },
			{ x: x, y: y + 1 },
			{ x: x + 1, y: y - 1 },
			{ x: x + 1, y: y },
			{ x: x + 1, y: y + 1 },
		];
	return around.reduce(
		(sum, coord) =>
			sum + (coord.x >= 0 && coord.x < 50 && coord.y >= 0 && coord.y < 50
				? source.room.getTerrain().get(coord.x, coord.y)
					!== TERRAIN_MASK_WALL ? 1 : 0
				: 0),
		0
	);
}

export { get_mineable_num };
