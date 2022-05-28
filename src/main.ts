const init: typeof import("./init") = require("./init");
const run_once: typeof import("./run_once") = require("./run_once");
const global: typeof import("./global") = require("./global");
const loop_m: typeof import("./loop") = require("./loop");

export const loop = () => {
    // init.deepInit();
    console.log(
        `<span style="padding: 0 100px; background-color: gray; border-radius: 2px">${Game.time}</span>`
    );
    global.mountMethod();

    if (Memory.initd) {
        run_once.runOnce();

        global.loop();

        loop_m.loop();
    } else {
        init.roomInit();
    }
};
