import Page from "./page";
import chai from "chai";
//import
class nopCommercePage extends Page {
  constructor() {
    super();
  }
  /**Page Objectsd-elements */
  get UserInput() {
    return $(`#Email`);
  }
  get passwordInput() {
    return $(`#Password`);
  }
  get button() {
    return $(`//div/button[@class="button-1 login-button"]`);
  }

  /**Page Actions */
  async loginToNopCommerceWeb(testid:string, url:string, username:string, password:string){
      await this.navigateTo(url)
      await this.type(await this.UserInput, username)
      await this.type(await this.passwordInput, password )
      await this.click(await this.button)
  }
}
export default new nopCommercePage();
