#!/usr/bin/env node
import { main } from "./main";

main().catch(err => {
	console.error(err.stack);
	process.exit(1);
});
