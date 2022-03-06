import { Given, When } from "@wdio/cucumber-framework";
import chai from "chai";

Given(/^A web page opened$/, async function () {
  console.log("Before browser opens");
  //await browser.url("/inputs");
  //await browser.url("/dropdown");
  //await browser.url("/checkboxes");
  //await browser.url("/windows");
  //await browser.url("/javascript_alerts");
  // await browser.url("/basic_auth");
  //await browser.url("/upload");
  //await browser.url("/frames");
  //await browser.url("/tables");
  await browser.url("/");
  await browser.maximizeWindow();
  await browser.setTimeout({ implicit: 15000, pageLoad: 10000 });
});
When(/^perform web Interactions$/, async function () {
  /*1. Web Interaction with Input box
   
  //convert num to string
  //let num = 45454;
  //let strNum = num.toString();

  //let input = await $(`[type=number]`);
  //await input.setValue(strNum);
  //await browser.pause(1000);
  // to type slow in text field
  // await input.click();
  // for(let i = 0; i <strNum.length ; i ++)
  // {
  //   let chatStr = strNum.charAt(i);
  //   await browser.pause(1000)
  //   await browser.keys(chatStr)
  // }

  /*2. DropDown*/
  // let dropdown = await $('//select/option[@selected="selected"]');
  // let val = await dropdown.getText();
  // chai.expect(val).to.equal("Please select an option");
  /*Select a specific option*/
  //let dropelem = await $("#dropdown");
  //await dropelem.selectByVisibleText("Option 2");
  //await dropelem.selectByAttribute("value", "1");
  //await dropelem.selectByIndex(2) //Index 2 will select option 2 which is index 2
  /*Get a list of options*/
  // let EleArr = await $$(`select > option`);
  // EleArr.forEach(async Arr =>{
  // await Arr.getText()  }) // for Each by rule will not support Async function but await is neccessary here, hence forEach can not be used
  // let arr = [];
  // for (let i = 0; i < EleArr.length; i++) {
  //   let option = EleArr[i];
  //   let value = option.getText(); //if i want that values in Array
  //   arr.push(value);
  //   console.log(value);
  // }
  // console.log(`>>Options Array: ${arr}`);
  /*3. CheckBox*/
  //select an option
  //select if unselected
  // let checkbox = await $(`//form[@id="checkboxes"]/input[1]`);
  // if (!(await checkbox.isSelected())) {
  //   checkbox.click();
  // }
  //Assert if option is selected
  // let checkbox2 = await $(`//form[@id="checkboxes"]/input[2]`);
  // let isChecked = await checkbox2.isSelected();
  // chai.expect(isChecked).to.be.equal(true);
  // await browser.pause(10000);
  //Select many option
  // let CheckBoxArr = await $$(`//form[@id="checkboxes"]/input`);
  // for (let i = 0; i < CheckBoxArr.length; i++) {
  //   let CheckBoxEle = CheckBoxArr[i];
  //   if (!(await CheckBoxEle.isSelected())) {
  //     CheckBoxEle.click();
  //   }
  // }
  /*4. Windows Handling*/
  // await (await $(`=Click Here`)).click(); //it is link text
  // await (await $(`=Elemental Selenium`)).click();
  // let CurrentWindowTitle =await browser.getTitle();
  // let parentwindowhandle = await browser.getWindowHandle();
  // console.log(CurrentWindowTitle);
  //switch to specific window
  // let windowHandles = await browser.getWindowHandles();
  // for(let i=0; i<windowHandles.length; i++){
  //   console.log(windowHandles[i])
  //   await browser.switchToWindow(windowHandles[i])
  //   CurrentWindowTitle = await browser.getTitle();
  //   if(CurrentWindowTitle === "Elemental Selenium: Receive a Free, Weekly Tip on Using Selenium like a Pro"){
  //     await browser.switchToWindow(windowHandles[i])
  //     let headerTextEleSel =await (await $(`<h1>`)).getText();
  //     console.log(headerTextEleSel);
  //     break
  //   }
  // }
  //switch back to parent window
  // await browser.switchToWindow(parentwindowhandle)
  // let parentHeaderText = await $(`<h3>`).getText();
  // console.log(parentHeaderText);
  // await browser.debug()
  /*5.Alerts*/
  //await (await $('button=Click for JS Alert')).click();
  //await (await $('button=Click for JS Confirm')).click();
  // await (await $('button=Click for JS Prompt')).click();
  // if(await browser.isAlertOpen()){
  //   //await browser.acceptAlert()
  //   //await browser.dismissAlert()
  //   let AlertText = await browser.getAlertText();
  //   console.log(AlertText)
  //   await browser.sendAlertText("Hello Js prompt..")
  //   await browser.acceptAlert()
  //   await browser.pause(1000);
  //  }

  /*6. Basic Auth*/
  //changes base url

  /*7. File Upload */
  //await (await $('#file-upload')).addValue("../../../data/fileupload/dummyfile.txt") //-->this will fail bcoz file path is relative and it is not valid
  // console.log(process.cwd()); //-->process is global method and cwd is current working directory wll give absolute path
  // await (await $('#file-upload')).addValue(`${process.cwd()}/data/fileupload/dummyfile.txt`)
  // await browser.pause(10000);
  // await (await $('#file-submit')).click()
  // await browser.pause(10000);

  /*8. Frames */
  //await (await $('=iFrame')).click();
  //await (await $('#tinymce')).setValue("typing into frame"); //-> will fail bcoz set value cant call element tinymce bcoz that is iFrame, in such case we need to switch to parent iFrame
  // let eleFrame =await $(`#mce_0_ifr`)
  // await browser.switchToFrame(eleFrame)
  // await (await $('#tinymce')).setValue("typing into frame");
  // await browser.switchToParentFrame() //parent frame will have control if multiple frames are there in such case use switchto parent frame

  //   await (await $("=iFrame")).click();
  //   let eleFrame = await $(`#mce_0_ifr`);
  //   await browser.switchToFrame(eleFrame);
  //   await $("#tinymce").click();
  //   await browser.keys(["Meta", "A"]); //Meta is Ctrl
  //   await browser.pause(1000);
  //   await browser.keys("Delete");
  //   await $("#tinymce").addValue("typing into frame");
  //   await browser.switchToParentFrame();

  /*9. Scrolling */
  // await $('span=Best Sellers in Books').scrollIntoView()

  /*10. Web tables */
  //1. get no of rows and columns
  // let rowCount = await $$(`//table[@id="table1"]/tbody/tr`).length;
  // chai.expect(rowCount).to.equal(4);
  // console.log(`Row Count: ${rowCount}`);

  // let coulmnCount = await $$(`//table[@id="table1"]/thead/tr/th`).length;
  // chai.expect(coulmnCount).to.equal(6);
  // console.log(`Coulmn Count: ${rowCount}`);

  //2. Get Whole table data
  // for(let i=1;i<= rowCount; i++){
  //   for(let j=1; j<=coulmnCount; j++){
  //     let tableValue = await $(`//table[@id="table1"]/tbody/tr[${i}]/td[${j}]`).getText();
  //     console.log(`===Table values=== : ${tableValue}`);
  //   }}

  // let arr = [];
  // for (let i = 0; i < rowCount; i++) {
  //   let TableObj = {
  //     lastname: "",
  //     firstname: "",
  //     email: "",
  //     due: "",
  //     web: "",
  //   };
  //   for (let j = 0; j < coulmnCount; j++) {
  //     let tableValue = await $(
  //       `//table[@id="table1"]/tbody/tr[${i + 1}]/td[${j + 1}]`
  //     ).getText();
  //     if (j === 0) TableObj.lastname = tableValue;
  //     if (j === 1) TableObj.firstname = tableValue;
  //     if (j === 2) TableObj.email = tableValue;
  //     if (j === 3) TableObj.due = tableValue;
  //     if (j === 4) TableObj.web = tableValue;
  //   }

  //   arr.push(TableObj);
  // }
  // console.log(`Whole table: ${arr} `);
  // console.log(`Whole table: ${JSON.stringify(arr)} `);

  // Get single row based on condition
  // let arr = [];
  // for (let i = 0; i < rowCount; i++) {
  //   let TableObj = {
  //     lastname: "",
  //     firstname: "",
  //     email: "",
  //     due: "",
  //     web: "",
  //   };
  //   for (let j = 0; j < coulmnCount; j++) {
  //     let tableValue = await $(
  //       `//table[@id="table1"]/tbody/tr[${i + 1}]/td[${j + 1}]`
  //     ).getText();
  //     let firstname = await $(
  //       `//table[@id="table1"]/tbody/tr[${i + 1}]/td[2]`
  //     ).getText();
  //     if (firstname === "Jason") {
  //       if (j === 0) TableObj.lastname = tableValue;
  //       if (j === 1) TableObj.firstname = tableValue;
  //       if (j === 2) TableObj.email = tableValue;
  //       if (j === 3) TableObj.due = tableValue;
  //       if (j === 4) TableObj.web = tableValue;
  //     }
  //   }
  //   if (TableObj.firstname) {
  //     arr.push(TableObj);
  //   }
  // }
  // console.log(`Whole table: ${JSON.stringify(arr)} `);

  //get Single column
  // let arr1 = [];
  // for (let i = 0; i < rowCount; i++) {
  //   let cellVal = await (
  //     await $(`//table[@id="table1"]/tbody/tr[${i + 1}]/td[4]`)
  //   ).getText();
  //   arr1.push(cellVal);
  // }
  // console.log(`Single col:${arr1}`)

  //Get single value based on other cell value
  // let arr1 = [];
  // for (let i = 0; i < rowCount; i++) {
  //   let duePrice = await $(
  //     `//table[@id="table1"]/tbody/tr[${i + 1}]/td[4]`
  //   ).getText();
  //   let firstname = await $(
  //     `//table[@id="table1"]/tbody/tr[${i + 1}]/td[2]`
  //   ).getText();
  //   if (+duePrice.replace("$", "") > 50) {
  //     arr1.push(firstname);
  //   }
  // }
  // console.log(`Single col:${arr1}`);

//Advance Scrolling

//Scroll Down
//VISIBLE PORTION
//Y-> window.innerHeight
await browser.execute(()=>{
window.scrollBy(0, window.innerHeight)
})
await browser.pause(2000);

//Scroll Up
await browser.execute(()=>{
window.scrollBy(0, -window.innerHeight);
})

//INVISIBLE OPTION
//1. scroll to
//Y-> document.body.scrollTop[scrollHeight]
await browser.pause(2000);
await browser.execute(()=>{
  window.scrollTo(0, document.body.scrollHeight)
})

await browser.pause(2000);
await browser.execute(()=>{
  window.scrollTo(0, document.body.scrollTop)
})
});
