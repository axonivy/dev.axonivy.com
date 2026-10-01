import { IconCircleCheck } from "@tabler/icons-react";
import type { NewsBlock, NewsListItem } from "@/data/news/news";
import { Base, H5 } from "@/components/ui/typography";

function InlineText({ text }: { text: string }) {
  const parts = text.split(
    /(`[^`]+`|\*\*[^*]+\*\*|<a\s+href="[^"]+">.*?<\/a>|<code>.*?<\/code>)/g,
  );

  return (
    <>
      {parts.map((part, index) => {
        const link = part.match(/^<a\s+href="([^"]+)">(.*)<\/a>$/);
        if (link) {
          return (
            <a
              key={index}
              href={link[1]}
              className="text-primary"
              target="_blank"
              rel="noopener noreferrer"
            >
              {link[2]}
            </a>
          );
        }

        if (part.startsWith("**") && part.endsWith("**")) {
          return (
            <strong key={index} className="font-semibold">
              {part.slice(2, -2)}
            </strong>
          );
        }

        const code = part.match(/^<code>(.*)<\/code>$/);
        if (code) {
          return (
            <code
              key={index}
              className="bg-n100 text-n900 rounded px-1.5 py-0.5 font-mono text-[0.9em] wrap-break-word"
            >
              {code[1]}
            </code>
          );
        }

        return part;
      })}
    </>
  );
}

function NewsList({ items }: { items: NewsListItem[] }) {
  return (
    <ul className="flex flex-col gap-2">
      {items.map((item, index) => (
        <li
          key={`${item.term ?? item.text}-${index}`}
          className="flex flex-col gap-2"
        >
          <span className="flex items-start gap-2">
            <IconCircleCheck className="text-primary mt-1 size-4 shrink-0" />
            <Base className="text-n900">
              {item.term ? (
                <strong className="font-semibold">
                  <InlineText text={item.term} />:{" "}
                </strong>
              ) : null}
              <InlineText text={item.text} />
            </Base>
          </span>
          {item.items && item.items.length > 0 ? (
            <div className="pl-6">
              <NewsList items={item.items} />
            </div>
          ) : null}
        </li>
      ))}
    </ul>
  );
}

export function NewsContent({ content }: { content: NewsBlock[] }) {
  return (
    <div className="flex flex-col gap-4">
      {content.map((block, index) => {
        switch (block.type) {
          case "paragraph":
            return (
              <Base key={index} className="text-n900 leading-relaxed">
                <InlineText text={block.text} />
              </Base>
            );
          case "list":
            return <NewsList key={index} items={block.items} />;
          case "heading":
            return (
              <H5 key={index}>
                <InlineText text={block.text} />
              </H5>
            );
          case "code":
            return (
              <pre
                key={index}
                className="bg-n100 overflow-x-auto rounded-lg p-4"
              >
                <code className="font-code text-n900 text-sm">
                  {block.code}
                </code>
              </pre>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}
