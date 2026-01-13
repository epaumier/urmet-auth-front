// import '../global.css';
import { AuthProvider } from "../contexts/AuthContext";

function App({ Component, pageProps }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <Component {...pageProps} />
        </AuthProvider>
      </body>
    </html>
  );
}

export default App;
