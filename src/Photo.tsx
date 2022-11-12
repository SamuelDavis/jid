import type { ImgProps, Photo, Post } from "./types";

export default function (props: ImgProps & { post: Post; photo: Photo }) {
  const { post, photo, ...propsRest } = props;
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
