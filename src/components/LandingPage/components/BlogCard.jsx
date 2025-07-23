import React from "react";

const BlogCard = ({ post, onClick, mobile }) => {
  const handleCardClick = () => {
    onClick(post.id); // Pass the post ID to parent
  };
  return (
    <div className={`lg:w-[416px] ${mobile} h-fit grid gap-6`}>
      <img
        src={post.image || "/blog-placeholder.png"}
        alt="Blog Post"
        className="h-[326px] w-full rounded-4xl"
      />
      <div className="grid gap-4 w-full h-fit text-left satoshi">
        <div className="grid gap-2 w-full h-fit">
          <div className="flex gap-2 w-full h-fit items-center">
            <p className="text-[14px] leading-5 text-[#8A9191] font-[500]">
              {post.readTime} minute read
            </p>
            <div className="size-1 rounded-full bg-[#8A9191]"></div>
            <p className="text-[14px] leading-5 text-[#8A9191] font-[500]">
              {post.date}
            </p>
          </div>
          <h4 className="paytone text-[20px] leading-none text-[#161618] font-[400]">
            {post.title}
          </h4>
        </div>
        <p className="text-[14px] leading-5 text-[#8A9191] font-[500]">
          {post.subtext}
        </p>
        <div className="w-full h-fit items-center justify-between flex">
          <button className="text-[14px] leading-5 text-[#7A60BF] font-[700]">
            Read More
          </button>
          <button onClick={handleCardClick}>
            <img src="/blog-arrow.svg" alt="" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;