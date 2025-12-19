const MAGENTO_BASE_URL = "https://www.urmet.fr";

export type UserType = "particulierWithoutZeno" | "interneUrmet";

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface UserInfo {
  name: string;
  userType: UserType;
  contractType: "particulier" | "pro";
}

export interface AuthResponse {
  token: string;
  userInfo: UserInfo;
}

/**
 * Fake Magento API service
 * Returns mocked responses for authentication and user info
 */
export class MagentoService {
  private static async delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  /**
   * Get customer token from Magento API
   * POST /rest/default/V1/integration/customer/token
   */
  static async getCustomerToken(
    credentials: LoginCredentials
  ): Promise<string> {
    // Simulate network delay
    await this.delay(300);

    // Fake implementation - in production this would be a real API call
    // const response = await fetch(`${MAGENTO_BASE_URL}/rest/default/V1/integration/customer/token`, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(credentials),
    // });
    // const token = await response.json();
    // return token;

    // Mock response
    if (credentials.username && credentials.password) {
      return "fake-jwt-token-" + Date.now();
    }

    throw new Error("Invalid credentials");
  }

  /**
   * Get current customer information
   * GET /rest/default/V1/customers/me
   */
  static async getCustomerInfo(token: string): Promise<UserInfo> {
    // Simulate network delay
    await this.delay(300);

    // Fake implementation - in production this would be a real API call
    // const response = await fetch(`${MAGENTO_BASE_URL}/rest/default/V1/customers/me`, {
    //   method: "GET",
    //   headers: {
    //     "Authorization": `Bearer ${token}`,
    //     "Content-Type": "application/json",
    //   },
    // });
    // const userInfo = await response.json();
    // return userInfo;

    // Mock response
    if (token) {
      return {
        name: "Leïla",
        userType: "particulierWithoutZeno",
        contractType: "particulier",
      };
    }

    throw new Error("Invalid token");
  }

  /**
   * Authenticate user and get both token and user info
   * This is a convenience method that combines both API calls
   */
  static async authenticate(
    credentials: LoginCredentials
  ): Promise<AuthResponse> {
    const token = await this.getCustomerToken(credentials);
    const userInfo = await this.getCustomerInfo(token);

    return {
      token,
      userInfo,
    };
  }
}
