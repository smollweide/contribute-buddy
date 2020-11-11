#!/usr/bin/env node
'use strict';

const { runCommander } = require('./commander');
const runInit = require('./runInit');
const runCheck = require('./runCheck');

runCommander(
	() => runInit(),
	() => runCheck()
);
