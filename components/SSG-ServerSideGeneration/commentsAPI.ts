export const fallback: { comments: { name: string; meaning: string }[] } = {
  comments: [
    {
      name: "page.js",
      meaning:
        "Create a new page (e.g., app/about/page.js creates a <your-domain>/about page)",
    },
    {
      name: "layout.js",
      meaning: "Create a new layout that wraps sibling and nested pages",
    },
    {
      name: "not-found.js",
      meaning:
        'Fallback page for "Not Found" errors (thrown by sibling or nested pages or layouts)',
    },
    {
      name: "error.js",
      meaning:
        "Fallback page for other errors (thrown by sibling pages or nested pages or layouts)",
    },
    {
      name: "loading.js",
      meaning:
        "Fallback page which is shown whilst sibling or nested pages (or layouts) are fetching data",
    },
    {
      name: "route.js",
      meaning:
        "Allows you to create an API route (i.e., a page which does NOT return JSX code but instead data, e.g., in the JSON format)",
    },
  ],
};
// tsc initdb.ts --outDir dist --target ESNext
