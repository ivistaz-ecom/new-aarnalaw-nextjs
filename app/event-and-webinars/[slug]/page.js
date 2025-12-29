import PostContent from "../../../components/EventAndWebinars/InsidePage/PostContent";

export default function Page({ params }) {
  if (!params || !params.slug) {
    return <div>Invalid event</div>;
  }
  return <PostContent slug={params.slug} />;
}
