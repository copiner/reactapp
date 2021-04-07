export const CHANNEL_START = 'CHANNEL_START';
export const CHANNEL_SUCCESS = 'CHANNEL_SUCCESS';
export const CHANNEL_FAIL = 'CHANNEL_FAIL';

export const CHANNELADD_START = 'CHANNELADD_START';
export const CHANNELADD_SUCCESS = 'CHANNELADD_SUCCESS';

export const CHANNELUPDATE_START = 'CHANNELUPDATE_START';
export const CHANNELUPDATE_SUCCESS = 'CHANNELUPDATE_SUCCESS';

// ================ action creators ================

export function channelSt(channel) {
	return { type: CHANNEL_START, channel }
}

export function channeladdSt(cdd) {
	return { type: CHANNELADD_START, cdd }
}

export function channelupdateSt(cte) {
	return { type: CHANNELUPDATE_START, cte }
}
