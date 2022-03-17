import Page from "./page";
import chai from "chai";
//import
class Homepage extends Page {
  constructor() {
    super();
  }
  /**Page Objectsd-elements */
  get UserInput() {
    return $(`#user-name`);
  }
  get passwordInput() {
    return $(`#password`);
  }
  get button() {
    return $(`#login-button`);
  }

  /**Page Actions */
  async getUsername(testid: string, username: string) {
    if (!username) throw Error(`Given username: ${username} is not valid`);
    try {
      username = username.trim();
      await this.type(await this.UserInput, username);
    } catch (err) {
      err.message = `Error entering user name: ${username}, ${err.message}`;
      throw err;
    }
  }

  async getPassword(testid: string, password: string) {
    if (!password) throw Error(`Given password is not valid`);
    try {
      password = password.trim();
      await this.type(await this.passwordInput, password);
    } catch (err) {
      err.message = `Error entering user name: ${password}, ${err.message}`;
      throw err;
    }
  }
  async loginbutton(testid: string) {
    try {
      await this.click(await this.button);
    } catch (err) {
      err.message = `Error clicking button: ${err.message}`;
      throw err;
    }
  }
  async loginToSauce(testid:string, username:string, password:string){
      await this.getUsername(testid,username)
      await this.getPassword(testid, password);
      await this.loginbutton(testid)

  }
}
export default new Homepage();
