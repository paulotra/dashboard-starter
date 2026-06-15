import StatsCard from '@/components/StatsCard'
import RecentOrdersTable from '@/components/RecentOrdersTable'

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-3">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard title="Orders today" value={12} delta="+3" subtitle="vs. yesterday" />
        <StatsCard
          title="Revenue this week"
          value="€ 2.840"
          delta="+18%"
          subtitle="vs. last week"
        />
        <StatsCard title="Active customers" value={34} delta="6" subtitle="ordered this week" />
        <StatsCard
          title="Pending"
          value={4}
          subtitle={<span className="text-secondary-500">Awaiting confirmation</span>}
        />
      </div>
      <RecentOrdersTable />
    </div>
  )
}
