import React from "react";
import CtaButton from "../Layout-conponents/CtaButton";
import BlogCard from "./components/BlogCard";
import { blogPosts } from "@/utils/blogs";

const LandingBlog = ({ onClick }) => {
  const latestPosts = blogPosts.slice(0, 3);
  return (
    <div className="bg-[#F0F0F0] flex flex-col py-15 gap-15 h-fit relative justify-center items-center w-full">
      <div className="flex flex-col gap-12 w-full h-fit justify-center text-center">
        <div className="grid lg:w-[702px] w-[90%] h-fit gap-6 text-center mx-auto">
          <h1 className="paytone lg:text-[60px] text-4xl leading-none text-[#8A9191] font-[400] capitalize">
            from ideas to invites: <br />
            <span className="text-[#001010]">the meetro blog</span>
          </h1>
          <p className="satoshi text-[16px] leading-6 text-[#8A9191] font-[700]">
            Tips, stories, and insights on making real-life connections, hosting
            memorable events, and navigating social life like a pro.
          </p>
        </div>
        <div className="flex justify-center">
          <CtaButton name="read our blog" />
        </div>

        {/* Horizontal Scroll Container */}
        <div className="flex gap-4 w-full overflow-x-auto pb-4 px-4 scrollbar-hide mr-6 justify-start lg:justify-center">
          {latestPosts.map((post) => (
            <div key={post.id} className="flex-shrink-0">
              <BlogCard post={post} mobile="w-[330px]" onClick={onClick} />
            </div>
          ))}
        </div>
      </div>

      <div className="absolute flex justify-between items-center w-full h-fit -top-[250px] bg-transparent">
        {/* Left Ellipse */}
        <div className="size-[345px] bg-[#AEFC40] rounded-full opacity-80 blur-[250px]"></div>

        {/* Middle Ellipse */}
        <div className="size-[345px] bg-[#866AD2] rounded-full blur-[250px] opacity-80 mt-[100px]"></div>

        {/* Right Ellipse */}
        <div className="size-[345px] bg-[#077D8A] rounded-full blur-[250px] opacity-80"></div>
      </div>
    </div>
  );
};

export default LandingBlog;