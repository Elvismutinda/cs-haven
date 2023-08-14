import CardSkeleton from "@/components/CardSkeleton";
import SectionHeading from "@/components/SectionHeading";
import SectionShell from "@/components/SectionShell";

const DonationLoading = () => {
  return (
    <SectionShell>
      <SectionHeading
        heading="Donate to Creator"
        text="If you're feeling very generous today, throw a coin or two my way. Thanks."
      />
      <div className="grid gap-10">
        <CardSkeleton />
      </div>
    </SectionShell>
  );
};

export default DonationLoading;
