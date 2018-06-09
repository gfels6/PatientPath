import { AsyncStorage } from "react-native";

/* author: gfels6
** Hier wird die Authentifizierung geregelt seitens App
*/

// Löschen des Auth. Token
export const onSignOut = () => AsyncStorage.removeItem("token");

// Get Funktion zum holen des Tokens
export const returnToken = () => {
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem("token")
      .then(res => {
        if (res !== null) {
          resolve(res);
        }
      })
      .catch(err => reject(err));
  });
}

// Überprüfung ob man eingeloggt ist
export const isSignedIn = () => {
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem("token")
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