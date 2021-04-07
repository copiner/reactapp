// ================ action types ================

//密码登入
export const LOGIN_START = 'LOGIN_START';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAIL = 'LOGIN_FAIL';
//密码登入 图片验证码
export const SIGNPIC_START = 'SIGNPIC_START';
export const SIGNPIC_SUCCESS = 'SIGNPIC_SUCCESS';
export const SIGNPIC_FAIL = 'SIGNPIC_FAIL';

//登出
export const LOGOUT_START = 'LOGOUT_START';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAIL = 'LOGOUT_FAIL';

//修改密码
export const CORRECT_MID = 'CORRECT_MID';
export const CORRECT_START = 'CORRECT_START';
export const CORRECT_SUCCESS = 'CORRECT_SUCCESS';
export const CORRECT_FAIL = 'CORRECT_FAIL';

//二维码登陆 获取二维码
export const CODE_START = 'CODE_START';
export const CODE_SUCCESS = 'CODE_SUCCESS';
export const CODE_FAIL = 'CODE_FAIL';

//查询扫描结果
export const CODE_SCAN_START = 'CODE_SCAN_START';
export const CODE_SCAN_SUCCESS = 'CODE_SCAN_SUCCESS';
export const CODE_SCAN_FAIL = 'CODE_SCAN_FAIL';

//菜单
export const MENU_START = 'MENU_START';
export const MENU_SUCCESS = 'MENU_SUCCESS';

// ================ action creators ================


export function loginSt(info) {
	return { type: LOGIN_START, info }
}

export function loginIn(info) {
	return { type: LOGIN_SUCCESS, info }
}


export function signpicSt(id) {
	return { type: SIGNPIC_START, id }
}

export function signpicIn(pic) {
	return { type: SIGNPIC_SUCCESS, pic }
}


export function codeSt(id) {
	return { type: CODE_START, id }
}

export function codeIn(code) {
	return { type: CODE_SUCCESS, code }
}

export function codescanSt(id) {
	return { type: CODE_SCAN_START, id }
}

export function codescanIn(info) {
	return { type: CODE_SCAN_SUCCESS, info }
}

export function logoutSt(out) {
	return { type: LOGOUT_START, out }
}

export function logoutIn(out) {
	return { type: LOGOUT_SUCCESS, out }
}

export function correctSt(cort) {
	return { type: CORRECT_START, cort }
}

export function correctMid() {
	return { type: CORRECT_MID }
}

export function correctIn(cort) {
	return { type: CORRECT_SUCCESS, cort }
}

export function menuSt(out) {
	return { type: MENU_START, out }
}

export function menuIn(out) {
	return { type: MENU_SUCCESS, out }
}
