import { generateUniqueEmail } from '../../support/utils';

let uniqueEmail;
let token;
describe('Magento User API Tests', () => {
    const baseUrl = 'https://magento.softwaretestingboard.com/rest/default/V1';
    
    it('should create a new customer', () => {
      uniqueEmail = generateUniqueEmail('validUser');
      const newCustomer = {
        "customer": {
        "email": uniqueEmail,
        "firstname": "Adrian",
        "lastname": "Pablo",
        "addresses": [{
        "defaultShipping": true,
        "defaultBilling": true,
        "firstname": "Jane",
        "lastname": "Doe",
        "region": {
        "regionCode": "NY",
        "region": "New York",
        "regionId":43
        },
        "postcode": "10755",
        "street": ["123 Oak Ave"],
        "city": "Purchase",
        "telephone": "512-555-1111",
        "countryId": "US"
        }]
        },
        "password": "@drianPablo"
        };
  
      cy.request('POST', `${baseUrl}/customers`, newCustomer).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('id');
        expect(response.body.email).to.eq(newCustomer.customer.email);
      });
    });
  
    it('should login a user', () => {
      const loginData = {
        username: uniqueEmail,
        password: '@drianPablo'
      };
  
      cy.request('POST', `${baseUrl}/integration/customer/token`, loginData).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.be.a('string');
        expect(response.body).to.match(/^[a-z0-9]{32}$/);
        token = response.body
      });
    });

    it('should fetch customer details', () => {
      cy.request({
        method: 'GET',
        url: `${baseUrl}/customers/me`,
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('email', uniqueEmail);
      });
    });
  });