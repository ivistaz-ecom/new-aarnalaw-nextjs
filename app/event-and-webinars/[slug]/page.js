import PostContent from "../../../components/EventAndWebinars/InsidePage/PostContent";

export default function Page({ params }) {
  return <PostContent slug={params.slug} />;
}
