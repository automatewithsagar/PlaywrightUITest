  // @ts-check
  import { chromium, defineConfig, devices } from '@playwright/test';
  import { permission } from 'process';

  /**
   * @see https://playwright.dev/docs/test-configuration
   */
  const config = ({
    testDir: './tests', //to run the all test cases we need this directory
    timeout: 40 * 1000, //this is global level timeout for each test and step, be default its 30secs and we overrided it to 40 secs
    expect: {
      timeout: 5 * 1000, //this is assertion level timeout for specific case
    },
    //retries:1, //rerun one time once test case will fail

    //reporter: 'html', //to get the report in html after running test cases
    reporter: [['line'], ['allure-playwright']],


    use: { //this is use for giving browser in which browser you want to run your test case
      browserName: 'chromium',
      headless: false,
      screenshot: 'on', //to take screenshot -->put "only-on-failure" to take screenshot when test case fail
      //trace: 'on', //take screenshot/logs and zip file of each and every step of each test case
      trace: 'retain-on-failure', //logs of only failed testcase- recommended   
      ignoreHttpsErrors:true, //handling ssl certification errors
      //permissions:['geolocation'], //allowing location whenever asked for location permission
      //viewport: {width:720,height:720}, //set browser for specific window size to do the reponsive testing
      video:'on-first-retry' ,//making video on retrying test for the first time
      //...devices['iPhone 12 Pro'] //runing test cases on iphone 12 pro screen
    },

  })

  module.exports = config //exporting all configurations so that it is avaliable across whole project

