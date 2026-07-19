import { AppProviders } from '@/app/providers';
import { ErrorBoundary } from '@/shared/components/ErrorBoundary';
import { DashboardLayout } from '@/layouts/DashboardLayout';

function App() {
  return (
    <ErrorBoundary>
      <AppProviders>
        <DashboardLayout />
      </AppProviders>
    </ErrorBoundary>
  );
}

export default App;
