import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import * as z from "zod";

const routeContextSchema = z.object({
  params: z.object({
    name: z.string(),
  }),
});

export async function DELETE(
  req: Request,
  context: z.infer<typeof routeContextSchema>
) {
  try {
    const { params } = routeContextSchema.parse(context);

    // Check if user is owner of the community
    if (!(await verifyCurrentUserIsOwnerOfCommunity(params.name))) {
      return new Response("Unauthorized", { status: 401 });
    }

    // Delete community
    await db.community.delete({
      where: {
        name: params.name as string,
      },
    });

    return new Response("OK");
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 });
    }

    return new Response("Could not delete community", { status: 500 });
  }
}

async function verifyCurrentUserIsOwnerOfCommunity(communityId: string) {
  const session = await getAuthSession();
  const count = await db.community.count({
    where: {
      id: communityId,
      creatorId: session?.user.id,
    },
  });

  return count > 0;
}
