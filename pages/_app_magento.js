// Inline all dependencies to avoid imports

// MagentoService
const MagentoService = {
  delay: function(ms) {
    return new Promise(function(resolve) { setTimeout(resolve, ms); });
  },

  getCustomerToken: async function(credentials) {
    await this.delay(300);
    if (credentials.username && credentials.password) {
      return 'fake-jwt-token-' + Date.now();
    }
    throw new Error('Invalid credentials');
  },

  getCustomerInfo: async function(token) {
    await this.delay(300);
    if (token) {
      return {
        name: 'Leïla',
        userType: 'particulierWithoutZeno',
        contractType: 'particulier'
      };
    }
    throw new Error('Invalid token');
  },

  authenticate: async function(credentials) {
    const token = await this.getCustomerToken(credentials);
    const userInfo = await this.getCustomerInfo(token);
    return { token, userInfo };
  }
};

// Data loader placeholder (returns mock data)
async function loadDataForUserType(userType) {
  await MagentoService.delay(200);
  return {
    userInfo: { contractType: 'particulier' }
  };
}

// AuthContext
const AuthContext = React.createContext(undefined);

function AuthProvider({ children }) {
  const [userInfo, setUserInfo] = React.useState(null);
  const [token, setToken] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [data, setData] = React.useState(null);

  const loadUserData = async function(userType, currentUserInfo) {
    const userData = await loadDataForUserType(userType);
    setData(userData);
    if (currentUserInfo && userData.userInfo) {
      setUserInfo({
        ...currentUserInfo,
        contractType: userData.userInfo.contractType
      });
    }
  };

  React.useEffect(function() {
    const authenticateUser = async function() {
      try {
        const authResponse = await MagentoService.authenticate({
          username: 'leila@example.com',
          password: 'password123'
        });
        setToken(authResponse.token);
        await loadUserData(authResponse.userInfo.userType, authResponse.userInfo);
      } catch (error) {
        console.error('Authentication failed:', error);
        setUserInfo(null);
        setToken(null);
      } finally {
        setIsLoading(false);
      }
    };
    authenticateUser();
  }, []);

  const switchUserType = async function(userType) {
    setIsLoading(true);
    try {
      const updatedUserInfo = userInfo ? { ...userInfo, userType } : null;
      if (updatedUserInfo) {
        await loadUserData(userType, updatedUserInfo);
      }
    } catch (error) {
      console.error('Failed to switch user type:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = function() {
    setUserInfo(null);
    setToken(null);
  };

  const value = {
    userInfo,
    token,
    isLoading,
    isAuthenticated: !!token && !!userInfo,
    data,
    switchUserType,
    logout
  };

  return React.createElement(AuthContext.Provider, { value: value }, children);
}

function useAuth() {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

// LogoutIcon component
function LogoutIcon() {
  return React.createElement(
    'svg',
    {
      width: 24,
      height: 24,
      viewBox: '0 0 24 24',
      fill: 'none',
      xmlns: 'http://www.w3.org/2000/svg'
    },
    React.createElement('path', {
      d: 'M10.3 7.7C9.91 8.09 9.91 8.71 10.3 9.1L12.2 11H3C2.45 11 2 11.45 2 12C2 12.55 2.45 13 3 13H12.2L10.3 14.9C9.91 15.29 9.91 15.91 10.3 16.3C10.69 16.69 11.31 16.69 11.7 16.3L15.29 12.71C15.68 12.32 15.68 11.69 15.29 11.3L11.7 7.7C11.31 7.31 10.69 7.31 10.3 7.7ZM20 19H13C12.45 19 12 19.45 12 20C12 20.55 12.45 21 13 21H20C21.1 21 22 20.1 22 19V5C22 3.9 21.1 3 20 3H13C12.45 3 12 3.45 12 4C12 4.55 12.45 5 13 5H20V19Z',
      fill: '#404040'
    })
  );
}

// NavigationMenu component
function NavigationMenu({ onLogout, userType }) {
  return React.createElement(
    'div',
    { className: 'flex flex-col justify-between p-5 border border-gray-300 rounded-lg w-60 h-[564px]' },
    React.createElement(
      'div',
      null,
      React.createElement(
        'nav',
        { className: 'flex flex-col gap-3 text-sm' },
        React.createElement(
          'a',
          {
            href: '/',
            className: 'hover:underline text-[13px]'
          },
          'Tableau de Bord'
        ),
        userType === 'InstallateurPremiumWithSite' && React.createElement(
          'a',
          {
            href: '/premium',
            className: 'hover:underline text-[13px]'
          },
          'Premium'
        ),
        React.createElement(
          'a',
          {
            href: '/orders',
            className: 'hover:underline text-[13px]'
          },
          'Commandes et retours'
        ),
        userType === 'InstallateurPremiumWithSite' && React.createElement(
          'a',
          {
            href: '/patrimoine',
            className: 'hover:underline text-[13px]'
          },
          'Patrimoine'
        ),
        userType === 'InstallateurPremiumWithSite' && React.createElement(
          'a',
          {
            href: '/subscriptions',
            className: 'hover:underline text-[13px]'
          },
          'Souscriptions et contrats'
        ),
        React.createElement(
          'a',
          {
            href: '/account',
            className: 'hover:underline text-[13px]'
          },
          'Compte'
        )
      )
    ),
    React.createElement(
      'div',
      null,
      React.createElement(
        'button',
        {
          className: 'flex items-center gap-3 hover:opacity-70 transition-opacity',
          onClick: onLogout
        },
        React.createElement(LogoutIcon, null),
        React.createElement('span', { className: 'font-normal text-sm' }, 'Se déconnecter')
      )
    )
  );
}

// UserTypeSelector component
function UserTypeSelector() {
  const { userInfo, switchUserType, isLoading } = useAuth();

  const handleChange = async function(event) {
    const newUserType = event.target.value;
    await switchUserType(newUserType);
  };

  return React.createElement(
    'div',
    { className: 'flex gap-6 p-4 bg-gray-50 border border-gray-300 rounded-lg' },
    React.createElement('span', { className: 'font-semibold text-sm' }, 'Type d\'utilisateur:'),
    React.createElement(
      'div',
      { className: 'flex gap-4' },
      React.createElement(
        'label',
        { className: 'flex items-center gap-2 cursor-pointer' },
        React.createElement('input', {
          type: 'radio',
          name: 'userType',
          value: 'particulierWithoutZeno',
          checked: userInfo?.userType === 'particulierWithoutZeno',
          onChange: handleChange,
          disabled: isLoading,
          className: 'w-4 h-4 cursor-pointer'
        }),
        React.createElement('span', { className: 'text-sm' }, 'Particulier Sans Contrat Zeno')
      ),
      React.createElement(
        'label',
        { className: 'flex items-center gap-2 cursor-pointer' },
        React.createElement('input', {
          type: 'radio',
          name: 'userType',
          value: 'interneUrmet',
          checked: userInfo?.userType === 'interneUrmet',
          onChange: handleChange,
          disabled: isLoading,
          className: 'w-4 h-4 cursor-pointer'
        }),
        React.createElement('span', { className: 'text-sm' }, 'Interne URMET/SAV')
      ),
      React.createElement(
        'label',
        { className: 'flex items-center gap-2 cursor-pointer' },
        React.createElement('input', {
          type: 'radio',
          name: 'userType',
          value: 'InstallateurPremiumWithSite',
          checked: userInfo?.userType === 'InstallateurPremiumWithSite',
          onChange: handleChange,
          disabled: isLoading,
          className: 'w-4 h-4 cursor-pointer'
        }),
        React.createElement('span', { className: 'text-sm' }, 'Installateur Premium avec site')
      ),
      React.createElement(
        'label',
        { className: 'flex items-center gap-2 cursor-pointer' },
        React.createElement('input', {
          type: 'radio',
          name: 'userType',
          value: 'installateurNonPremiumSansSite',
          checked: userInfo?.userType === 'installateurNonPremiumSansSite',
          onChange: handleChange,
          disabled: isLoading,
          className: 'w-4 h-4 cursor-pointer'
        }),
        React.createElement('span', { className: 'text-sm' }, 'Installateur non premium sans site')
      ),
      React.createElement(
        'label',
        { className: 'flex items-center gap-2 cursor-pointer' },
        React.createElement('input', {
          type: 'radio',
          name: 'userType',
          value: 'promoteurBe',
          checked: userInfo?.userType === 'promoteurBe',
          onChange: handleChange,
          disabled: isLoading,
          className: 'w-4 h-4 cursor-pointer'
        }),
        React.createElement('span', { className: 'text-sm' }, 'Promoteur BE')
      )
    )
  );
}

// AppContent component
function AppContent({ Component, pageProps }) {
  const { isLoading, logout, userInfo } = useAuth();

  if (isLoading) {
    return React.createElement(
      'div',
      { className: 'flex items-center justify-center min-h-screen' },
      React.createElement(
        'div',
        { className: 'text-center' },
        React.createElement('p', { className: 'text-lg' }, 'Chargement...')
      )
    );
  }

  return React.createElement(
    'div',
    { className: "flex flex-col gap-6 mx-auto my-12 w-[1208px] min-h-[842px] font-['Open_Sans']" },
    React.createElement(UserTypeSelector, null),
    React.createElement(
      'div',
      { className: 'flex gap-6' },
      React.createElement(NavigationMenu, { onLogout: logout, userType: userInfo?.userType }),
      React.createElement(
        'div',
        { className: 'flex-1' },
        React.createElement(Component, pageProps)
      )
    )
  );
}

// App component
function App(props) {
  return React.createElement(
    AuthProvider,
    null,
    React.createElement(AppContent, props)
  );
}