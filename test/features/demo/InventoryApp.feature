Feature: Inventory
    @Inventory
    Scenario Outline: <TestID>: Interacting with multiple elements

        #Given As a standard user I login to inventory web app
        Given Login into inventory web app
            # | UserType | Username                |
            # | stdUser  | standard_user           |
            # | probuser | problem_user            |
            # | perfUser | performance_glitch_user |
        # When Inventory page should list <NoOfProducts>
        # Then Validate all products have valid price

        Examples:
            | TestID   | NoOfProducts |
            | Inven_01 | 6            |