Feature: Demo
    @demo
    Scenario Outline: Run first demo feature
        Given Google page is opened
        When search with <searchItem>
        Then click on first search result
        Then URL should match <ExpectedURL>
        
        Examples:
            | TestID  | searchItem | ExpectedURL           |
            | Demo_01 | WDIO       | https://webdriver.io/ |