import CardSkeleton from "@/components/CardSkeleton";
import SectionHeading from "@/components/SectionHeading";
import SectionShell from "@/components/SectionShell";

const DonationLoading = () => {
  return (
    <SectionShell>
      <SectionHeading
        heading="Settings"
        text="Manage your account settings here."
      />
      <div className="grid gap-10">
        <CardSkeleton />
      </div>
    </SectionShell>
  );
};

export default DonationLoading;
