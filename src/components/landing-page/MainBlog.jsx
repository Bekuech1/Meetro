import React from "react";
import BlogCard from "./components/BlogCard";
import Gradient from "../layout-components/Gradient";
import { blogPosts } from "@/utils/blogs";

const latestPosts = blogPosts.slice(0, 3);

const MainBlog = () => {
  return (
    <div className="relative w-full h-fit min-h-[600px] flex flex-col bg-[#F0F0F0] satoshi py-24">
      <div className="mx-auto max-w-[1312px] px-4">
        <div className="flex flex-col gap-6 max-w-[702px] h-fit justify-center mb-10 text-center mx-auto mt-6">
          <h1 className="paytone md:text-[60px] text-[40px] leading-none text-[#011F0F] font-[400] capitalize">
            From Ideas to Invites: The Meetro Blog
          </h1>
          <p className="satoshi text-[16px] leading-6 text-[#8A9191] font-[500]">
            Tips, stories, and insights on making real-life connections, hosting
            memorable events, and navigating social life like a pro.
          </p>
        </div>
        <div className="md:flex justify-center grid md:gap-4 gap-8 w-full">
          {latestPosts.map(post => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      </div>
      <div className="absolute flex justify-between items-center w-full h-fit -top-[250px] bg-transparent">
        {/* Left Ellipse */}
        <Gradient opacity="opacity-[15%]" />
        <Gradient
          className="mt-[100px]"
          opacity="opacity-[15%]"
          color="#866AD2"
        />
        <Gradient opacity="opacity-[15%]" color="#077D8A" />
      </div>
    </div>
  );
};

export default MainBlog;
