
export const DETAIL_START = 'DETAIL_START';
export const DETAIL_SUCCESS = 'DETAIL_SUCCESS';


export const DETAILEXPORT_START = 'DETAILEXPORT_START';
export const DETAILEXPORT_SUCCESS = 'DETAILEXPORT_SUCCESS';
// ================ action creators ================

export function detailSt(detail) {
	return { type: DETAIL_START, detail }
}

export function detailexportSt(drt) {
	return { type: DETAILEXPORT_START, drt }
}
