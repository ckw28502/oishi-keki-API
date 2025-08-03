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
        Then the response status should be 400
        And the response message should be "Nama pengguna atau kata sandi salah"
    
    Scenario: Login with missing credentials
        Given the username <username> and password <password>
        When the user attempts to log in
        Then the response status should be 400
        And the response message should be "<message>"

        Examples:
            | username        | password        | message                                                           |
            | does not exists | does not exists | Nama pengguna tidak boleh kosong!, Kata sandi tidak boleh kosong! |
            | exists          | does not exists | Kata sandi tidak boleh kosong!                                 |
            | does not exists | exists          | Nama pengguna tidak boleh kosong!                                    |