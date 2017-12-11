import React from 'react';
import CryptoJS from 'crypto-js'


class App extends React.Component {
  state = {
    text: '',
    key:''
  }
  render() {
    const { text, key } = this.state
    var ciphertext = CryptoJS.AES.encrypt(text, key);

    // Decrypt
    var bytes = CryptoJS.AES.decrypt(ciphertext.toString(), key);
    var plaintext = bytes.toString(CryptoJS.enc.Utf8);

    console.log(plaintext);
    return (
      <div>
      Encrypt this data:
        <input 
        onChange={e => this.setState({ text: e.target.value }) } 
        value={text} type="text" 
        />
      <br/>
        Using this key: 
        <input 
        onChange={e => this.setState({ key: e.target.value }) } 
        value={key} type="text" 
        />
        <br/>
        Encrypted data raw value: {ciphertext.toString()}
        <br/>
        <b>
        Original data size: {Buffer.byteLength(text, 'utf8')}
        <br/>
        Encrypted data size: {Buffer.byteLength(ciphertext.toString(), 'utf8')}
        </b>
      </div>
    );
  }
}
export default App;
