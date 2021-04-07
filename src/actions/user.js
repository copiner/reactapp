
// ================ action types ================

export const USER_START = 'USER_START';
export const USER_SUCCESS = 'USER_SUCCESS';
export const USER_FAIL = 'USER_FAIL';


export const USERADD_START = 'USERADD_START';
export const USERADD_SUCCESS = 'USERADD_SUCCESS';


export const USERUPDATE_START = 'USERUPDATE_START';
export const USERUPDATE_SUCCESS = 'USERUPDATE_SUCCESS';

export const USERDELETE_START = 'USERDELETE_START';
export const USERDELETE_SUCCESS = 'USERDELETE_SUCCESS';

export const USERENABLE_START = 'USERENABLE_START';
export const USERENABLE_SUCCESS = 'USERENABLE_SUCCESS';

export const USERDISABLE_START = 'USERDISABLE_START';
export const USERDISABLE_SUCCESS = 'USERDISABLE_SUCCESS';

export const USERRESET_START = 'USERRESET_START';
export const USERRESET_SUCCESS = 'USERRESET_SUCCESS';

// ================ action creators ================

export function userSt(user) {
	return { type: USER_START, user }
}


export function useraddSt(add) {
	return { type: USERADD_START, add }
}

export function userupdateSt(ute) {
	return { type: USERUPDATE_START, ute }
}

export function userdeleteSt(dte) {
	return { type: USERDELETE_START, dte }
}

export function userenableSt(ele) {
	return { type: USERENABLE_START, ele }
}

export function userdisableSt(dle) {
	return { type: USERDISABLE_START, dle }
}

export function userresetSt(uet) {//重置密码
	return { type: USERRESET_START, uet }
}
