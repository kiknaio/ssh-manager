#!/usr/bin/env node

const { exec } = require('child_process');
const argv = require('minimist')(process.argv.slice(2));

if (argv.list) {
	listSshKeys();
} else {
	console.log(`
	list - List all existing ssh keys 🔑
	generate - Generate new Ed25519 ssh key
	`);
}


const listSshKeys = () => {
	exec(`for key in ~/.ssh/id_*; do ssh-keygen -l -f "$\{key}"; done | uniq`, (err, stdout, stderr) => {
		if (err) {
			console.log(err);
			return;
		} else if (stderr) {
			console.log(stderr);
			return;
		}

		console.log(`stdout: ${stdout}`);
	})

	console.log(argv);
}