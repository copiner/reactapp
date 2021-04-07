
// ================ action types ================

export const ALLOW_START = 'ALLOW_START';
export const ALLOW_SUCCESS = 'ALLOW_SUCCESS';
export const ALLOW_FAIL = 'ALLOW_FAIL';

export const ALLOWUPDATE_START = 'ALLOWUPDATE_START';
export const ALLOWUPDATE_SUCCESS = 'ALLOWUPDATE_SUCCESS';
export const ALLOWUPDATE_RESET = 'ALLOWUPDATE_RESET';
// ================ action creators ================

export function allowSt(alw) {
	return { type: ALLOW_START, alw }
}

export function allowupdateSt(ate) {
	return { type: ALLOWUPDATE_START, ate }
}
