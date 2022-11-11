import data from "./data.json";
import { useState } from "react";

function elementInViewport(el: HTMLElement): boolean {
  const { top, right, bottom, left, height, width } =
    el.getBoundingClientRect();
  const { innerHeight, innerWidth } = window;
  return top >= 0 && left >= 0 && top <= innerHeight && left <= innerWidth;
}

type Post = typeof data.posts[number];
type Photo = Post["photos"][number];

function Photo(props: { photo: Photo; post: Post }) {
  const { photo, post } = props;
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
  const [index, setIndex] = useState(-1);
  return (
    <ol>
      {photos.map(({ id, photo, post }, i) => {
        return (
          <li key={i} onClick={() => setIndex((prev) => (prev === i ? -1 : i))}>
            <span>{`${id} (${i}.)`}</span>
            <Photo photo={photo} post={post} />
            {index === i && (
              <section>
                <p dangerouslySetInnerHTML={{ __html: post.caption }}></p>
                <a href={post.post_url}>{post.blog_name}</a>
              </section>
            )}
          </li>
        );
      })}
    </ol>
  );
}

export default App;
