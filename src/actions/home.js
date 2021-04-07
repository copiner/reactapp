
// ================ action types ================

export const INIT_START = 'INIT_START';

export const INFO_START = 'INFO_START';
export const INFO_SUCCESS = 'INFO_SUCCESS';
export const INFO_FAIL = 'INFO_FAIL';


export const RECORD_START = 'RECORD_START';
export const RECORD_SUCCESS = 'RECORD_SUCCESS';
export const RECORD_FAIL = 'RECORD_FAIL';

export const ONECARD_START = 'ONECARD_START';
export const ONECARD_SUCCESS = 'ONECARD_SUCCESS';

export const OCCARD_START = 'OCCARD_START';
export const OCCARD_SUCCESS = 'OCCARD_SUCCESS';

export const UPDATEINFO_START = 'UPDATEINFO_START';
export const UPDATEINFO_SUCCESS = 'UPDATEINFO_SUCCESS';
export const UPDATEINFO_RESET = 'UPDATEINFO_RESET';


// ================ action creators ================

export function initSt() {
	return { type: INIT_START }
}

export function infoSt(info) {
	return { type: INFO_START, info }
}


export function onecardSt(ord) {
	return { type: ONECARD_START, ord }
}

export function occardSt(ocrd) {
	return { type: OCCARD_START, ocrd }
}

export function updateinfoSt(ufo) {//信息修改
	return { type: UPDATEINFO_START, ufo }
}

export function recordSt(record) {
	return { type: RECORD_START, record }
}
