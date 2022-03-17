import { Given, Then, When } from "@cucumber/cucumber";
import chai from "chai";
import logger from "../../helper/logger";
import allure from "@wdio/allure-reporter";
import Homepage from "../../page-objects/sauce.home.page";
import sauceHomePage from "../../page-objects/sauce.home.page";

Given(
  /^New step-As (a|an) (.*) user I login into inventory web app$/,
  async function (prefixtxt, userType, datatable) {
    //get data from data tables
    let dt = datatable.hashes();
    console.log(`Type of dt: ${typeof dt}`);
    console.log(`Type of dt: ${dt.constructor}`);
    console.log(`Type of dt: ${JSON.stringify(dt)}`);
    console.log(`The usertype: ${userType}`);
    //@ts-ignore
    //await browser.url(browser.config.sauceDemoUrl);
    await browser.url("https://www.saucedemo.com");
    console.log(`Test config val: ${JSON.stringify(browser.config)}`);
    await browser.setTimeout({ implicit: 15000, pageLoad: 1000 });
    await browser.maximizeWindow();
    try {
      await $(`#user-nam`).setValue(process.env.TEST_USERNAME);
      await $(`#password`).setValue(process.env.TEST_PASSWORD);
      await $(`#login-button`).click();
    } catch (err) {
      console.log(" Error in login.. Retrying");
      await browser.refresh();
      await browser.pause(1000);
      await $(`#user-name`).setValue("standard_user");
      await $(`#password`).setValue("secret_sauce");
      await $(`#login-button`).click();
    }
  }
);
//newly added with more STEPS
/*Given(/^Login into inventory web app$/, async function () {
  logger.info(`${this.testid}: Started to login in sauce demo page`);
  allure.addStep(`${this.testid}: Started to login in sauce demo page`);

  console.log(`User-Name: ${process.env.TEST_USERNAME}`);
  //await browser.url("https://www.saucedemo.com/");
  //@ts-ignore
  await browser.url(browser.config.sauceDemoUrl);

  //get Testid
  console.log(`Given Step Test Id: ${this.testid}`);

  console.log(`Test config val: ${JSON.stringify(browser.config)}`);
  await browser.setTimeout({ implicit: 15000, pageLoad: 1000 });
  await browser.maximizeWindow();

  // await $(`#user-name`).setValue("standard_user");
  // await $(`#password`).setValue("secret_sauce");
  // await $(`#login-button`).click();

  //Login with another user -Reload page
  // await browser.pause(2000);
  // await browser.reloadSession();
  // await browser.url("https://www.saucedemo.com/");
  // await browser.setTimeout({ implicit: 15000, pageLoad: 1000 });
  // await browser.maximizeWindow();

  // await $(`#user-name`).setValue("problem_user");
  // await $(`#password`).setValue("secret_sauce");
  // await $(`#login-button`).click();

  //Refresh  -Retrying
  try {
    await $(`#user-nam`).setValue(process.env.TEST_USERNAME);
    await $(`#password`).setValue(process.env.TEST_PASSWORD);
    await $(`#login-button`).click();
  } catch (err) {
    console.log(" Error in login.. Retrying");
    await browser.refresh();
    await browser.pause(1000);
    await $(`#user-name`).setValue("standard_user");
    await $(`#password`).setValue("secret_sauce");
    await $(`#login-button`).click();
  }

  //Back and forward
  await browser.back();
  await browser.pause(1000);
  await browser.forward();
  //await browser.debug();
  this.appid = "ABC123";
  logger.info(`${this.testid}: Login successful`);
  allure.addStep(`${this.testid}: Login done`);
});*/
Given(/^Login into inventory web app$/, async function () {
  logger.info(`${this.testid}: Started to login in sauce demo page`);
  allure.addStep(`${this.testid}: Started to login in sauce demo page`);

  //@ts-ignore
  //await browser.url(browser.config.sauceDemoUrl);
  await Homepage.navigateTo(browser.config.sauceDemoUrl);
  await Homepage.loginToSauce(
    "123",
    process.env.TEST_USERNAME,
    process.env.TEST_PASSWORD
  );
});
When(/^Inventory page should list (.*)$/, async function (NoOfProducts) {
  console.log(`The appid:${this.appid}`);
  if (!NoOfProducts) throw Error("Invalid product counts:${NoOfProducts}");
  let ProdArr = await $$(`.inventory_item_name`);
  chai.expect(ProdArr.length).to.equal(parseInt(NoOfProducts));
});
Then(/^Validate all products have valid price$/, async function () {
  //Get Price list
  let PriceArr = await $$(`.inventory_item_price`);
  let PriceStrArr = [];
  for (let i = 0; i < PriceArr.length; i++) {
    let GetPriceList = await PriceArr[i].getText();
    PriceStrArr.push(GetPriceList);
  }
  console.log(`==Price List==: ${PriceStrArr}`);
  //convert string to number
  //let PriceNoArr = PriceStrArr.map(ele=>parseInt(ele.replace("$", ""))) //ParseInt rounds of the values and gives //The output is [ 29, 9, 15, 49, 7, 15 ]
  let PriceNoArr = PriceStrArr.map((ele) => +ele.replace("$", "")); //output is [ 29.99, 9.99, 15.99, 49.99, 7.99, 15.99 ]
  console.log(PriceNoArr);

  //Assert if value is <=0
  let invalidPriceArr = PriceNoArr.filter((ele) => ele <= 0); //PriceNoArr is a Array filter and map works with Array
  chai.expect(invalidPriceArr.length).to.equal(0);
});
