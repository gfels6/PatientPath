import { AsyncStorage } from "react-native";

export const USER_KEY = "token";

export const onSignOut = () => AsyncStorage.removeItem(USER_KEY);

export const returnToken = () => {
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem(USER_KEY)
      .then(res => {
        if (res !== null) {
          resolve(res);
        }
      })
      .catch(err => reject(err));
  });
}

export const isSignedIn = () => {
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem(USER_KEY)
      .then(res => {
        if (res !== null) {
          resolve(true);
        } else {
          resolve(false);
        }
      })
      .catch(err => reject(err));
  });
};