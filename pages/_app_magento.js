import '../global.css';
import NavigationMenu from '../components/NavigationMenu';
import UserTypeSelector from '../components/UserTypeSelector';
import { AuthProvider, useAuth } from '../contexts/AuthContext';

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

function App(props) {
  return React.createElement(
    AuthProvider,
    null,
    React.createElement(AppContent, props)
  );
}

export default App;