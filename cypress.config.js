const { defineConfig } = require("cypress");

module.exports = defineConfig({
  defaultCommandTimeout: 10000,
  retries: 3,
  e2e: {
    video: true,
    screenshotOnRunFailure: true,
    setupNodeEvents(on, config) {
      // implement node event listeners here
      const envName = config.env['environment']; 
      const envType = config.env[envName] || config.env.dev;
      
      if (!envType) {
        throw new Error(
          `El entorno "${envName}" no es válido. Por favor, usa: dev, qa, prod.`
        );
      }

      config.baseUrl = envType.baseUrl;
      config.env.apiUrl = envType.apiUrl;

      if (envName === "qa") {
        config.defaultCommandTimeout = 15000; // Aumenta el timeout en QA
        config.video = false; // Desactiva video en QA
      }

      return config;
    },
    env: {
      local: {
        baseUrl: "http://localhost:1010/path", // Localhost
      },
      dev:{
        baseUrl: "https://dev.magento.softwaretestingboard.com",
        apiUrl: "",
        browser: 'chrome',
      },
      qa:{
        baseUrl: "https://magento.softwaretestingboard.com",
        apiUrl: "",
        browser: 'chrome',

      },
      prod:{
        baseUrl: "https://magento.softwaretestingboard.com",
        apiUrl: "",
        browser: 'chrome',

      }
    }
  },

  component: {
    devServer: {
      framework: "create-react-app",
      bundler: "webpack",
    },
  },
});
