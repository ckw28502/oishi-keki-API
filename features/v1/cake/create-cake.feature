Feature: Create cake object

    Scenario: Unauthorized because token is not in header
        Given the user have no access token
        When the user send create cake request
        Then the response status should be 401
        And the response message should be "Authorization header is missing or malformed!"