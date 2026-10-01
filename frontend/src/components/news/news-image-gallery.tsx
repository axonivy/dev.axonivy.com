import { Dialog, DialogContent } from "@/components/ui/dialog";
import {
  IconChevronLeft,
  IconChevronRight,
  IconZoomIn,
} from "@tabler/icons-react";
import { useRef, useState, type KeyboardEvent, type TouchEvent } from "react";

const newsImages = import.meta.glob(
  "/src/assets/news/**/*.{gif,jpeg,jpg,png,webp,PNG}",
  { eager: true, import: "default", query: "?url" },
) as Record<string, string>;

function imageUrl(image: string) {
  return newsImages[`/src/assets/news/${image}`] ?? `/src/assets/news/${image}`;
}

export function NewsImageGallery({
  images,
  title,
}: {
  images: string[];
  title: string;
}) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const openAt = (i: number) => {
    setIndex(i);
    setOpen(true);
  };

  const showPrev = () =>
    setIndex((i) => (i - 1 + images.length) % images.length);
  const showNext = () => setIndex((i) => (i + 1) % images.length);

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      showPrev();
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      showNext();
    }
  };

  const touchStartX = useRef<number | null>(null);
  const SWIPE_THRESHOLD = 50;

  const handleTouchStart = (event: TouchEvent) => {
    touchStartX.current =
      event.touches.length === 1 ? event.touches[0].clientX : null;
  };

  const handleTouchMove = (event: TouchEvent) => {
    if (event.touches.length > 1) {
      touchStartX.current = null;
    }
  };

  const handleTouchEnd = (event: TouchEvent) => {
    if (touchStartX.current === null) return;

    const deltaX = event.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;

    if (Math.abs(deltaX) < SWIPE_THRESHOLD) return;
    if (deltaX > 0) {
      showPrev();
    } else {
      showNext();
    }
  };

  return (
    <>
      <div className="grid grid-cols-2 justify-items-center gap-4 md:grid-cols-4">
        {images.map((image, i) => (
          <button
            key={image}
            type="button"
            onClick={() => openAt(i)}
            className="group focus-visible:outline-primary relative rounded-lg p-0 focus-visible:outline-2 focus-visible:outline-offset-2"
          >
            <img
              src={imageUrl(image)}
              alt={title}
              className="max-h-32 rounded-lg transition-opacity group-hover:opacity-80"
              loading="lazy"
            />
            <span className="bg-background/90 text-n900 absolute right-2 bottom-2 flex size-8 items-center justify-center rounded-md opacity-0 shadow-sm transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
              <IconZoomIn className="size-4" />
              <span className="sr-only">Open image preview</span>
            </span>
          </button>
        ))}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          showCloseButton={false}
          onKeyDown={handleKeyDown}
          className="overflow-auto p-0 sm:max-w-5xl"
        >
          <div
            className="relative"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <img
              src={imageUrl(images[index])}
              alt={title}
              className="max-h-[calc(100vh-5rem)] w-full max-w-[calc(100vw-1rem)] rounded-lg"
            />
            {images.length > 1 ? (
              <>
                <button
                  type="button"
                  onClick={showPrev}
                  aria-label="Previous image"
                  className="bg-background/70 text-n900 hover:bg-background focus-visible:outline-primary absolute top-1/2 left-2 flex size-8 -translate-y-1/2 items-center justify-center rounded-full shadow-sm focus-visible:outline-2 focus-visible:outline-offset-2"
                >
                  <IconChevronLeft className="size-4" />
                </button>
                <button
                  type="button"
                  onClick={showNext}
                  aria-label="Next image"
                  className="bg-background/70 text-n900 hover:bg-background focus-visible:outline-primary absolute top-1/2 right-2 flex size-9 -translate-y-1/2 items-center justify-center rounded-full shadow-sm focus-visible:outline-2 focus-visible:outline-offset-2"
                >
                  <IconChevronRight className="size-4" />
                </button>
                <span className="bg-background/90 text-n900 absolute bottom-2 left-1/2 -translate-x-1/2 rounded-full px-2 py-1 text-xs font-medium shadow-sm">
                  {index + 1} / {images.length}
                </span>
              </>
            ) : null}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
