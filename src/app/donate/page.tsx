import DonationForm from "@/components/DonationForm";
import SectionShell from "@/components/SectionShell";
import SectionHeading from "@/components/SectionHeading";
import { authOptions, getAuthSession } from "@/lib/auth";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Donate",
  description: "Donate to creator",
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
          heading="Donate to Creator"
          text="If you're feeling very generous today, throw a coin or two my way. Thanks."
        />
        <div className="grid gap-8">
          <DonationForm />
        </div>
      </SectionShell>
    </div>
  );
};

export default page;
