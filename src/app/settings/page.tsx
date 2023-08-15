import SectionHeading from "@/components/SectionHeading";
import SectionShell from "@/components/SectionShell";
import UserNameForm from "@/components/UserNameForm";
import { authOptions, getAuthSession } from "@/lib/auth";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Settings",
  description: "Manage your settings",
};

const page = async () => {
  const session = await getAuthSession();

  if (!session?.user) {
    redirect(authOptions?.pages?.signIn || "/sign-in");
  }

  return (
    <div className="max-w-4xl mx-auto py-12">
      <SectionShell>
        <SectionHeading
          heading="Settings"
          text="Manage your account settings here."
        />
        <div className="grid gap-10">
          <UserNameForm
            user={{
              id: session.user.id,
              username: session.user.username || "",
            }}
          />
        </div>
      </SectionShell>
    </div>
  );
};

export default page;
