export const config = {
    base_url : 'https://admin.us01.dx.commercecloud.salesforce.com/api/v1/realms',
    realm : {
      id: process.env.REALM_ID
    },
    seed: {
      from: '2023-01-01',
      to: '2023-03-27'
    }
  };
  