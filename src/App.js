import React from 'react';
import CryptoJS from 'crypto-js'

// TESTING it out here:
// https://codesandbox.io/s/pjknkw7yyx

// CHECKOUT:
 // webcrypto and using AES-GCM 
 // xor

// niggler
//  function xor(password, data) { var out = "";  for(var i = 0; i < data.length; ++i) out += String.fromCharCode(password.charCodeAt(i % password.length) ^ data.charCodeAt(i)); return out; }
// niggler
//  data is the html you want to encode or decode
// niggler
//  xor("password", "this is a test") gives you the string '\u0004\t\u001a\u0000W\u0006\u0001D\u0011A\u0007\u0016\u0004\u001b'
// niggler
//  and to decode
// 12:00 niggler
//  xor("password", '\u0004\t\u001a\u0000W\u0006\u0001D\u0011A\u0007\u0016\u0004\u001b') gives you ’this is a test'
//  If im encrypting 500kb of HTML with an 8 character key- it makes it less secure

// XOR Security/Vulnurabliity
// the way you would attack the xor encryption is to feed a bunch of zeros, the net result will be a repetition of the password
// IE pass it null characters

class App extends React.Component {
  state = {
    text: "",
    key: ""
  };
  xor = (text, key) => {
    let out = "";
    for (var i = 0; i < text.length; ++i)
      out += String.fromCharCode(
        key.charCodeAt(i % key.length) ^ text.charCodeAt(i)
      );
    console.log(out.length)
    return out;
  };

  render() {
    const { text, key } = this.state;
    const ciphertext = CryptoJS.AES.encrypt(text, key);

    // Decrypt
    // const bytes = CryptoJS.AES.decrypt(ciphertext.toString(), key);
    // const plaintext = bytes.toString(CryptoJS.enc.Utf8);

    const origText = text.length;
    const encrText = encodeURI(ciphertext.toString()).split(/%..|./).length;
    
    let xorEncr = this.xor(text, key)

    const aesPercent = (encrText - origText) / origText * 100;
    const xorPercent = (btoa(xorEncr).length - origText) / origText * 100;
    
    return (
      <div>
        Encrypt this data:
        <input
          onChange={e => this.setState({ text: e.target.value })}
          value={text}
          type="text"
        />
        <br />
        Using this key:
        <input
          onChange={e => this.setState({ key: e.target.value })}
          value={key}
          type="text"
        />
        <br />
        AES Encryption: {ciphertext.toString()}
        <br />
        XOR Encryption {btoa(xorEncr)}
        <br/>
        <b>
          Original data size: {origText}
          <br />
          <br />
          AES data size: {encrText}
          <br/>
          XOR data size: {btoa(xorEncr).length}
        </b>
        <br />
        <br />
        <div>
          {" "}
          AES is <b> {aesPercent}%</b> bigger than the plain string<br/>
          <br />
          XOR is <b> {xorPercent}%</b> bigger than the plain string
        </div>
      </div>
    );
  }
}

export default App;