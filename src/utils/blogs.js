export const blogPosts = [
  {
    id: 1,
    title: "Why We’re Building Meetro – The Story",
    subtext:
      "Learn the secrets to creating memorable gatherings that bring people together.",
    image: "/blog1.png",
    readTime: 5,
    date: "Mar 15, 2024",
    author: "Newman Ogbo",
    content: [
      {
        type: "paragraph",
        content:
          "Let’s be honest making new friends or finding interesting things to do around you can be unnecessarily hard. You’ve probably had that moment where you’re home on a Friday night, scrolling through Instagram stories like a detective, trying to figure out who’s doing what and where. Or maybe you’ve tried organizing a small hangout, and it somehow turned into a group chat chaos that ends with “let’s do it another time.” Yep we’ve been there too. That’s where Meetro comes in.",
      },
      {
        type: "image",
        src: "/blog1-1.png",
      },
      {
        type: "heading",
        level: 1,
        content: "So… What Is Meetro?",
      },
      {
        type: "paragraph",
        content:
          "Meetro is a fun, simple way to create events, discover cool things happening near you, and connect with people in real life. Whether it’s a private birthday dinner, a spontaneous picnic, or a community event — we’re building a space where meeting up isn’t just possible, but easy and exciting.",
      },
      {
        type: "heading",
        level: 1,
        content: "Why We’re Building This",
      },
      {
        type: "paragraph",
        content:
          "The idea came from a personal struggle. I had just moved to a new city, working remotely, and despite all the apps and online connections — I was still feeling disconnected. I didn’t know what events were happening nearby, and when I wanted to host something casual with friends, it was harder than it needed to be.",
      },
      {
        type: "paragraph",
        content: "There was no single place to:",
      },
      {
        type: "list",
        ordered: false,
        items: [
          "Plan something low-effort",
          "Make it private or public",
          "Share it easily",
          "Lets friends chip in",
          "And actually connect with others That felt like a gap worth solving.",
        ],
      },
      { type: "paragraph", content: "That felt like a gap worth solving." },
      {
        type: "image",
        src: "/faces-img.png",
      },
      {
        type: "heading",
        level: 1,
        content: "Built for Us, by Us",
      },
      {
        type: "paragraph",
        content:
          "Many event platforms are either too complex, too foreign, or just not fun. We wanted something lightweight, local, and built around connection not just logistics. That’s why Meetro is being built from the ground up for the way we actually socialize. Whether it’s a silent book club or a game night with jollof rice we’re creating tools that make organizing and discovering events feel like second nature.",
      },
      {
        type: "heading",
        level: 1,
        content: "Join the Ride",
      },
      {
        type: "paragraph",
        content:
          "Meetro is still early, but the love and support we’ve gotten already is wild. If you’re someone who wants to host better hangouts, discover vibes near you, or just build something meaningful with us we’d love to have you onboard.",
      },
    ],
  },
];

// Helper function to get a blog post by ID
export const getBlogPostById = (id) => {
  return blogPosts.find((post) => post.id === parseInt(id));
};

// Helper function to get related posts
export const getRelatedPosts = (currentPostId, limit = 3) => {
  return blogPosts
    .filter((post) => post.id !== parseInt(currentPostId))
    .slice(0, limit);
};