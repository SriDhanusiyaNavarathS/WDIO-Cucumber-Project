import { Given, Then, When } from "@cucumber/cucumber";
import chai from "chai";
import logger from "../../helper/logger";
import allure from "@wdio/allure-reporter";
import constants from "../../../data/constants.json";
import apiHelper from "../../helper/apiHelper";
import fs from "fs";
import nopcommercePage from "../../page-objects/nopcommerce.page";
import nopcommerceCustomerPage from "../../page-objects/nopcommerce.customer.page";
let endpoint: string;
let baseURl: string;
let res;
let testid = "E2Etest";
let custNotFound;
/**
 * 1.Get payload data
 * 2.Make get call by using API helpe
 * 3.Store results
 */
Given(/^User get (.*) of users from API$/, async function (endpointRef) {
  //Given(/^User get list of users from API$/, async function() {
  try {
    if (!endpointRef) throw Error("given endpointref is not valid");
    /*1.Get payload data*/
    allure.addStep(`${testid}: Started getting users from GEt API `);
    if (endpointRef.trim().toUpperCase() === "USERS") {
    }

    // if (!endpoint) {
    //   //throw Error(`Error Getting endpoint`);}
    //   console.log("Error getting endpoint from constants");
    // }

    /** 2.Make get call by using API helpe */
    await browser.call(async function () {
      endpoint = constants.REQRES.GET_USERS;
      //@ts-ignore
      res = await apiHelper.GET(
        testid,
        //@ts-ignore
        browser.config.reqresinBaseURL,
        endpoint,
        "",
        constants.REQRES.QUERYPARAM
      );
      console.log("Response is : " + JSON.stringify(res.body));
    });
    if (res.status !== 200) {
      //@ts-ignore
      chai.expect.fail(
        //@ts-ignore
        `Failed getting users from:${browser.config.reqresinBaseURL}`
      );
      //console.log(assertion);
    }

    /* 3.Store results*/
    let data = JSON.stringify(res.body, undefined, 4); //undefined, 4 are added for formating the file
    let fileName = `${process.cwd()}/data/apiRes/reqresAPIUsers.json`;
    fs.writeFileSync(fileName, data);
    allure.addStep(`${testid}: APiResponse stored in JSON file `);
  } catch (err) {
    err.message = `${testid}:Failed`;
    throw err;
  }
});
When(/^(.*) user login to nopcommerce site$/, async function (user) {
  if (!user) throw Error(`Givenuser:${user} is not valid`);
  user = user.trim().toUpperCase();
  try {
    allure.addStep(`${testid}: Login into NopCommerce `);
    await nopcommercePage.loginToNopCommerceWeb(
      this.testid,
      //@ts-ignore
      browser.config.nopCommerceLoginURL,
      //process.env.TEST_NOPCommerce_ADMIN_USER,
      //process.env.TEST_NOPCommerce_ADMIN_PASSWORD
      //what if user changes other than admin follow same
      process.env[`TEST_NOPCommerce_${user}_USER`],
      process.env[`TEST_NOPCommerce_${user}_PASSWORD`]
    );
  } catch (err) {
    err.message = `${testid}:Failed`;
    throw err();
  }
});
Then(/^Verify if users exist in customers list$/, async function () {
  /**navigate/select customer options from page */
  try {
    
    await browser.url(
      //@ts-ignore
      `${browser.config.nopCommerceBaseURL}/Admin/Customer/List`
    );

    /**Read APIresponse from data folder */
    let fileName = `${process.cwd()}/data/apiRes/reqresAPIUsers.json`;
    let data = fs.readFileSync(fileName, "utf8");
    let dataObj = JSON.parse(data);
    //console.log(`API data:${JSON.stringify(dataObj)}`);

    /**for each user objects in API response */
    let numOfObj = dataObj.data.length;
    let arr = [];
    for (let i = 0; i < numOfObj; i++) {
      let obj = {};
      let firstname = dataObj.data[i].first_name;
      let lastname = dataObj.data[i].last_name;
      custNotFound = await nopcommerceCustomerPage.searchNameandConfirm(
        this.testid,
        firstname,
        lastname
      );

      if (custNotFound) {
        obj["firstname"] = firstname;
        obj["lastname"] = lastname;
        arr.push(obj);
        console.log("Array Length:" + arr.length);
      }
    }
    if (arr.length > 1) {
      let dataNew = JSON.stringify(arr); //, undefined, 4)
      let filepath = `${process.cwd()}/results/custNotFoundList.json`;
      fs.writeFileSync(filepath, dataNew);
    }
  } catch (err) {
    throw err;
  }
});
