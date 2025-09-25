import React, { useEffect, useState, useCallback, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { blogPosts } from "@/utils/blogs";
import LandingNav from "@/components/LandingPage/LandingNav";
import CreateEventBtn from "@/components/Layout-components/CreateEventBtn";

const HEADING_CLASSES = {
  1: "text-[18px] font-[700] text-[#001010] leading-[28px] satoshi mb-6",
  2: "text-[16px] font-[500] text-[#334040] leading-[24px] satoshi mb-6",
};

const NAV_ITEMS = [
  { id: 0, name: "How it Works" },
  { id: 1, name: "Pricing" },
  { id: 2, name: "Blog" },
  { id: 3, name: "About Us" },
];

const ContentRenderer = React.memo(({ content }) => {
  const renderedContent = useMemo(() => {
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

        case "heading": {
          const level = block.level || 2;
          const HeadingTag = `h${level}`;
          return React.createElement(
            HeadingTag,
            {
              key: index,
              className: HEADING_CLASSES[level] || HEADING_CLASSES[2],
            },
            block.content
          );
        }

        case "image":
          return (
            <div key={index} className="mb-8">
              <img
                src={block.src}
                alt={block.alt || ""}
                className="w-full lg:h-[540px] sm:h-[350px] h-[269px] rounded-4xl object-cover"
                loading="lazy"
              />
              {block.caption && (
                <p className="text-sm text-[#8A9191] text-center mt-2 italic satoshi">
                  {block.caption}
                </p>
              )}
            </div>
          );

        case "list": {
          const ListTag = block.ordered ? "ol" : "ul";
          const listClasses = block.ordered
            ? "list-decimal list-inside mb-6 space-y-2"
            : "list-disc list-inside mb-6";

          return React.createElement(
            ListTag,
            {
              key: index,
              className: listClasses,
            },
            block.items?.map((item, itemIndex) =>
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
        }

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
  }, [content]);

  return <div className="max-w-none">{renderedContent}</div>;
});

ContentRenderer.displayName = "ContentRenderer";

const MobileNavigation = React.memo(({ navOpen, onClose, onNavigate }) => {
  const handleNavItemClick = useCallback(
    itemId => {
      onNavigate(itemId);
    },
    [onNavigate]
  );

  const navItems = useMemo(
    () =>
      NAV_ITEMS.map(item => (
        <li
          key={item.id}
          className="w-full h-fit py-4 paytone font-medium text-[24px] leading-6 text-white cursor-pointer"
          onClick={() => handleNavItemClick(item.id)}
        >
          {item.name}
        </li>
      )),
    [handleNavItemClick]
  );

  if (!navOpen) return null;

  return (
    <nav className="fixed inset-2 flex justify-center items-center z-[110] max-h-[calc(100vh-1rem)] overflow-y-auto">
      <div className="w-full h-full bg-[#011F0FE5]/90 backdrop-blur-[100px] pt-3 pb-6 pr-4 pl-6 flex flex-col rounded-4xl justify-between">
        <div className="w-full flex flex-col gap-8 h-fit">
          <div className="flex w-full h-fit justify-between">
            <img src="/meetroLogo.svg" alt="Meetro Logo" loading="lazy" />
            <button
              onClick={onClose}
              className="size-fit rounded-4xl p-1 bg-[#344C3F]"
              aria-label="Close navigation menu"
            >
              <img
                src="/menu-active.svg"
                alt=""
                className="size-[24px]"
                loading="lazy"
              />
            </button>
          </div>
          <ul className="flex flex-col h-fit w-full">{navItems}</ul>
        </div>
        <CreateEventBtn
          onClick={onClose}
          bgcolor="bg-[#AEFC40]"
          text="create event"
          textcolor="text-[#011F0F] py-4 text-base"
        />
      </div>
    </nav>
  );
});

MobileNavigation.displayName = "MobileNavigation";

const BlogPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [navOpen, setNavOpen] = useState(false);

  const post = useMemo(
    () => blogPosts.find(p => p.id === id || p.id === parseInt(id, 10)),
    [id]
  );

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, []);

  const handleNavClose = useCallback(() => {
    setNavOpen(false);
  }, []);

  const handleNavOpen = useCallback(() => {
    setNavOpen(true);
  }, []);

  const handleNavigation = useCallback(
    itemIndex => {
      setNavOpen(false);
      navigate("/", { state: { id: itemIndex } });
    },
    [navigate]
  );

  const handleBackToHome = useCallback(() => {
    navigate("/");
  }, [navigate]);

  const handleSetActiveItem = useCallback(
    item => {
      navigate("/", { state: { id: item } });
    },
    [navigate]
  );

  const containerClass = useMemo(
    () => `min-h-screen bg-white ${navOpen ? "shadow-lg" : ""} relative`,
    [navOpen]
  );

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4 satoshi">
            Blog Post Not Found
          </h1>
          <button
            onClick={handleBackToHome}
            className="text-[#7A60BF] hover:text-[#6B4EAF] font-bold satoshi"
          >
            ← Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={containerClass}>
      {/* Mobile Navigation */}
      <MobileNavigation
        navOpen={navOpen}
        onClose={handleNavClose}
        onNavigate={handleNavigation}
      />

      {/* Sticky Navigation Bar */}
      <div className="top-0 sticky z-20 justify-center items-center flex">
        <LandingNav
          onClick={handleNavOpen}
          setActiveItem={handleSetActiveItem}
          activeItem={2} // Blog section
        />
      </div>

      <div className="pt-24 pb-10">
        {/* Header with Back Button */}
        <header className="w-[90%] max-w-[846px] mx-auto mb-6">
          <button
            onClick={handleBackToHome}
            className="text-[#866AD2] flex items-center rounded-full p-2 pr-[10px] satoshi text-sm font-bold bg-[#7A60BF1A] hover:bg-[#7A60BF2A] transition-colors"
          >
            <img src="/arrow-left.svg" alt="" loading="lazy" />
            Back
          </button>
        </header>

        {/* Blog Content */}
        <main className="w-[90%] max-w-[846px] mx-auto grid gap-4">
          {/* Title */}
          <h1 className="paytone text-4xl md:text-5xl leading-tight text-[#161618] font-[400] text-center mb-4">
            {post.title}
          </h1>

          {/* Author Info */}
          <div className="flex size-fit mx-auto gap-2 justify-center items-center mb-6">
            <img
              src={post.authorpic || "/v2-tinyprofile.jpg"}
              alt=""
              className="rounded-full size-10"
              loading="lazy"
            />
            <p className="text-base text-[#010E1F] font-medium leading-6 satoshi">
              {post.author}
            </p>
          </div>

          {/* Featured Image */}
          {post.image && (
            <div className="mb-6">
              <img
                src={post.image}
                alt=""
                className="w-full lg:h-[540px] sm:h-[350px] h-[269px] object-cover rounded-4xl"
                loading="lazy"
              />
            </div>
          )}

          {/* Dynamic Blog Content */}
          <ContentRenderer content={post.content} />
        </main>
      </div>
    </div>
  );
};

export default BlogPost;
