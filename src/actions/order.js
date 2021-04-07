export const ORDER_START = 'ORDER_START';
export const ORDER_SUCCESS = 'ORDER_SUCCESS';
export const ORDER_FAIL = 'ORDER_FAIL';


export const ORDEREXPORT_START = 'ORDEREXPORT_START';
export const ORDEREXPORT_SUCCESS = 'ORDEREXPORT_SUCCESS';
// ================ action creators ================

export function orderSt(order) {
	return { type: ORDER_START, order }
}


export function orderexportSt(ort) {
	return { type: ORDEREXPORT_START, ort }
}
