import data from "./data.json";
import {
  HTMLProps,
  PropsWithChildren,
  PropsWithRef,
  useEffect,
  useRef,
  useState,
} from "react";

function elementInViewport(el: HTMLElement): boolean {
  const { top, right, bottom, left, height, width } =
    el.getBoundingClientRect();
  const { innerHeight, innerWidth } = window;
  return top >= 0 && left >= 0 && top <= innerHeight && left <= innerWidth;
}

type Post = typeof data.posts[number];
type Photo = Post["photos"][number];

function Photo(
  props: Omit<HTMLProps<HTMLImageElement>, "crossOrigin"> & {
    photo: Photo;
    post: Post;
  }
) {
  const { photo, post, ...propsRest } = props;
  const { summary } = post;
  const { caption, original_size, alt_sizes } = photo;
  const { url: src, width, height } = original_size;
  const alt = caption || summary;
  const srcset = alt_sizes
    .map((size) => {
      const { url, width, height } = size;
      return `${url} ${width}w ${height}h`;
    })
    .join(", ");

  return (
    <img
      loading={"lazy"}
      src={src}
      alt={alt}
      width={width}
      height={height}
      srcSet={srcset}
      {...propsRest}
    />
  );
}

const photos = data.posts
  .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
  .flatMap((post, i) =>
    post.photos.map((photo, j) => ({ id: `${i}.${j}`, photo, post }))
  );

const singlePages: number[] = [21];
const musicCues: [number, number, number][] = [
  [50, 54, 55],
  [93, 96, 98],
];

function App() {
  // const [position, setPosition] = useState(0);
  const [index, setIndex] = useState(-1);
  let n = 0;
  return (
    <>
      {data.posts
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
        .map((post, i) => {
          return (
            <article key={i} onClick={() => setIndex(i)}>
              {post.photos.map((photo, j) => {
                // const ref = useRef(null);
                // useEffect(() => {
                //   const onScroll = () => {
                //     if (!ref.current) return;
                //     if (elementInViewport(ref.current)) setPosition(n);
                //   };
                //   window.addEventListener("scroll", onScroll);
                //   return () => window.removeEventListener("scroll", onScroll);
                // }, [ref]);
                n++;
                return (
                  <Photo
                    // ref={ref}
                    key={j}
                    photo={photo}
                    post={post}
                    title={`${i}.${j} (${n}.)`}
                  />
                );
              })}
              {index === i && (
                <aside>
                  <p dangerouslySetInnerHTML={{ __html: post.caption }} />
                  <footer>
                    <button onClickCapture={() => setIndex(-1)}>&times;</button>
                    <a href={post.post_url}>&#8618;{post.blog_name}</a>
                  </footer>
                </aside>
              )}
            </article>
          );
        })}
    </>
  );
}

export default App;
