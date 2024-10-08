"use client";
import PageLoader from "@/_subComponents/pageLoader/PageLoader";
import BlogDataOptimizer from "@/app/(pages)/all-posts/comp/DataOptimizer";
import { PAGE } from "@/constants";
import { fetchSearchPublicBlogs } from "@/helper/fetch/fetchData";
import { useLoading } from "@/hooks/useLoading";
import { BlogDataTypes, BlogTypes } from "@/types";
import { useRouter, useSearchParams } from "next/navigation";
import { Fragment, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

function Search() {
  const { ref, inView } = useInView({});
  const [blogs, setBlogs] = useState<BlogDataTypes[]>([]);
  const [page, setPage] = useState(1);
  const { isLoading, startLoading, stopLoading } = useLoading();
  const [hasMore, setHasMore] = useState(true);
  const searchParams = useSearchParams();
  const query = searchParams.get("q");
  const router = useRouter();

  useEffect(() => {
    const loadBlogs = async () => {
      if (!inView || isLoading || !hasMore) return;
      startLoading();

      try {
        if (!query) {
          router.push("/home");
          return;
        }

        const blogPost: BlogTypes = await fetchSearchPublicBlogs(query, page);
        const fetchedBlogs = blogPost.data?.blogs;

        if (fetchedBlogs && fetchedBlogs.length > 0) {
          setBlogs((prevBlogs) => [...prevBlogs, ...fetchedBlogs]);
          setPage((prevPage) => prevPage + 1);
          setHasMore(blogPost?.metaData?.pagination?.hasNextPage);
        } else {
          setHasMore(false);
        }
      } catch (error) {
        console.error("Failed to load more blogs", error);
      } finally {
        stopLoading();
      }
    };

    loadBlogs();
  }, [
    inView,
    query,
    hasMore,
    isLoading,
    router,
    startLoading,
    stopLoading,
    page,
  ]);

  return (
    <>
      <section>
        <h1 className="text-2xl font-bold">
          Search Result for:-
          <span className="text-foreground/60 mx-4 text-2xl">
            &quot;{query}&quot;
          </span>
        </h1>
        <div className="h-10">
          {blogs.length === 0 && !isLoading && (
            <p className="h-10 text-red-500 font-bold text-xl text-center my-4 fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%]">
              !~&nbsp;&nbsp;No result found for &quot;{query}&quot;
            </p>
          )}
        </div>
        {blogs.map((post) => (
          <Fragment key={post.blogId}>
            <BlogDataOptimizer post={post} />
          </Fragment>
        ))}
      </section>

      {hasMore && (
        <div ref={ref} className="h-10">
          {isLoading && (
            <div className="flex justify-center h-[55dvh] items-center">
              <PageLoader />
            </div>
          )}
        </div>
      )}
      {!hasMore && !isLoading && (
        <p className="h-10 text-foreground/60 font-bold text-sm text-center my-4">
          {blogs.length !== 0 && "No more posts for now"}
        </p>
      )}
    </>
  );
}

export default Search;
