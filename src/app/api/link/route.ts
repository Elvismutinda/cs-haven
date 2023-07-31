import axios from "axios";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const href = url.searchParams.get("url");

  if (!href) {
    return new Response("Invalid href", { status: 400 });
  }

  const res = await axios.get(href);

  // Parsing the HTML using regular expressions
  const titleMatch = res.data.match(/<title>(.*?)<\/title>/);
  const title = titleMatch ? titleMatch[1] : "No title found";

  const descriptionMatch = res.data.match(
    /<meta name="description" content="(.*?)"/
  );
  const description = descriptionMatch
    ? descriptionMatch[1]
    : "No description found";

  const imageMatch = res.data.match(
    /<meta property="og:image" content="(.*?)"/
  );
  const imageUrl = imageMatch ? imageMatch[1] : "No image found";

  // Return the data as JSON (depends on the data format you want to use)
  return new Response(
    JSON.stringify({
      success: 1,
      meta: {
        title,
        description,
        image: {
          url: imageUrl,
        },
      },
    })
  );
}
