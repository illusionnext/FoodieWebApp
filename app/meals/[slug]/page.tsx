export default async function MealsSlug({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = await params; //`params` should be awaited before using its properties
  console.log({ slug });
  // console.log(params);

  return (
    <section>
      <h1>Meals Slug Page</h1>
      <p>Slug: {slug}</p>
    </section>
  );
}
