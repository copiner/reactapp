
// ================ action types ================

export const ROLE_START = 'ROLE_START';
export const ROLE_SUCCESS = 'ROLE_SUCCESS';
export const ROLE_FAIL = 'ROLE_FAIL';

export const ROLEADD_START = 'ROLEADD_START';
export const ROLEADD_SUCCESS = 'ROLEADD_SUCCESS';

export const ROLEUPDATE_START = 'ROLEUPDATE_START';
export const ROLEUPDATE_SUCCESS = 'ROLEUPDATE_SUCCESS';

export const ROLEDELETE_START = 'ROLEDELETE_START';
export const ROLEDELETE_SUCCESS = 'ROLEDELETE_SUCCESS';


export const ROLEENABLE_START = 'ROLEENABLE_START';
export const ROLEENABLE_SUCCESS = 'ROLEENABLE_SUCCESS';


export const ROLEDISABLE_START = 'ROLEDISABLE_START';
export const ROLEDISABLE_SUCCESS = 'ROLEDISABLE_SUCCESS';


export const ROLEMENU_START = 'ROLEMENU_START';
export const ROLEMENU_SUCCESS = 'ROLEMENU_SUCCESS';

export const ROLESETMENU_START = 'ROLESETMENU_START';
export const ROLESETMENU_SUCCESS = 'ROLESETMENU_SUCCESS';

export const ROLEUSER_START = 'ROLEUSER_START';
export const ROLEUSER_SUCCESS = 'ROLEUSER_SUCCESS';

export const ROLEDELUSER_START = 'ROLEDELUSER_START';//role del user start
export const ROLEDELUSER_SUCCESS = 'ROLEDELUSER_SUCCESS';

// ================ action creators ================

export function roleSt(role) {
	return { type: ROLE_START, role }
}

export function roleaddSt(add) {
	return { type: ROLEADD_START, add }
}

export function roleupdateSt(ute) {
	return { type: ROLEUPDATE_START, ute }
}

export function roledeleteSt(dte) {
	return { type: ROLEDELETE_START, dte }
}

export function roleenableSt(ele) {
	return { type: ROLEENABLE_START, ele }
}

export function roledisableSt(dle) {
	return { type: ROLEDISABLE_START, dle }
}

export function rolemenuSt(menu) {
	return { type: ROLEMENU_START, menu }
}

export function rolesetmenuSt(snu) {
	return { type: ROLESETMENU_START, snu }
}

export function roleuserSt(user) {
	return { type: ROLEUSER_START, user }
}

export function roledeluserSt(der) {
	return { type: ROLEDELUSER_START, der }
}
