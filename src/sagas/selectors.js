

//If select is called without argument (i.e. yield select())
//then the effect is resolved with the entire state (the same result of a getState() call).
// export const getUsers = state => state.users;
// export const getPosts = state => state.posts;

export default class Selectors {
  static getPosts = state => state.posts;
  static getKind = state => state.kind;
}
