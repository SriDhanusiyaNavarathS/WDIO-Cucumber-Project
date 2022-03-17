import {config as baseconfig} from "../wdio.conf"
export const config = Object.assign(baseconfig,{
    //All test env specific key val pairs
    environment: "TEST",
    sauceDemoUrl: "https://www.saucedemo.com",
    DemoUrl: "https://www.google.com",
    reqresinBaseURL: "https://reqres.in",
    nopCommerceLoginURL:"https://admin-demo.nopcommerce.com/login",
    nopCommerceBaseURL:"https://admin-demo.nopcommerce.com"

})