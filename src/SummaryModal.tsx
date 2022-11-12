import type { Post } from "./types";

export default function (props: { post: Post; onClose: () => void }) {
  const { post, onClose } = props;
  const { caption, post_url, blog_name } = post;
  return (
    <aside>
      <section dangerouslySetInnerHTML={{ __html: caption }} />
      <footer>
        <button onClickCapture={onClose}>&times;</button>
        <a href={post_url} target="_blank">
          &#8618;{blog_name}
        </a>
      </footer>
    </aside>
  );
}
