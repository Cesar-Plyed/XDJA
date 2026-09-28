import { I18nProvider } from "@i18n/I18nProvider";
import AppRoutes from "@routes/routes";

function App() {
  return (
    <I18nProvider>
      <AppRoutes />
    </I18nProvider>
  );
}

export default App;