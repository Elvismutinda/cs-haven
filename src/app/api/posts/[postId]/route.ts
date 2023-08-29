import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { PostValidator } from "@/lib/validators/post";
import * as z from "zod";

const routeContextSchema = z.object({
  params: z.object({
    postId: z.string(),
  }),
});

export async function DELETE(
  req: Request,
  context: z.infer<typeof routeContextSchema>
) {
  try {
    // Validate the route params
    const { params } = routeContextSchema.parse(context);

    // Check if the user is the owner of the post
    if (!(await verifyCurrentUserIsOwnerOfPost(params.postId))) {
      return new Response("Unauthorized", { status: 401 });
    }

    // Delete the post
    await db.post.delete({
      where: {
        id: params.postId as string,
      },
    });

    return new Response("OK");
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 });
    }

    return new Response("Could not delete post", { status: 500 });
  }
}

// export async function PATCH(
//   req: Request,
//   context: z.infer<typeof routeContextSchema>
// ) {
//   try {
//     // Validate the route params
//     const { params } = routeContextSchema.parse(context);

//     // Check if the user is the owner of the post
//     if (!(await verifyCurrentUserIsOwnerOfPost(params.postId))) {
//       return new Response("Unauthorized", { status: 401 });
//     }

//     // Get request body and validate it
//     const json = await req.json();
//     const body = PostValidator.parse(json);

//     // Update the post
//     await db.post.update({
//       where: {
//         id: params.postId,
//       },
//       data: {
//         title: body.title,
//         content: body.content,
//       },
//     });

//     return new Response("OK");
//   } catch (error) {
//     if (error instanceof z.ZodError) {
//       return new Response(JSON.stringify(error.issues), { status: 422 });
//     }

//     return new Response("Could not update post", { status: 500 });
//   }
// }

async function verifyCurrentUserIsOwnerOfPost(postId: string) {
  const session = await getAuthSession();
  const count = await db.post.count({
    where: {
      id: postId,
      authorId: session?.user.id,
    },
  });

  return count > 0;
}
