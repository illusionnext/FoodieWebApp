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

export const rendering: {
  comments: { name: string; meaning: string; why: string }[];
} = {
  comments: [
    {
      name: "SSR (Server-Side Rendering)",
      meaning:
        "Rendering happens on the server at each request. This means the HTML is generated on the server before being sent to the client. Useful for data that needs to be updated frequently or is user-specific.",
      why: "Dynamic Data: Useful for content that changes frequently or needs to be personalized for each user. Next.js renders the page at request time, ensuring data is always up-to-date. Suitable for cases where SEO is important, as the server sends a fully rendered HTML to the client.",
    },
    {
      name: "CSR (Client-Side Rendering)",
      meaning:
        "Rendering happens on the client after the initial page load. JavaScript loads the necessary content dynamically in the browser. Useful for interactive pages where data changes based on user actions without needing a full page reload.",
      why: "Client-Side Interactivity: CSR is ideal for highly interactive applications that rely on frequent user interactions, like single-page applications (SPAs). Pages load quickly with minimal initial HTML, and data fetching is handled in the browser, often with hooks like `useState` or `useEffect` to manage state and effects.",
    },
    {
      name: "ISR (Incremental Static Regeneration)",
      meaning:
        "Combines the benefits of SSG and SSR by allowing static pages to be periodically updated on the server. Useful for pages that need to refresh periodically while still being fast and cached.",
      why: "Optimized Data Refresh: ISR is suitable for pages that don’t need real-time data but still require updates periodically. Pages are regenerated in the background after a specified interval, so the user sees static content while ensuring freshness. This helps maintain speed and scalability while keeping content reasonably up-to-date.",
    },
    {
      name: "SSG (Static Site Generation)",
      meaning:
        "Pages are rendered at build time and served as static files. Ideal for pages with content that doesn’t change often, as it’s the fastest and most efficient rendering option.",
      why: "Static Content: Great for pages with stable content, like marketing pages or documentation. With SSG, Next.js generates static HTML at build time, resulting in fast load times with minimal server processing. No need for client-side interactivity or data fetching, making it highly performant and efficient.",
    },
  ],
};
