import typescript from "@rollup/plugin-typescript";
import { defineConfig } from "rollup";

function buildOpt(file_name) {
    return defineConfig({
        input: `src/${file_name}.ts`,
        output: {
            file: `build/${file_name}.js`,
            // dir: "build",
            format: "cjs",
            // preserveModules: true,
            sourcemap: true,
        },
        external: ["lodash"],
        plugins: [
            // incremental(),
            // local_resolve(),
            // node_resolve(),
            typescript({
                cacheDir: "dist",
                outputToFilesystem: true,
            }),
            // incremental.fixSNE(),
        ],
    });
}
const entries = ["main", "run_once", "init", "loop", "global"];
export default entries.map((entry) => buildOpt(entry));
