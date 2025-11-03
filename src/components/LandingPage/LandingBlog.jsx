import React from "react";
import CtaButton from "../Layout-conponents/CtaButton";
import BlogCard from "./components/BlogCard";
import { blogPosts } from "@/utils/blogs";
import Gradient from "../Layout-conponents/Gradient";
import { Link } from "react-router";

const latestPosts = blogPosts.slice(0, 3);

const LandingBlog = () => {
  return (
    <div className="bg-[#F0F0F0] relative overflow-hidden">
      <div className="flex flex-col py-15 mx-auto max-w-[1312px] px-4 gap-15 relative justify-center items-center w-full overflow-hidden">
        <div className="flex flex-col gap-12 w-full justify-center text-center">
          <div className="grid max-w-[702px] gap-6 text-center mx-auto">
            <h1 className="paytone lg:text-[60px] text-4xl leading-none text-[#8A9191] font-[400] capitalize">
              from ideas to invites: <br />
              <span className="text-[#001010]">the meetro blog</span>
            </h1>
            <p className="satoshi text-[16px] leading-6 text-[#8A9191] font-[700]">
              Tips, stories, and insights on making real-life connections,
              hosting memorable events, and navigating social life like a pro.
            </p>
          </div>
          <div className="flex justify-center">
            <Link to="/blog">
              <CtaButton name="read our blog" />
            </Link>
          </div>

          {/* Horizontal Scroll Container */}
          <div className="flex gap-4 w-full overflow-x-auto pb-4 scrollbar-hide mr-6 justify-start lg:justify-center">
            {latestPosts.map(post => (
              <div key={post.id} className="flex-shrink-0">
                <BlogCard post={post} mobile="w-[330px]" />
              </div>
            ))}
          </div>
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

export default LandingBlog;
