import React from "react";
import BlogCard from "./components/BlogCard";
import { blogPosts } from "@/utils/blogs";

const MainBlog = ({ onClick }) => {
  // Optionally filter or limit posts to create `latestPosts`
  const latestPosts = blogPosts.slice(0, 3); // Example: take the first 6 posts

  return (
    <div className="relative w-full h-fit min-h-[600px] flex flex-col gap-10 bg-[#FCFEF9] satoshi py-24">
      <div className="flex flex-col gap-6 md:w-[702px] w-[90%] h-fit justify-center text-center mx-auto">
        <h1 className="paytone md:text-[60px] text-[40px] leading-none text-[#011F0F] font-[400] capitalize">
          From Ideas to Invites: The Meetro Blog
        </h1>
        <p className="satoshi text-[16px] leading-6 text-[#8A9191] font-[500]">
          Tips, stories, and insights on making real-life connections, hosting
          memorable events, and navigating social life like a pro.
        </p>
      </div>
      <div className="md:flex justify-center grid md:gap-4 gap-8 w-full">
        {latestPosts.map((post) => (
          <BlogCard
            key={post.id}
            post={post}
            onClick={onClick}
            mobile="w-[90%] mx-auto"
          />
        ))}
      </div>
      <div className="absolute flex justify-between items-center w-full h-fit bg-transparent -top-[250px]">
        <div className="size-[345px] bg-[#AEFC40] rounded-full opacity-80 blur-[250px]"></div>
        <div className="size-[345px] bg-[#866AD2] rounded-full blur-[250px] opacity-80 mt-[100px]"></div>
        <div className="size-[345px] bg-[#077D8A] rounded-full blur-[250px] opacity-80"></div>
      </div>
    </div>
  );
};

export default MainBlog;