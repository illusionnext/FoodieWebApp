export default async function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;
  // console.log(params);
  console.dir(slug);
  // slug is an array of strings gives the path of the current page.It is a promise

  return (
    <main>
      <h1>Blog Post Page</h1>
      <p>{slug}</p>
    </main>
  );
}
