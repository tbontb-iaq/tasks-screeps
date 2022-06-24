import { mountAll } from "lib/mount";
import * as executor from "lib/executors";
import * as poster from "lib/posters";
import * as tools from "lib/tools";

export const loop = () => {
    mountAll();

    poster.others.pixel.loop();
    poster.harvest.source.post_tasks({ needed_min: 3 });
    const center_energy = g.center.store.getUsedCapacity(RESOURCE_ENERGY);

    if (center_energy > 50000)
        poster.upgrade.controller.post_tasks({
            needed: center_energy > 100000 ? 4 : 1,
        });
    if (center_energy > 75000)
        poster.build.con_site.post_tasks({
            needed: 2,
            sites: Object.values(Game.constructionSites).slice(0, 2),
        });
    poster.carry.tower.post_tasks();
    poster.carry.spawn.post_tasks();
    poster.carry.extension.post_tasks();

    executor.structure.tower.loop();
    executor.creep.carrier.loop();
    executor.creep.worker.loop();

    poster.spawn.spawn.post_tasks({
        spawn_worker: true,
        spawn_carrier: true,
    });
    executor.structure.spawn.loop();
    tools.loop({ stats_refresh_rate: 3 });
};
