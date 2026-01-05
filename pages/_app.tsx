import type { AppProps } from "next/app";
import "../global.css";
import NavigationMenu from "../components/NavigationMenu";
import UserTypeSelector from "../components/UserTypeSelector";
import { AuthProvider, useAuth } from "../contexts/AuthContext";

function AppContent({ Component, pageProps }: AppProps) {
  const { isLoading, logout, userInfo } = useAuth();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-lg">Chargement...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 mx-auto my-12 w-[1208px] min-h-[842px] font-['Open_Sans']">
      <UserTypeSelector />
      <div className="flex gap-6">
        <NavigationMenu onLogout={logout} userType={userInfo?.userType} />
        <div className="flex-1">
          <Component {...pageProps} />
        </div>
      </div>
    </div>
  );
}

function App(props: AppProps) {
  return (
    <AuthProvider>
      <AppContent {...props} />
    </AuthProvider>
  );
}

export default App;
