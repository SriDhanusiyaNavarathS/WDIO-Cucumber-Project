import {config as baseconfig} from "../wdio.conf"
export const config = Object.assign(baseconfig,{
    //All test env specific key val pairs
    environment: "UAT",
    sauceDemoUrl: "https://www.saucedemo.com"
})