import { APP_USER_ID, APP_AUTH_TOKEN } from "../constants";

export function signIn(userId, token) {
  localStorage.setItem(APP_USER_ID, userId);
  localStorage.setItem(APP_AUTH_TOKEN, token);
}

export function signOut() {
  localStorage.setItem(APP_USER_ID, "");
  localStorage.setItem(APP_AUTH_TOKEN, "");
}
