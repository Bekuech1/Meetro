import React from "react";
import JoinToday from "@/components/LandingPage/JoinToday";
import MainBlog from "@/components/LandingPage/MainBlog";

const BlogPage = ({ onClick }) => {
  return (
    <React.Fragment>
      <MainBlog onClick={onClick} />
      <JoinToday />
    </React.Fragment>
  );
};

export default BlogPage;
