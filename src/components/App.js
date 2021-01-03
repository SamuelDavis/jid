import styles from "./App.module.css";
import data, { photos, derivePhotoIndex } from "../data";
import { useState, useEffect } from "react";
import Post from "./Post";
import Navigation from "./Navigation";

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

  return (
    <main className={styles.App}>
      <Navigation onNavigate={onNavigate} />
      <Post post={post} photo={photo} />
    </main>
  );
}

export default App;
