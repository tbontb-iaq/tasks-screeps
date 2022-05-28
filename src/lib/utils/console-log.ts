function clog(message: string, log_level: number = 1) {
	if (log_level > Memory.log_level) console.log(message);
}

export { clog };
