
export const DEVICE_START = 'DEVICE_START';
export const DEVICE_SUCCESS = 'DEVICE_SUCCESS';
export const DEVICE_FAIL = 'DEVICE_FAIL';


export const DEVICEUPDATE_START = 'DEVICEUPDATE_START';
export const DEVICEUPDATE_SUCCESS = 'DEVICEUPDATE_SUCCESS';

// ================ action creators ================

export function deviceSt(dce) {
	return { type: DEVICE_START, dce }
}

export function deviceupdateSt(dte) {
	return { type: DEVICEUPDATE_START, dte }
}
