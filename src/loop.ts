import { mountAll } from "lib/mount";
import * as executor from "lib/executor";
import * as controller from "lib/controller";
import * as tools from "lib/tools";

export const loop = () => {
    mountAll();

    controller.others.pixel.loop();
    controller.harvest.source.post_tasks({ needed_min: 3 });
    if (g.center.store.getUsedCapacity(RESOURCE_ENERGY) > 50000)
        controller.upgrade.controller.post_tasks({ needed: 4 });
    if (g.center.store.getUsedCapacity(RESOURCE_ENERGY) > 75000)
        controller.build.con_site.post_tasks({
            needed: 2,
            sites: Object.values(Game.constructionSites).slice(0, 2),
        });
    controller.carry.tower.post_tasks();
    controller.carry.spawn.post_tasks();
    controller.carry.extension.post_tasks();


    executor.structure.tower.loop();
    executor.creep.carrier.loop();
    executor.creep.worker.loop();

    controller.spawn.spawn.post_tasks({ spawn_worker: true, spawn_carrier: true })
    executor.structure.spawn.loop();
    tools.loop();
};
