'use strict';

/**
 * @param {Object} old - the old value
 * @param {Object} di - dependency injection
 * @returns {Object} config - returns the contributebuddy config
 **/
function getCompleteObject(old) {
	return {
		completed: true,
		date: new Date().toString(),
		oldValue: JSON.stringify(old),
	};
}

module.exports = getCompleteObject;
