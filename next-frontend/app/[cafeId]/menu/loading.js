import { AppLoading } from "../../../components/AppLoading";

export default function MenuRouteLoading() {
  return (
    <div className="customer-shell menu-page-surface min-h-screen">
      <div className="mx-auto flex min-h-screen max-w-md items-center justify-center px-4">
        <AppLoading label="Opening menu" className="min-h-[50vh]" />
      </div>
    </div>
  );
}
