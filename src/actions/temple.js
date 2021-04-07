export const TEMPLE_START = 'TEMPLE_START';
export const TEMPLE_SUCCESS = 'TEMPLE_SUCCESS';
export const TEMPLE_FAIL = 'TEMPLE_FAIL';

export const TEMPLEUPDATE_START = 'TEMPLEUPDATE_START';
export const TEMPLEUPDATE_SUCCESS = 'TEMPLEUPDATE_SUCCESS';

// ================ action creators ================

export function templeSt(tle) {
	return { type: TEMPLE_START, tle }
}

export function templeupdateSt(ute) {
	return { type: TEMPLEUPDATE_START, ute }
}
