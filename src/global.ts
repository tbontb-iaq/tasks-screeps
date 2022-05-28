import * as Tasks from "lib/tasks";
import { MappingArray, remove_if } from "lib/utils";

export function mountMethod() {
    global.o = global.o || ((id) => Game.getObjectById(id));
    global.oa =
        global.oa ||
        ((id_arr) =>
            new MappingArray(
                id_arr,
                (id) => o(id),
                (obj) => obj!.id
            ));
}

function clearMemory() {
    remove_if(Memory.creeps, (name) => !Game.creeps[name]);
    // remove_if(Memory.powerCreeps, name => !Game.powerCreeps[name]);
    remove_if(Memory.flags, (name) => !Game.flags[name]);
    // remove_if(Memory.rooms, name => !Game.rooms[name]);
    // remove_if(Memory.spawns, name => !Game.spawns[name]);

    // remove_if(Memory.sources, (id) => !o(id));
    remove_if(Memory.structures, (id) => !o(id));
    // remove_if(Memory.construction_sites, (id) => !o(id));

    for (let id_arr of Object.values(Memory.s))
        remove_if(id_arr as Id<_HasId>[], (id) => !o(id));
    for (let key in Memory.roles)
        remove_if(Memory.roles[key as keyof typeof Memory.roles], (id) => !o(id));
}

function updateGlobal() {
    global.g = {
        r: {
            sources: oa(Memory.r.sources_id),
            minerals: oa(Memory.r.minerals_id),
            deposits: oa(Memory.r.deposits_id),
        },

        s: {
            extensions: oa(Memory.s.extensions_id),
            roads: oa(Memory.s.roads_id),
            walls: oa(Memory.s.walls_id),
            ramparts: oa(Memory.s.ramparts_id),
            towers: oa(Memory.s.towers_id),
            containers: oa(Memory.s.containers_id),
            storage: oa(Memory.s.storage_id),
            links: oa(Memory.s.links_id),
            extractor: oa(Memory.s.extractor_id),
            labs: oa(Memory.s.labs_id),
            terminal: oa(Memory.s.terminal_id),
            factory: oa(Memory.s.factory_id),
            spawns: oa(Memory.s.spawns_id),
            observer: oa(Memory.s.observer_id),
            power_spawn: oa(Memory.s.power_spawn_id),
            nuker: oa(Memory.s.nuker_id),

            controller: oa(Memory.s.controller_id),
            invader_core: oa(Memory.s.invader_core_id),
            keeper_lair: oa(Memory.s.keeper_lair_id),
            power_bank: oa(Memory.s.power_bank_id),
            portal: oa(Memory.s.portal_id),
        },

        center: o(Memory.s.storage_id[0]!)!,
    };

    global.r = {
        worker: oa(Memory.roles.worker),
        carrier: oa(Memory.roles.carrier),
        attacker: [],
        r_attacker: [],
        healer: [],
        claimer: [],
    };

    global.t = {
        work: new Tasks.Work.Manager(),
        spawn: new Tasks.Spawn.Manager(),
        carry: new Tasks.Carry.Manager(),
        tower: new Tasks.Tower.Manager(),
    };
}

export const loop = () => {
    clearMemory();
    updateGlobal();
};
