import 'dotenv/config'

export type ProjectConfig = typeof config

export const config = {
  base_url: 'https://admin.dx.commercecloud.salesforce.com/api/v1',
  realm: {
    id: process.env.REALM_ID,
  },
  seed: {
    from: '2024-01-01',
    to: '2024-02-27',
  },
}
