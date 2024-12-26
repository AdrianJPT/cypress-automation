# Cypress Automation Framework
A strong and robust Cypress automation framework designed to test the UI and API levels of the e-commerce platform Magento. This framework ensures the reliability and functionality of the platform through comprehensive automated testing

##  Features
- Page Object Model 
- API mock responses 
- Test data management using JSON files
- Configurable environments
- Execution environments 
- Multiple browsers 
- Configurable runtime parameters.
- Failure screenshots and recordings
- CI/CD with GitHub Action
- Automated tests (both API and UI) 

## 1 ) Quick Start
### Pre-Requisiteies
```bash
  node  v22.12.0
  npm  v10.9.0
```
### Set up the project
```bash
  git clone https://github.com/AdrianJPT/idelsoft-automation-cypress.git
  cd idelsoft-automation-cypress
```
### Install dependecies and cypress
```bash
  npm install
  npx cypress install
```

### Set Env Variables
Within "Cypress.config.js" file you can define at what baseUrl you want to point. For this particular framework, the parameter 'environment' is enable to get (local, dev, qa, stag or prod) and will trigger its respective value
```bash
  cypress run --env environment=qa 
```
## 2) Running Tests

### To run Test Locally
```bash
  npm run cypress:run:qa:chrome
```
| Note: You can see more shortcuts commands and the native command line in "package.json" 
``` json
"scripts": {
    "cypress:run:local:chrome": "cypress run --env environment=local --browser chrome",
    "cypress:run:local:firefox": "cypress run --env environment=local --browser firefox",
    "cypress:run:dev:chrome": "cypress run --env environment=dev --browser chrome",
    "cypress:run:dev:firefox": "cypress run --env environment=dev --browser firefox",
    "cypress:run:qa:chrome": "cypress run --env environment=qa --browser chrome",
    "cypress:run:qa:firefox": "cypress run --env environment=qa --browser firefox",
    "cypress:run:stag:chrome": "cypress run --env environment=stag --browser chrome",
    "cypress:run:stag:firefox": "cypress run --env environment=stag --browser firefox",
    "cypress:run:prod:chrome": "cypress run --env environment=prod --browser chrome",
    "cypress:run:prod:firefox": "cypress run --env environment=prod --browser firefox",
    "cypress:run:container": "docker-compose up --build",
    "cypress:report": "npx mochawesome-merge cypress/reports/*.json > cypress/reports/report.json && npx mochawesome-report-generator cypress/reports/report.json"
  }
```
### To run Tests within a Docker container
Build the docker image

```bash
  docker build .
```
Make docker compose up
```bash
  docker-compose up
```
| Note: You can handle Cypress env paramaters within docker.compose.yml in services.cypress-chrome.command
```bash
  command: "--env environment=qa --browser chrome"
```


## 3) Check Test Report
You can find the Mochawesome Report with screenshots and videos in:
```bash
  ./cypress/reports/index.html
```



## 4) CI/CD GH Action
In order to specify the environment where to run the test you can edit in .github/cypress.yml

```bash
  jobs:
    e2e-tests:
      runs-on: ubuntu-latest
      steps:
        - name: Run Cypress tests (stag - chrome)
          run: npm run cypress:run:stag:chrome  # Custom your parameter
```


## 5) Following Steps - Project Structure

```bash
cypress/
  e2e/              # Here is where .spec.cy.js are added
    api/
    ui/
  fixtures/         # Data Managment
    apiMocks/
  support/          # Some custom commands and utils
    commands.js
    component-index.html
    component.js
    e2e.js
    pageObjects/    # POM design pattern .js or .page.js files
    utils.js
cypress.config.js   # config env variables and parameters for Cypress
docker-compose.yml
```
