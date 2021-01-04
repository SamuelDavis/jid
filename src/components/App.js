import styles from "./App.module.css";
import data, { photos, derivePhotoIndex } from "../data";
import { useState, useEffect } from "react";
import Post from "./Post";
import Navigation from "./Navigation";
import { Helmet } from "react-helmet";

function App() {
  const [navIndex, setNavIndex] = useState(
    derivePhotoIndex(window.location.hash) || 0
  );
  const [postIndex, photoIndex] = photos[navIndex];

  function onNavigate(type, e) {
    e.preventDefault();
    e.stopPropagation();

    window.location.hash = derivePhotoIndex(navIndex + type) || navIndex;
  }

  useEffect(() => {
    function onHashChange(e) {
      const nextNavIndex = derivePhotoIndex(e.target.location.hash);
      if (nextNavIndex !== null) setNavIndex(nextNavIndex);
    }
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  });

  const post = data.posts[postIndex];
  const photo = post.photos[photoIndex];
  const title = `Judy is Dead | ${navIndex}`;
  const url = `${window.location.origin}#${navIndex}`;

  return (
    <main className={styles.App}>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={post.summary} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={post.summary} />
        <meta property="og:image" content={photo.original_size.url} />
        <meta property="og:url" content={url} />
      </Helmet>
      <Navigation onNavigate={onNavigate} />
      <Post post={post} photo={photo} />
    </main>
  );
}

export default App;
