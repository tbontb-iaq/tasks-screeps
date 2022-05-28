import _ from "lodash";

// https://rollupjs.org/guide/en/#avoiding-eval
const _eval = eval;

export default function () {
	_.each(Memory.watch.expressions, (expr, name) => {
		if (typeof expr !== "string") return;
		let result;
		try {
			result = _eval(expr);
		} catch (ex: any) {
			result = "Error: " + ex.message;
		}
		if (name == "console") {
			if (typeof result !== "undefined") console.log(result);
		} else {
			Memory.watch.values![name] =
				typeof result !== "undefined" ? result.toString() : result;
		}
	});
};
