import styles from "./Post.module.css";
import Photo from "./Photo";
import { useState } from "react";

function Post({ photo, post }) {
  const [fitHeight, setFitHeight] = useState(true);

  function onFitHeight() {
    setFitHeight(!fitHeight);
  }

  const date = new Date(post.date);

  const className = [styles.Figure, fitHeight ? styles.fitHeight : null]
    .filter(Boolean)
    .join(" ");

  return (
    <article>
      <figure className={className} onClick={onFitHeight}>
        <Photo
          url={photo.original_size.url}
          alt_sizes={photo.alt_sizes}
          caption={photo.caption || post.summary}
          fit_height={fitHeight}
        />
      </figure>
      <section className={styles.Description}>
        <aside className={styles.Sidebar}>
          <time dateTime={date.toString()}>{date.toLocaleDateString()}</time>
          <nav>
            <a rel="canonical" href={post.post_url}>
              Source
            </a>
            {post.tags.map((tag) => (
              <a
                key={tag}
                rel="noreferrer"
                href={post.blog.url + "tagged/" + tag.replace(" ", "-")}
                target="_blank"
              >
                #{tag}
              </a>
            ))}
          </nav>
        </aside>
        <div dangerouslySetInnerHTML={{ __html: post.caption }} />
      </section>
    </article>
  );
}

export default Post;
