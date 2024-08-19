import { Link } from "@/components/ui/link";
import { Separator } from "@/components/ui/separator";
import { BlogDataTypes } from "@/types";
import { marked } from "marked";
import { getPlaiceholder } from "plaiceholder";
import BlurImage from "./BlurImage";
import moment from "moment";
interface blogPostProps {
  post: BlogDataTypes;
}

async function BlogRenderer({ post }: blogPostProps) {
  const buffer = await fetch(post?.blogThumbnail).then(async (res) =>
    Buffer.from(await res.arrayBuffer())
  );
  const { base64 } = await getPlaiceholder(buffer);
  const renderedHtml = marked(post.blogDescription) as string;
  return (
    <section className="px-2 ">
      <div className="relative  md:h-fit py-3 h-[300px] rounded-md flex justify-start  items-start  overflow-hidden ">
        <Link href={`#`}>
          <BlurImage
            src={post.blogThumbnail}
            alt={post.blogTitle}
            base64={base64}
            width={500}
            height={200}
            className="rounded"
          />
        </Link>
        <div>
          <h1 className="mx-4 my-2">
            <Link href={`#`} className="text-foreground">
              {post.blogTitle}
            </Link>
          </h1>
          <span className="text-sm  mx-4 mb-4 text-green-600">
            Published : {moment(post.createdAt).format("MMMM Do, YYYY")}
          </span>

          <span
            dangerouslySetInnerHTML={{
              __html:
                renderedHtml.length === 0
                  ? "Write something...."
                  : renderedHtml,
            }}
            className="text-foreground/70 my-2 text-sm mx-4 truncate	line-clamp-4 text-clip  overflow-hidden"
          ></span>
        </div>
      </div>
      <Separator />
    </section>
  );
}

export default BlogRenderer;
