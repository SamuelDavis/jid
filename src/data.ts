import data from "./data.json";

const photos = data.posts
  .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
  .flatMap((post) => post.photos.map((photo) => ({ photo, post })));
export const mainStory = photos.slice(0, 170);
export const bonus = photos.slice(170);
export const musicCues: [number, number, number][] = [
  [49, 52, 54],
  [93, 95, 96],
  [113, 127, 128],
  [131, 135, 136],
  [146, 154, 155],
].map(([first, peak, last]) => [first - 1, peak, last + 1]);
