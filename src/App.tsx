import { HelmetProvider } from 'react-helmet-async';
import { I18nProvider } from "@i18n/I18nProvider";
import AppRoutes from "@routes/routes";

function App() {
  return (
    <HelmetProvider>
      <I18nProvider>
        <AppRoutes />
      </I18nProvider>
    </HelmetProvider>
  );
}

export default App;