import StaffOrderHistory from "../../../components/staff/StaffOrderHistory";

export default function KitchenHistoryPage() {
  return (
    <StaffOrderHistory
      title="Order history — Kitchen"
      backHref="/kitchen"
      roleGate="kitchen"
      dashboardLabel="Kitchen dashboard"
    />
  );
}
