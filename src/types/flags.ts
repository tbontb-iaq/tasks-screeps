import { Role } from "./roles";

export const Meeting_Point: Record<Role, string> = {
	worker: "idle_worker",
	carrier: "idle_carrier",
	attacker: "idle_attacker",
	r_attacker: "idle_r_attacker",
	healer: "idle_healer",
	claimer: "idle_claimer",
}