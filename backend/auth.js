import CryptoJS from 'crypto-js'
import dotenv from 'dotenv'

const env = dotenv.config();

const bspSharedKey = '2e1f6f77e9674006838270fcb95477f7';
const bspOrganization = 'test-drive-890477f1b75e491b910d3';
const bspSecretKey = process.env.BSP_SECRET_KEY;

const signableContent = function(path, method) {
    console.log(path, method);
    const params = [
        method,
        path,
        'application/json',
        undefined,
        bspOrganization
    ];
    return params.filter(p => p && p.length > 0).join('\n');
}

const calculateSignature = function (path, method) {
    const date = new Date();
    const key = uniqueKey(date);
    const sc = signableContent(path, method);
    const hmac = CryptoJS.HmacSHA512(sc, key);
    return CryptoJS.enc.Base64.stringify(hmac);
}

const uniqueKey = function(date) {
    const nonce = date.toISOString().slice(0, 19) + '.000Z';
    return bspSecretKey + nonce;
}

const getAccessKey = function (path, method) {
    const signature = calculateSignature(path, method);
    return `AccessKey ${bspSharedKey}:${signature}`;
}

export default getAccessKey;