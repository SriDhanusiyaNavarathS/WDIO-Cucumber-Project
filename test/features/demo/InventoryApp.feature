Feature: Inventory
    @Inventory
    Scenario Outline: Interacting with multiple elements
        Given Login into inventory web app
        When Inventory page should list <NoOfProducts>
        Then Validate all products have valid price

        Examples:
            | TestID   | NoOfProducts |
            | Inven_01 | 6            |