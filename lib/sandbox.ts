import { config } from '@/config/sandbox';

export class SandboxAPI {
  token: string;
  base_url: string;

  constructor(
    token: string,
  ) {
    this.token = token;
    this.base_url = config.base_url
  }

  async getSandboxes() {
    const url = `${this.base_url}/sandboxes`;

    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.token}`,
      },
    });

    const { data: data } = await response.json();
    

    return data;
  }
  
  async getSandboxDetail(id) {
    const url = `${this.base_url}/sandboxes/${id}`;

    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.token}`,
      },
    });

    const { data: data } = await response.json();
    

    return data;
  }

}
