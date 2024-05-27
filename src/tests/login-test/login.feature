Feature: Login functionality

  @test
  Scenario: Verify elements visibility on login page
    Given I navigate to the login page
    Then I verify "Username" input field visibility
    And I verify "Password" input field visibility
    And I verify "Login" button visibility
    And I verify "Forgot Password" visibility

  Scenario: Login with valid credentials
    Given I navigate to the login page
    When I enter the username "sara.driftsense@gmail.com"
    And I enter the password "SARATOTAH99"
    And I click on the login button
    Then I should be redirected to the dashboard

  @fail
  Scenario: Login with invalid username
    Given I navigate to the login page
    When I log in with invalid username
    Then I should see an invalid username error message

  @fail
  Scenario: Login with invalid password
    Given I navigate to the login page
    When I log in with invalid password
    Then I should see an invalid password error message
