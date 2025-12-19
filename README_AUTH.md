# Authentication System

This document describes the authentication system implemented in the Urmet application.

## Overview

The application uses a fake Magento API authentication flow that executes before the app mounts. This ensures that user information and authentication tokens are available throughout the application.

## Architecture

### 1. Data Structure

Data has been organized into separate files based on user type:

- **`dummyData/particulierWithoutZeno.ts`** - Data for standard users without Zeno service
- **`dummyData/interneUrmet.ts`** - Data for internal Urmet users
- **`dummy_data.ts`** - Re-exports from `particulierWithoutZeno.ts` for backward compatibility

### 2. Authentication Service

**Location:** `services/magento.ts`

The `MagentoService` class provides fake API calls to simulate Magento authentication:

#### API Endpoints

1. **Get Customer Token**
   - Path: `/rest/default/V1/integration/customer/token`
   - Method: POST
   - Body: `{ username: string, password: string }`
   - Returns: JWT token string

2. **Get Customer Info**
   - Path: `/rest/default/V1/customers/me`
   - Method: GET
   - Headers: `Authorization: Bearer <token>`
   - Returns: User information object

```typescript
interface UserInfo {
  name: string;
  userType: "particulierWithoutZeno" | "interneUrmet";
}
```

#### Usage Example

```typescript
import { MagentoService } from "../services/magento";

// Get token
const token = await MagentoService.getCustomerToken({
  username: "user@example.com",
  password: "password123"
});

// Get user info
const userInfo = await MagentoService.getCustomerInfo(token);

// Or use the convenience method
const authResponse = await MagentoService.authenticate({
  username: "user@example.com",
  password: "password123"
});
// Returns: { token: string, userInfo: UserInfo }
```

### 3. Authentication Context

**Location:** `contexts/AuthContext.tsx`

Provides React context for authentication state across the application.

#### Context Interface

```typescript
interface AuthContextType {
  userInfo: UserInfo | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  logout: () => void;
}
```

#### Usage in Components

```typescript
import { useAuth } from "../contexts/AuthContext";

function MyComponent() {
  const { userInfo, token, isLoading, isAuthenticated, logout } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Welcome {userInfo?.name}!</h1>
      <p>User type: {userInfo?.userType}</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
```

### 4. App Integration

**Location:** `pages/_app.tsx`

The authentication provider wraps the entire application and handles authentication before mounting:

1. `AuthProvider` is the top-level component
2. Authentication happens in `useEffect` on mount
3. Loading state is displayed while authenticating
4. Once authenticated, the app renders normally

## Current Implementation

### Mock Data

The current implementation uses hardcoded credentials:

```typescript
// In contexts/AuthContext.tsx
const authResponse = await MagentoService.authenticate({
  username: "leila@example.com",
  password: "password123",
});
```

**Current user:**
- Name: Leïla
- Type: particulierWithoutZeno

### Simulated Network Delays

API calls include simulated network delays (300ms) to mimic real-world conditions.

## Future Enhancements

### Production Implementation

To connect to a real Magento API:

1. **Uncomment the actual API calls** in `services/magento.ts`
2. **Add environment variables** for the API base URL:
   ```
   NEXT_PUBLIC_MAGENTO_BASE_URL=https://www.urmet.fr
   ```
3. **Implement a login page** instead of hardcoded credentials
4. **Add token persistence** using localStorage or cookies
5. **Implement token refresh** logic
6. **Add error handling** for network failures and invalid credentials

### Example Production Code

```typescript
// services/magento.ts
static async getCustomerToken(credentials: LoginCredentials): Promise<string> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_MAGENTO_BASE_URL}/rest/default/V1/integration/customer/token`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    }
  );

  if (!response.ok) {
    throw new Error("Authentication failed");
  }

  return await response.json();
}
```

## Conditional Rendering Based on User Type

Components can conditionally render based on user type:

```typescript
import { useAuth } from "../contexts/AuthContext";

function MyComponent() {
  const { userInfo } = useAuth();

  if (userInfo?.userType === "particulierWithoutZeno") {
    return <ParticulierView />;
  }

  if (userInfo?.userType === "interneUrmet") {
    return <InternalView />;
  }

  return null;
}
```

## Files Modified

- Created `dummyData/particulierWithoutZeno.ts`
- Created `dummyData/interneUrmet.ts`
- Modified `dummy_data.ts` to re-export from particulierWithoutZeno
- Created `services/magento.ts`
- Created `contexts/AuthContext.tsx`
- Modified `pages/_app.tsx` to include AuthProvider
- Modified `pages/index.tsx` to use userInfo from context

## Testing

Currently, the app will:
1. Show "Chargement..." while authenticating (600ms total with both API calls)
2. Display "Bonjour Leïla," on the home page
3. Make userInfo and token available throughout the app via useAuth hook
