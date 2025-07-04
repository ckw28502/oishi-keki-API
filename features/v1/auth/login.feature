Feature: User login

    Scenario: Successful login with valid credentials
        Given the user has a valid email and password for <role>
        When the user attempts to log in
        Then the user should receive a success response
        And the response should contain a JWT token with <role> permissions

        Examples:
            | role     |
            | owner    | 
            | employee |
    Scenario: Failed login with invalid credentials
        Given the user has an invalid email or password
        When the user attempts to log in
        Then the user should receive an error response
        And the respose should indicate that the credentials are invalid
    
    Scenario: Login with missing credentials
        Given the user does not provide an email or password
        When the user attempts to log in
        Then the user should receive an error response
        And the response should indicate that both email and password are required