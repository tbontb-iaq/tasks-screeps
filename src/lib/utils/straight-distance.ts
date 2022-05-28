type HasPosition = { pos: RoomPosition };

function get_straight_dis(obj1: HasPosition, obj2: HasPosition): number {
	return Math.max(
		Math.abs(obj1.pos.x - obj2.pos.x),
		Math.abs(obj1.pos.y - obj2.pos.y)
	);
}
