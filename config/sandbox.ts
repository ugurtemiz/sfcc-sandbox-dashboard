import 'dotenv/config'

export type ProjectConfig = typeof config

export const config = {
  base_url: 'https://admin.us01.dx.commercecloud.salesforce.com/api/v1',
  realm: {
    id: process.env.REALM_ID,
  },
  seed: {
    from: '2023-06-22',
    to: '2023-06-22',
  },
}
