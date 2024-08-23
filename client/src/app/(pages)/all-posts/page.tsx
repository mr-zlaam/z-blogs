import { fetchAllPublicBlogs } from "@/helper/fetch/fetchBLogs";
import { BlogTypes } from "@/types";
import { Fragment } from "react";
import BlogDataOptimizer from "./comp/DataOptimizer";

async function AllPostPage() {
  const blogs = (await fetchAllPublicBlogs()) as BlogTypes;
  if (!blogs?.data || blogs?.data?.blogs.length === 0) {
    return (
      <div className="h-[60dvh] flex justify-center items-center">
        <h1 className="text-red-500">No Blog Post Found!</h1>
      </div>
    );
  }
  const blogPosts = blogs?.data?.blogs;
  return (
    <>
      <section>
        {blogPosts.map((post) => (
          <Fragment key={post.blogId}>
            <BlogDataOptimizer post={post} />
          </Fragment>
        ))}
      </section>
    </>
  );
}

export default AllPostPage;
