import { free_creeps } from "lib/utils";
import { Creep_Num } from "types/creep_num";
import { Role } from "types/roles";

type SpawnOptions = Record<`spawn_${Role}`, boolean>;
const opt_default = false;

function post_tasks({
	spawn_worker = opt_default,
	spawn_carrier = opt_default,
	spawn_attacker = opt_default,
	spawn_claimer = opt_default,
	spawn_healer = opt_default,
	spawn_r_attacker = opt_default,
}: Partial<SpawnOptions> = {}): void {
	const spawn_num = t.spawn.spawning_num;
	if (
		spawn_worker &&
		spawn_num.worker + free_creeps(Role.worker) < t.work.total_needed &&
		spawn_num.worker + r.worker.length < Creep_Num.worker
	)
		t.spawn.add_task(Role.worker);

	if (
		spawn_carrier &&
		spawn_num.carrier + free_creeps(Role.carrier) < t.carry.total_needed &&
		spawn_num.carrier + r.carrier.length < Creep_Num.carrier
	)
		t.spawn.add_task(Role.carrier);
}

export { post_tasks };
