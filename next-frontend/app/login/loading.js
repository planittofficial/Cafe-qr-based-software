import { AppLoading } from "../../components/AppLoading";

export default function LoginLoading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-orange-50 via-amber-50 to-orange-100">
      <AppLoading label="Loading" className="min-h-[40vh]" />
    </div>
  );
}
