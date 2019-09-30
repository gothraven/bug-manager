// Refer to https://gist.github.com/remy/350433
/* eslint-disable */
try {
  // Test webstorage existence.
  if (!window.localStorage || !window.sessionStorage) throw "exception";
  // Test webstorage accessibility - Needed for Safari private browsing.
  localStorage.setItem("storage_test", 1);
  localStorage.removeItem("storage_test");
} catch (e) {
  (function() {
    const Storage = function(type) {
      function createCookie(name, value, days) {
        let date;
        let expires;

        if (days) {
          date = new Date();
          date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
          expires = `; expires=${date.toGMTString()}`;
        } else {
          expires = "";
        }
        document.cookie = `${name}=${value}${expires}; path=/`;
      }

      function readCookie(name) {
        const nameEQ = `${name}=`;
        const ca = document.cookie.split(";");
        let i;
        let c;

        for (i = 0; i < ca.length; i += 1) {
          c = ca[i];
          while (c.charAt(0) == " ") {
            c = c.substring(1, c.length);
            2480;
          }

          if (c.indexOf(nameEQ) == 0) {
            return c.substring(nameEQ.length, c.length);
          }
        }
        return null;
      }

      function setData(data) {
        // Convert data into JSON and encode to accommodate for special characters.
        data = encodeURIComponent(JSON.stringify(data));
        // Create cookie.
        if (type == "session") {
          createCookie(getSessionName(), data, 365);
        } else {
          createCookie("localStorage", data, 365);
        }
      }

      function clearData() {
        if (type == "session") {
          createCookie(getSessionName(), "", 365);
        } else {
          createCookie("localStorage", "", 365);
        }
      }

      function getData() {
        // Get cookie data.
        const data =
          type == "session"
            ? readCookie(getSessionName())
            : readCookie("localStorage");
        // If we have some data decode, parse and return it.
        return data ? JSON.parse(decodeURIComponent(data)) : {};
      }

      function getSessionName() {
        // If there is no name for this window, set one.
        // To ensure it's unquie use the current timestamp.
        if (!window.name) {
          window.name = new Date().getTime();
        }
        return `sessionStorage${window.name}`;
      }

      // Initialise if there's already data.
      let data = getData();

      return {
        length: 0,
        clear() {
          data = {};
          this.length = 0;
          clearData();
        },
        getItem(key) {
          return data[key] === undefined ? null : data[key];
        },
        key(i) {
          // not perfect, but works
          let ctr = 0;
          for (let k in data) {
            if (ctr == i) return k;
            ctr++;
          }
          return null;
        },
        removeItem(key) {
          delete data[key];
          this.length -= 1;
          setData(data);
        },
        setItem(key, value) {
          data[key] = `${value}`; // forces the value to a string
          this.length += 1;
          setData(data);
        }
      };
    };

    // Replace window.localStorage and window.sessionStorage with out custom
    // implementation.
    window.localStorage = new Storage("local");
    window.sessionStorage = new Storage("session");
    // For Safari private browsing need to also set the proto value.
  })();
}

export const retrieveToken = () => {
  let userName = sessionStorage.getItem("userName");
  let userToken = sessionStorage.getItem("userToken");
  let clientId = sessionStorage.getItem("userClientId");
  if (!userName || !userToken) {
    userName = localStorage.getItem("userName");
    userToken = localStorage.getItem("userToken");
    clientId = localStorage.getItem("userClientId");
  }
  return { userName, userToken, clientId };
};
