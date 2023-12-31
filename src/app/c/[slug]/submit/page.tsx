import Editor from "@/components/Editor";
import { Button } from "@/components/ui/Button";
import { db } from "@/lib/db";
import { notFound } from "next/navigation";

interface PageProps {
  params: {
    slug: string;
  };
}

const page = async ({ params }: PageProps) => {
  // console.log(props);

  const community = await db.community.findFirst({
    where: {
      name: params.slug,
    },
  });

  if (!community) {
    return notFound();
  }
  return (
    <div className="flex flex-col items-start gap-6">
      {/* Heading */}
      <div className="border-b border-gray-200 pb-5">
        <div className="-ml-2 -mt-2 flex flex-wrap items-baseline">
          <h3 className="ml-2 mt-2 text-base font-semibold leading-6 text-gray-900">
            Create post
          </h3>
          <p className="ml-2 mt-1 truncate text-sm text-gray-500">
            in c/{params.slug} {/* same as community.name */}
          </p>
        </div>
      </div>

      {/* Form */}

      <Editor communityId={community.id} />

      <div className="w-full flex justify-end">
        <Button type="submit" className="w-full" form="community-post-form">
          Post
        </Button>
      </div>
    </div>
  );
};

export default page;
