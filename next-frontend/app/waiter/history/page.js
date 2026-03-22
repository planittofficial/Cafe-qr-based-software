import StaffOrderHistory from "../../../components/staff/StaffOrderHistory";

export default function WaiterHistoryPage() {
  return (
    <StaffOrderHistory
      title="Order history — Waiter"
      backHref="/waiter"
      roleGate="staff"
      dashboardLabel="Waiter dashboard"
    />
  );
}
