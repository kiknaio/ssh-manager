#!/usr/bin/env node

const { exec } = require('child_process');
const argv = require('minimist')(process.argv.slice(2));

const listSshKeys = () => exec(
  `for key in ~/.ssh/id_*; do ssh-keygen -l -f "$\{key}"; done | uniq`,
  (err, stdout, stderr) => {
    if (err) {
      console.log(err);
      return;
    } else if (stderr) {
      console.log(stderr);
      return;
    }

    console.log(`stdout: ${stdout}`);
  });

const generateNewSsh = (email, name='id_ed25519') => exec(
  `ssh-keygen -o -a 100 -t ed25519 -f ~/.ssh/${name} -C "${email}"`
  );


if (argv.l) {
  listSshKeys();
} else if (argv.g) {
  if (argv.email && argv.email.length > 0) {
    generateNewSsh(argv.email, argv.filename);
  } else {
    console.log('Please provide email address')
  }
} else {
  console.log(`
  -l - List all existing ssh keys 🔑
  -g - Generate new Ed25519 ssh key
  `);
}