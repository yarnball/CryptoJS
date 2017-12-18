import React from "react";
import CryptoJS from "crypto-js";

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
    return out;
  };

  render() {
    const { text, key } = this.state;
    const ciphertext = CryptoJS.AES.encrypt(text, key);

    // Decrypt
    // const bytes = CryptoJS.AES.decrypt(ciphertext.toString(), key);
    // const plaintext = bytes.toString(CryptoJS.enc.Utf8);

    var origText = text.length;
    var encrText = encodeURI(ciphertext.toString()).split(/%..|./).length;

    let xorEncr = this.xor(text, key);

    const aesPercent = (encrText - origText) / origText * 100 + "%" || "";
    const xorPercent =
      (btoa(xorEncr).length - origText) / origText * 100 + "%" || "";

    return (
      <div>
        Encrypt this data:
        <input
          onChange={e => this.setState({ text: e.target.value })}
          type="text"
        />
        <br />
        Using this key:
        <input
          onChange={e => this.setState({ key: e.target.value })}
          type="text"
        />
        <br />
        <br />
        {origText > 1 ? (
          <span>
            {" "}
            AES is <b> {aesPercent}</b> bigger than the plain string<br />
            <br />
            XOR is <b> {xorPercent}</b> bigger than the plain string
          </span>
        ) : (
          <span>
            <span> Please input a value ... </span>
          </span>
        )}
        <br />
        <br />
        <br />
        AES Encryption: {ciphertext.toString()}
        <br />
        XOR Encryption {btoa(xorEncr)}
        <br />
        <b>
          Original data size: {origText}
          <br />
          AES data size: {encrText}
          <br />
          XOR data size: {btoa(xorEncr).length}
        </b>
        <h3> Decoded value:</h3>
        XOR || <i>{this.xor(xorEncr, key)}</i>
        <br />
      </div>
    );
  }
}

export default App;
