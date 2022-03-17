import Page from "./page";
import chai from "chai";
//import
class nopcommerceCustomerPage extends Page {
  constructor() {
    super();
  }
  /**Page Objectsd-elements */
  get firstname() {
    return $(`//*[@id="SearchFirstName"]`);
  }
  get lastname() {
    return $(`//*[@id="SearchLastName"]`);
  }
  get searchbutton() {
    return $(`//*[@id="search-customers"]`);
  }
  get noResultMessage() {
    return $(`//*[@id="customers-grid"]/tbody/tr/td`);
  }
  /**Page Actions */

  async searchNameandConfirm(
    testid: string,
    firstname: string,
    lastname: string
  ) : Promise<boolean>{
    // if (!firstname || !lastname){
    //   console.log(`Invalid firstname or lastname to search`);}
    let nameNotExist = false;
    //firstname = firstname.trim();
    //lastname = lastname.trim();
    testid ="CUS01"
    try {
      await this.type(await this.firstname, firstname);
      await this.type(await this.lastname, lastname);
      await browser.pause(1000);
      await this.click(await this.searchbutton);
      await browser.pause(10000);
           
      let isNotDisplayed = await this.noResultMessage.isDisplayed();
      if (isNotDisplayed) nameNotExist = true;
    } catch (err) {
      throw err;
    }
    return nameNotExist;
  }
}
export default new nopcommerceCustomerPage();
