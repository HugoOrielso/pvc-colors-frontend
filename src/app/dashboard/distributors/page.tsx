import { DistributorList } from "@/components/distributors/DistributorsList";

export const metadata = {
  title: "Distribuidores autorizados",
  description:
    "Administra y supervisa los distribuidores autorizados de PVC Colors desde el panel administrativo.",
};

export default function Page() {
  return <DistributorList />;
}