import ReactMarkdown from "react-markdown";
import remarkBreaks from "remark-breaks";
import remarkGfm from "remark-gfm";

function MarkdownContent({ content }) {
  if (!content) {
    return null;
  }

  return (
    <div className="min-w-0 max-w-full [overflow-wrap:anywhere] prose prose-slate max-w-none prose-headings:font-serif prose-headings:text-moss prose-p:my-5 prose-p:leading-8 prose-p:text-slate-700 prose-a:font-medium prose-a:text-earth prose-a:underline prose-a:decoration-earth/30 prose-a:underline-offset-4 hover:prose-a:decoration-earth prose-strong:text-moss prose-em:text-moss prose-blockquote:border-l-4 prose-blockquote:border-earth/30 prose-blockquote:bg-earth/5 prose-blockquote:py-1 prose-blockquote:pl-5 prose-blockquote:pr-4 prose-blockquote:italic prose-blockquote:text-slate-600 prose-ul:my-6 prose-ul:list-disc prose-ul:pl-5 prose-ol:my-6 prose-ol:list-decimal prose-ol:pl-5 prose-li:my-2 prose-li:leading-8 prose-img:my-8 prose-img:rounded-3xl prose-img:shadow-[0_20px_60px_-30px_rgba(31,55,42,0.35)] prose-hr:border-moss/15 prose-table:w-full prose-table:border-collapse prose-th:border prose-th:border-moss/10 prose-th:bg-moss/5 prose-th:px-4 prose-th:py-3 prose-td:border prose-td:border-moss/10 prose-td:px-4 prose-td:py-3">
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkBreaks]}
        components={{
          h1: ({ children }) => (
            <h1 className="mb-6 mt-12 text-4xl leading-tight text-moss sm:text-5xl">{children}</h1>
          ),
          h2: ({ children }) => (
            <h2 className="mb-5 mt-12 text-3xl leading-tight text-moss sm:text-4xl">{children}</h2>
          ),
          h3: ({ children }) => (
            <h3 className="mb-4 mt-10 text-2xl leading-tight text-moss sm:text-3xl">{children}</h3>
          ),
          h4: ({ children }) => (
            <h4 className="mb-4 mt-8 text-xl leading-tight text-moss">{children}</h4>
          ),
          h5: ({ children }) => (
            <h5 className="mb-3 mt-8 text-lg leading-tight text-moss">{children}</h5>
          ),
          h6: ({ children }) => (
            <h6 className="mb-3 mt-8 text-base font-medium uppercase tracking-[0.2em] text-earth">
              {children}
            </h6>
          ),
          p: ({ children }) => <p className="my-5 leading-8 text-slate-700">{children}</p>,
          a: ({ href, children }) => (
            <a
              href={href}
              className="font-medium text-earth underline decoration-earth/30 underline-offset-4 transition-colors hover:decoration-earth"
              target={href?.startsWith("http") ? "_blank" : undefined}
              rel={href?.startsWith("http") ? "noreferrer noopener" : undefined}
            >
              {children}
            </a>
          ),
          img: ({ src, alt }) => (
            <figure className="my-8 overflow-hidden rounded-3xl border border-moss/10 bg-white">
              <img
                src={src}
                alt={alt ?? ""}
                loading="lazy"
                className="h-auto w-full object-cover"
              />
              {alt ? (
                <figcaption className="px-5 py-3 text-sm text-slate-500">{alt}</figcaption>
              ) : null}
            </figure>
          ),
          blockquote: ({ children }) => (
            <blockquote className="my-8 border-l-4 border-earth/30 bg-earth/5 px-5 py-4 italic text-slate-600">
              {children}
            </blockquote>
          ),
          ul: ({ children }) => <ul className="my-6 list-disc space-y-2 pl-6">{children}</ul>,
          ol: ({ children }) => <ol className="my-6 list-decimal space-y-2 pl-6">{children}</ol>,
          li: ({ children }) => <li className="pl-1 leading-8 text-slate-700">{children}</li>,
          hr: () => <hr className="my-10 border-moss/15" />,
          table: ({ children }) => (
            <div className="my-8 overflow-x-auto rounded-2xl border border-moss/10 bg-white">
              <table className="min-w-full">{children}</table>
            </div>
          ),
          thead: ({ children }) => <thead className="bg-moss/5">{children}</thead>,
          th: ({ children }) => <th className="border border-moss/10 px-4 py-3 text-left">{children}</th>,
          td: ({ children }) => <td className="border border-moss/10 px-4 py-3">{children}</td>,
          pre: ({ children }) => (
            <pre className="my-8 overflow-x-auto rounded-3xl bg-moss/5 p-5 text-sm leading-7 text-moss">
              {children}
            </pre>
          ),
          code: ({ inline, className, children, ...props }) =>
            inline ? (
              <code
                className="rounded bg-moss/10 px-1.5 py-0.5 text-[0.92em] text-moss"
                {...props}
              >
                {children}
              </code>
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
            ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}

export default MarkdownContent;
