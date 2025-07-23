import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { blogPosts } from "@/utils/blogs";
import LandingNav from "@/components/LandingPage/LandingNav";
import CreateEventBtn from "@/components/Layout-conponents/CreateEventBtn";

// Component to render different content types
const ContentRenderer = ({ content }) => {
  if (!content || !Array.isArray(content)) {
    return (
      <p className="text-[#161618] leading-relaxed mb-6 satoshi">
        No content available for this blog post.
      </p>
    );
  }

  return content.map((block, index) => {
    switch (block.type) {
      case "paragraph":
        return (
          <p
            key={index}
            className="text-[#334040] leading-relaxed mb-6 satoshi font-[500]"
          >
            {block.content}
          </p>
        );

      case "heading":
        const HeadingTag = `h${block.level || 2}`;
        const headingClasses = {
          1: "text-[18px] font-[700] text-[#001010] leading-[28px] satoshi",
          2: "text-[16px] font-[500] text-[#334040] leading-[24px] satoshi",
        };

        return React.createElement(
          HeadingTag,
          {
            key: index,
            className: headingClasses[block.level || 2],
          },
          block.content
        );

      case "image":
        return (
          <div key={index} className="mb-8">
            <img
              src={block.src}
              alt={block.alt || ""}
              className="w-full lg:h-[540px] sm:h-[350px] h-[269px] rounded-4xl object-cover"
            />
            {block.caption && (
              <p className="text-sm text-[#8A9191] text-center mt-2 italic satoshi">
                {block.caption}
              </p>
            )}
          </div>
        );

      case "list":
        const ListTag = block.ordered ? "ol" : "ul";
        const listClasses = block.ordered
          ? "list-decimal list-inside mb-6 space-y-2 satoshi"
          : "list-disc list-inside mb-6 satoshi";

        return React.createElement(
          ListTag,
          {
            key: index,
            className: listClasses,
          },
          block.items.map((item, itemIndex) =>
            React.createElement(
              "li",
              {
                key: itemIndex,
                className:
                  "text-[#334040] leading-[24px] text-[16px] font-[500] satoshi",
              },
              item
            )
          )
        );

      case "divider":
        return <hr key={index} className="border-t border-[#E5E5E5] my-8" />;

      default:
        return (
          <p
            key={index}
            className="text-[#161618] leading-relaxed mb-6 satoshi"
          >
            {block.content || "Unsupported content type"}
          </p>
        );
    }
  });
};

const BlogPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [navOpen, setNavOpen] = useState(false);
  
  // Find the post by ID
  const post = blogPosts.find(p => p.id === id || p.id === parseInt(id));

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "auto",
    });
  };

  // Use useEffect to scroll to top when component mounts
  useEffect(() => {
    scrollToTop();
  }, []);

  // Handle navigation from mobile menu
  const handleNavigation = (itemIndex) => {
    setNavOpen(false);
    navigate("/", { state: { id: itemIndex } });
  };

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Blog Post Not Found</h1>
          <button
            onClick={() => navigate("/")}
            className="text-[#7A60BF] hover:text-[#6B4EAF] font-bold"
          >
            ← Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-white ${navOpen ? "shadow-lg" : ""} relative`}>
      {/* Mobile Navigation Overlay */}
      {navOpen && (
        <nav className="w-full h-screen flex justify-center items-center z-110 absolute">
          <div className="w-[98%] h-[98%] bg-[#011F0FE5]/90 backdrop-blur-[100px] pt-3 pb-6 pr-4 pl-6 flex flex-col rounded-4xl justify-between">
            <div className="w-full flex flex-col gap-8 h-fit">
              <div className="flex w-full h-fit justify-between">
                <img src="/meetroLogo.svg" alt="Meetro Logo" />
                <button
                  onClick={() => setNavOpen(false)}
                  className="size-fit rounded-4xl p-1 bg-[#344C3F]"
                >
                  <img
                    src="/menu-active.svg"
                    alt="Close menu"
                    className="size-[24px]"
                  />
                </button>
              </div>
              <ul className="flex flex-col h-fit w-full">
                <li
                  className="w-full h-fit py-4 paytone font-medium text-[24px] leading-6 text-white cursor-pointer"
                  onClick={() => handleNavigation(0)}
                >
                  How it Works
                </li>
                <li
                  className="w-full h-fit py-4 paytone font-medium text-[24px] leading-6 text-white cursor-pointer"
                  onClick={() => handleNavigation(1)}
                >
                  Pricing
                </li>
                <li
                  className="w-full h-fit py-4 paytone font-medium text-[24px] leading-6 text-white cursor-pointer"
                  onClick={() => handleNavigation(2)}
                >
                  Blog
                </li>
                <li
                  className="w-full h-fit py-4 paytone font-medium text-[24px] leading-6 text-white cursor-pointer"
                  onClick={() => handleNavigation(3)}
                >
                  About Us
                </li>
              </ul>
            </div>
            <CreateEventBtn
              onClick={() => setNavOpen(false)}
              bgcolor="bg-[#AEFC40]"
              text="create event"
              textcolor="text-[#011F0F] py-4 text-base"
            />
          </div>
        </nav>
      )}

      {/* Sticky Navigation Bar */}
      <div className="top-0 sticky z-20 justify-center items-center flex">
        <LandingNav
          onClick={() => setNavOpen(true)}
          setActiveItem={(item) => navigate("/", { state: { id: item } })}
          activeItem={2} // Set to 2 since we're on blog
        />
      </div>

      <div className="pt-24 pb-10">
        {/* Header with Back Button */}
        <header className="w-[90%] max-w-[846px] mx-auto mb-6">
          <button
            onClick={() => navigate("/")}
            className="text-[#866AD2] flex items-center rounded-full p-2 pr-[10px] satoshi text-sm font-bold bg-[#7A60BF1A]"
          >
            <img src="/arrow-left.svg" alt="Back arrow" />
            Back
          </button>
        </header>

        {/* Blog Content */}
        <main className="w-[90%] max-w-[846px] mx-auto grid gap-4">
          {/* Title */}
          <h1 className="paytone text-4xl md:text-5xl leading-tight text-[#161618] font-[400] text-center">
            {post.title}
          </h1>
          <div className="flex size-fit mx-auto gap-2 justify-center items-center">
            <img
              src={post.authorpic || "/v2-tinyprofile.jpg"}
              alt={`${post.author} profile picture`}
              className="rounded-full size-10"
            />
            <p className="text-base text-[#010E1F] font-medium leading-6 satoshi">
              {post.author}
            </p>
          </div>

          {/* Featured Image */}
          {post.image && (
            <div className="">
              <img
                src={post.image}
                alt={post.title}
                className="w-full lg:h-[540px] sm:h-[350px] h-[269px] object-cover rounded-4xl"
              />
            </div>
          )}

          {/* Dynamic Blog Content */}
          <div className="max-w-none">
            <ContentRenderer content={post.content} />
          </div>
        </main>
      </div>
    </div>
  );
};

export default BlogPost;