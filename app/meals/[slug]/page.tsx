export default async function MealsSlug({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;
  console.log({ slug });
  // console.log(params);

  return (
    <section>
      <h1>Meals Slug Page</h1>
      <p>Slug: {slug}</p>
    </section>
  );
}
