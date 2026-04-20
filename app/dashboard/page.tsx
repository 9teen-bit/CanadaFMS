import { KpiCards } from '@/components/dashboard/KpiCards';
import { ChartsSection } from '@/components/dashboard/ChartsSection';
import { RecentReportsTable } from '@/components/dashboard/RecentReportsTable';

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      Dashboard Content

      {/* KPI Cards */}
      <KpiCards />

      {/* Charts Section */}
      <ChartsSection />

      {/* Recent Reports Table */}
      <RecentReportsTable />
    </div>
  );
}