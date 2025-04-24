import PostContent from "../[slug]/PostContent";

export default function Page({ params }) {
  return <PostContent slug={params.slug} />;
}
