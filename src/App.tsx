import { useEffect, useRef, useState } from "react";
import audio from "./../public/audio.mp3";
import type { Post } from "./types";
import SummaryModal from "./SummaryModal";
import Photo from "./Photo";
import { clamp, elementInFocus } from "./util";
import { bonus, mainStory, musicCues } from "./data";

export default function () {
  const [interactive, setInteractive] = useState(false);
  const [post, setPost] = useState<Post | null>(null);
  const [focus, setFocus] = useState(0);
  const [targetVolume, setTargetVolume] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.volume = 0;
  }, [audioRef]);

  useEffect(() => {
    const onScroll = () => {
      const photos = document.querySelectorAll("img");
      for (let i = 0; i < photos.length; i++) {
        if (focus !== i && elementInFocus(photos[i])) {
          setFocus(i);
          setPost(null);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [focus, setFocus, setPost]);

  useEffect(() => {
    for (const [first, peak, last] of musicCues) {
      if (focus >= first && focus <= last) {
        if (focus < peak) {
          setTargetVolume((focus - first) / (peak - first));
        } else if (focus > peak) {
          setTargetVolume((last - focus) / (last - peak));
        } else {
          setTargetVolume(1.0);
        }
        return;
      }
    }
    setTargetVolume(0.0);
  }, [focus, setTargetVolume]);

  useEffect(() => {
    if (!interactive) return;
    if (!audioRef.current) return;
    if (audioRef.current.muted) audioRef.current.muted = false;
    if (audioRef.current.currentTime < 30) audioRef.current.currentTime = 30;
    if (audioRef.current.paused || audioRef.current.ended)
      audioRef.current.play().catch((e) => console.error(e));
    const diff = targetVolume - audioRef.current.volume;
    const step = diff / 100;
    const error = step / 2;
    const interval = setInterval(() => {
      if (
        audioRef.current &&
        Math.abs(audioRef.current.volume - targetVolume) > Math.abs(error)
      ) {
        audioRef.current.volume = clamp(audioRef.current.volume + step, 0, 1);
      } else {
        clearInterval(interval);
      }
    }, 10);
    return () => clearInterval(interval);
  }, [interactive, targetVolume, audioRef]);

  return (
    <>
      {!interactive && (
        <button onClick={() => setInteractive(true)}>Load Webcomic</button>
      )}
      <audio
        ref={audioRef}
        src={audio}
        muted={true}
        autoPlay={true}
        loop={true}
      />
      {post && <SummaryModal post={post} onClose={() => setPost(null)} />}
      <ol>
        {mainStory.map((props, i) => {
          const { post } = props;
          return (
            <li key={i} onClick={() => setPost(post)}>
              <Photo {...props} />
            </li>
          );
        })}
      </ol>
      <details>
        <summary>Bonus!</summary>
        <ol>
          {bonus.map((props, i) => {
            const { post } = props;
            return (
              <li key={i} onClick={() => setPost(post)}>
                <Photo {...props} />
              </li>
            );
          })}
        </ol>
      </details>
    </>
  );
}
