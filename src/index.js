#!/usr/bin/env node
'use strict';

const { runCommander } = require('./commander');
const runCheck = require('./runCheck');

runCommander(
	() => {},
	() => {
		runCheck();
	}
);
