import React from "react";
import JoinToday from "@/components/LandingPage/JoinToday";
import MainBlog from "@/components/LandingPage/MainBlog";

const BlogPage = ( {onClick} ) => {
  return (
    <>
      <MainBlog onClick={onClick}/>
      <JoinToday />
    </>
  );
};

export default BlogPage;