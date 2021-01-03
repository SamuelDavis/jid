import styles from "./App.module.css";
import data, { photos } from "../data";
import { useState } from "react";
import Post from "./Post";
import Navigation from "./Navigation";

function App() {
  const [navIndex, setNavIndex] = useState(0);
  const [postIndex, photoIndex] = photos[navIndex];

  function onNavigate(type, e) {
    e.preventDefault();
    e.stopPropagation();

    const nextNavIndex = navIndex + type;
    if (nextNavIndex in photos) {
      setNavIndex(nextNavIndex);
    }
  }

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
