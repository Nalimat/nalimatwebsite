import { useParams } from "react-router";
import { ArrowLeft } from "lucide-react";
import { getInsight } from "@/content/insights";
import { Container } from "@/components/ui/Container";
import { AppLink as Link } from "@/components/ui/AppLink";
import { CtaBand } from "@/components/sections/CtaBand";
import { Seo } from "@/components/layout/Seo";
import { formatDate } from "@/lib/format";
import { articleMetadata } from "@/lib/seo";
import NotFoundPage from "./NotFoundPage";

export default function InsightPage() {
  const { slug = "" } = useParams();
  const post = getInsight(slug);
  if (!post) return <NotFoundPage title="Article not found" />;

  return (
    <>
      <Seo {...articleMetadata(post)} />
      <article>
        <header className="border-b border-line">
          <Container className="max-w-[820px] pt-14 pb-14 sm:pt-20">
            <Link href="/insights" className="inline-flex items-center gap-2 text-[0.9375rem] text-muted hover:text-navy">
              <ArrowLeft size={16} aria-hidden /> All insights
            </Link>
            <p className="mt-10 text-sm font-medium text-accent-ink">{post.topic}</p>
            <h1 className="mt-4 text-h1">{post.title}</h1>
            <p className="mt-6 text-lead text-muted">{post.excerpt}</p>
            <p className="mt-8 text-[0.9375rem] text-muted">
              {post.author}, <time dateTime={post.date}>{formatDate(post.date)}</time>, {post.readingMinutes} min read
            </p>
          </Container>
        </header>
        <Container className="max-w-[820px] py-14">
          <div className="max-w-[68ch] space-y-6 text-[1.125rem] leading-[1.75]">
            {post.body.map((block, i) =>
              block.startsWith("## ") ? (
                <h2 key={i} className="pt-6 text-h3 sm:text-2xl">
                  {block.slice(3)}
                </h2>
              ) : (
                <p key={i}>{block}</p>
              ),
            )}
          </div>
        </Container>
      </article>
      <CtaBand />
    </>
  );
}
