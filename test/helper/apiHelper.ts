import request from "supertest";
import allure from "@wdio/allure-reporter";
//What is request
// console.log(`>>The type of request: ${typeof request}`)//function
// console.log(`>> Number of args: ${request.length}`)//1
// console.log(`>> what is the definition of function: ${request.toString()}`);
let payLoad = {
  email: "abc@gmail.com",
  password: "pistol",
};
//Get method
async function GET(
  testid: string,
  baseurl: string,
  endpoint: string,
  authToken: string,
  queryparam: object
) {
  if (!baseurl || !endpoint) {
    console.log("BASEURL:" + baseurl)
    console.log("ENDPOINT:" + endpoint)
    throw Error(`Given baseUrl:${baseurl} is not valid`);
  }
  baseurl = baseurl.trim();
  endpoint = endpoint.trim();
  allure.addStep(testid, `GET method`);
  try {
    return await request(baseurl)
      .get(endpoint)
      .query(queryparam)
      .auth(authToken, { type: "bearer" })
      .set("Content-Type", "application/json")
      .set("Accept", "application/json");
    //console.log(`Res: ${JSON.stringify(res.body)}`);
  } catch (err) {}
}

async function POST(
  testid: string,
  baseurl: string,
  endpoint: string,
  authToken: string,
  payLoad: object
) {
  if (!baseurl || !endpoint) {
    throw Error(`Given baseUrl:${baseurl}is not valid`);
  }
  baseurl = baseurl.trim();
  endpoint = endpoint.trim();
  allure.addStep(testid, `GET method`);
  try {
    return await request(baseurl)
      .post(endpoint)
      .auth(authToken, { type: "bearer" })
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .send(payLoad);
    //   console.log(`Res: ${JSON.stringify(res.body)}`);
  } catch (err) {}
}
//("1234", "https://reqres.in/api", "/register", "", payLoad);

export default { GET, POST };
/** https://reqres.in/api/users?page=2 
    .query({pages:2})
 * 
*/
