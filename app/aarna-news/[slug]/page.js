import PostContent from "../../../components/News/InsidePage/PostContent";

export default function Page({ params }) {
  if (!params || !params.slug) {
    return <div>Invalid post</div>;
  }
  return <PostContent slug={params.slug} />;
}
