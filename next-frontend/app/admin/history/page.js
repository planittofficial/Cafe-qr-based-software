import StaffOrderHistory from "../../../components/staff/StaffOrderHistory";

export default function AdminHistoryPage() {
  return (
    <StaffOrderHistory
      title="Order history — Reception"
      backHref="/admin/menu"
      roleGate="cafe_admin"
      dashboardLabel="Menu console"
    />
  );
}
