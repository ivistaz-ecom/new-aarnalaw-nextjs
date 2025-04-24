import PostContent from "../../../components/News/InsidePage/PostContent";

export default function Page({ params }) {
  return <PostContent slug={params.slug} />;
}
