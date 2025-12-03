import { AuthProvider } from "./contexts/AuthContext";
import { AppRouter } from "./router";

/**
 * GRIMOIRE — Horror writing platform
 * Write, read, and share tales of terror
 */
export default function App() {
  return (
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  );
}
