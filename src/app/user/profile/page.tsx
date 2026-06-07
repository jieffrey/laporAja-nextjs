import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import ProfileView from "@/components/common-ui/ProfileView";

export default async function UserProfilePage() {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "user") {
    redirect("/auth/login");
  }

  return <ProfileView />;
}

