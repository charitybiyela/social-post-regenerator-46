export const mockNewsItems = [
  {
    id: 1,
    title: "Global Technology Trends",
    category: "Technology",
    importance: "high",
    content: "Latest developments in AI and machine learning are reshaping industries...",
    tags: ["technology", "ai", "innovation"],
    time: "2 hours ago",
    media: {
      type: "image",
      src: "/placeholder.svg",
      alt: "AI Technology",
      aspectRatio: "16:9" as const
    }
  },
  {
    id: 2,
    title: "Economic Updates",
    category: "Finance",
    importance: "medium",
    content: "Markets show resilience amid global economic challenges...",
    tags: ["finance", "markets", "economy"],
    time: "4 hours ago",
    media: {
      type: "chart",
      data: {
        labels: ["Jan", "Feb", "Mar"],
        values: [30, 45, 60],
        title: "Market Growth"
      }
    }
  }
];