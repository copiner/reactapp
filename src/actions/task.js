export const TASK_START = 'TASK_START';
export const TASK_SUCCESS = 'TASK_SUCCESS';
export const TASK_FAIL = 'TASK_FAIL';


export const TASKUPLOAD_START = 'TASKUPLOAD_START';
export const TASKUPLOAD_SUCCESS = 'TASKUPLOAD_SUCCESS';

export const TASKSUBMIT_START = 'TASKSUBMIT_START';
export const TASKSUBMIT_SUCCESS = 'TASKSUBMIT_SUCCESS';

export const TASKDETAIL_START = 'TASKDETAIL_START';
export const TASKDETAIL_SUCCESS = 'TASKDETAIL_SUCCESS';

export const TASKOPEN_START = 'TASKOPEN_START';
export const TASKOPEN_SUCCESS = 'TASKOPEN_SUCCESS';

export const TASKEXPORT_START = 'TASKEXPORT_START';
export const TASKEXPORT_SUCCESS = 'TASKEXPORT_SUCCESS';
// ================ action creators ================

export function taskSt(task) {
	return { type: TASK_START, task }
}

export function taskuploadSt(tad) {
	return { type: TASKUPLOAD_START, tad }
}

export function tasksubmitSt(tit) {
	return { type: TASKSUBMIT_START, tit }
}

export function taskdetailSt(til) {
	return { type: TASKDETAIL_START, til }
}

export function taskopenSt(ten) {
	return { type: TASKOPEN_START, ten }
}

export function taskexportSt(trt) {
	return { type: TASKEXPORT_START, trt }
}
