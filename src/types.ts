import type { HTMLProps } from "react";
import type data from "./data.json";

export type ImgProps = Omit<HTMLProps<HTMLImageElement>, "crossOrigin">; // crossOrigin doesn't match crossorigin
export type Post = typeof data.posts[number];
export type Photo = Post["photos"][number];
