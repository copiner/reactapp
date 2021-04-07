export const KIND_START = 'KIND_START';
export const KIND_SUCCESS = 'KIND_SUCCESS';
export const KIND_FAIL = 'KIND_FAIL';

export const KINDUPDATE_START = 'KINDUPDATE_START';
export const KINDUPDATE_SUCCESS = 'KINDUPDATE_SUCCESS';
// ================ action creators ================

export function kindSt(kind) {
	return { type: KIND_START, kind }
}

export function kindupdateSt(kte) {
	return { type: KINDUPDATE_START, kte }
}
