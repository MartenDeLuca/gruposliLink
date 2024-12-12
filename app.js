const CryptoJS = require("crypto-js"); 

//Datos correo del usuario logueado
const mensaje = "martin@grupotesys.com.ar";

//Fecha del momento de generacion del link
const now = new Date();
const formattedDateTime = `${String(now.getDate()).padStart(2, '0')}${String(now.getMonth() + 1).padStart(2, '0')}${now.getFullYear()}${String(now.getHours()).padStart(2, '0')}${String(now.getMinutes()).padStart(2, '0')}`;

// La clave secreta fija
const claveSecreta = "sliticketsgrupostesysbi";  

//IV fijo (16 bytes, representado como hexadecimal)
const iv = CryptoJS.enc.Utf8.parse("sliticketsgrupos"); 

// Generar la clave a partir de la clave secreta (SHA-256)
const claveHash = CryptoJS.SHA256(claveSecreta).toString(CryptoJS.enc.Hex);

// Cifrar el mensaje con AES en modo CBC
const cifradoCorreo = CryptoJS.AES.encrypt(mensaje, CryptoJS.enc.Hex.parse(claveHash), { iv: iv }).toString();
const cifradoFecha = CryptoJS.AES.encrypt(formattedDateTime, CryptoJS.enc.Hex.parse(claveHash), { iv: iv }).toString();

// Codificar el texto cifrado en Base64
const cifradoCorreoBase64 = cifradoCorreo.toString(CryptoJS.enc.Base64);
const cifradoFechaBase64 = cifradoFecha.toString(CryptoJS.enc.Base64);

// Aquí generamos la URL para enviar el token cifrado y el IV al servidor
let params = `c=${cifradoCorreoBase64}&f=${cifradoFechaBase64}`

const base_url = "https://grupotesys.com.ar"

const url = `${base_url}/gruposli/web?${params}`;

console.log(url)