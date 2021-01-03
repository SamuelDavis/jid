import styles from "./Photo.module.css";

function Photo({ url, alt_sizes = [], caption = null }) {
  const [srcSet, sizes] = alt_sizes
    .sort((a, b) => a.width - b.width)
    .reduce(
      ([srcSet, sizes], { url, width }) => [
        [...srcSet, `${url} ${width}w`],
        [...sizes, `(max-width: ${width}px) ${width}px`],
      ],
      [[], []]
    );

  return (
    <img
      className={styles.Img}
      src={url}
      alt={caption}
      srcSet={srcSet}
      sizes={sizes}
    />
  );
}

export default Photo;
