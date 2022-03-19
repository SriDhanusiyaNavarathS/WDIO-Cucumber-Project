Feature: Customer search
    @search
    Scenario Outline: <TestID>: Search external customers

        Given User get list of users from API
        When admin user login to nopcommerce site
        # When search users in customer list
        Then Verify if users exist in customers list

        Examples:
            | TestID   |
            | E2E_01 |