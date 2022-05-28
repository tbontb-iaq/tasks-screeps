module.exports = function (grunt) {
	const config = require("./.screeps.json");
	const email = grunt.option("email") || config.email;
	const token = grunt.option("token") || config.token;
	const branch = grunt.option("branch") || config.branch;
	const ptr = grunt.option("ptr") ? true : config.ptr;

	grunt.loadNpmTasks("grunt-screeps");
	grunt.initConfig({
		screeps: {
			options: {
				email,
				token,
				branch,
				ptr,
				// server: 'sim'
			},
			dist: {
				src: ["build/*.js"],
			},
		},
	});
	grunt.registerTask("default", ["screeps"]);
};
