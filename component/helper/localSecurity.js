import SecureStorage from "secure-web-storage";
import CryptoJS from "crypto-js";



var SECRET_KEY = '$2y$10$aJv87elABWCsBkotsr/fceukXgdyX69Zq4Ih1KQqBM/42jknadXxq';

export var localSecured = new SecureStorage(localStorage, {
    hash: function hash(key) {
        key = CryptoJS.SHA256(key, SECRET_KEY);

        return key.toString();
    },
    encrypt: function encrypt(data) {
        data = CryptoJS.AES.encrypt(data, SECRET_KEY);

        data = data.toString();

        return data;
    },
    decrypt: function decrypt(data) {
        data = CryptoJS.AES.decrypt(data, SECRET_KEY);

        data = data.toString(CryptoJS.enc.Utf8);

        return data;
    }
});
