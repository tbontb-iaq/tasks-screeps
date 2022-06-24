import watcher from "./watch-client";
import screeps_plus from "./screeps-plus";

export function loop({ stats_refresh_rate = 15 } = {}) {
	watcher();
	screeps_plus(stats_refresh_rate);
}