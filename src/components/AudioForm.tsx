import { useRef, useEffect, useCallback, useState } from "react";
import WaveSurfer from "wavesurfer.js";
import { motion } from "framer-motion";
import Button from "./Button";

const AudioForm = ({ audioSrc }: { audioSrc: string }) => {
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const waveformRef = useRef<HTMLDivElement | null>(null);
  const wavesurferRef = useRef<WaveSurfer | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    audioContextRef.current = new (window.AudioContext ||
      (window as any).webkitAudioContext)();

    wavesurferRef.current = WaveSurfer.create({
      // @ts-ignore
      container: waveformRef.current,
      responsive: true,
      barWidth: 2,
      barGap: 4,
      barHeight: 0.8,
      scrollParent: true,
      backend: "WebAudio",
      audioContext: audioContextRef.current,
      url: audioSrc,
      waveColor: "#e2bb46",
      progressColor: "#a1305f",
      dragToSeek: true,
      barRadius: 3,
    });

    wavesurferRef.current.load(audioSrc);

    const updateCurrentTime = () => {
      if (wavesurferRef.current) {
        setCurrentTime(wavesurferRef.current.getCurrentTime());
      }
    };

    waveformRef.current!.addEventListener("click", (e) => {
      const x = e.clientX - waveformRef.current!.getBoundingClientRect().left;
      const time =
        (x / waveformRef.current!.clientWidth) *
        wavesurferRef.current!.getDuration();
      setCurrentTime(time);
    });

    wavesurferRef.current.on("audioprocess", updateCurrentTime);

    return () => {
      wavesurferRef.current!.un("audioprocess", updateCurrentTime);
      wavesurferRef.current!.destroy();
      audioContextRef.current!.close();
    };
  }, [audioSrc]);

  useEffect(() => {
    setIsPlaying(false);
  }, [audioSrc]);

  const zoomIn = useCallback(() => {
    if (wavesurferRef.current) {
      wavesurferRef.current.zoom(5);
    }
  }, []);

  const zoomOut = useCallback(() => {
    if (wavesurferRef.current) {
      wavesurferRef.current.zoom(0.2);
    }
  }, []);

  const startAudio = useCallback(() => {
    if (
      audioContextRef.current &&
      audioContextRef.current.state === "suspended"
    ) {
      audioContextRef.current.resume().then(() => {
        if (wavesurferRef.current) {
          wavesurferRef.current.play();
          setIsPlaying(true);
        }
      });
    } else if (wavesurferRef.current) {
      wavesurferRef.current.play();
      setIsPlaying(true);
    }
  }, []);

  const pauseAudio = useCallback(() => {
    if (wavesurferRef.current) {
      wavesurferRef.current.pause();
      setIsPlaying(false);
    }
  }, []);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="mb-5" ref={waveformRef}></div>
      {isPlaying ? (
        <motion.div
          initial={{ scale: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Button className="max-w-xs mx-auto" onClick={pauseAudio}>
            Pause track
          </Button>
        </motion.div>
      ) : (
        <motion.div
          initial={{ scale: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          transition={{ duration: 0.2 }}
        >
          <Button className="max-w-xs mx-auto" onClick={startAudio}>
            Play track
          </Button>
        </motion.div>
      )}{" "}
      <p>Current time: {formatTime(currentTime)}</p>{" "}
      <div className="flex justify-center gap-2">
        <motion.div
          initial={{ scale: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.9 }}
          transition={{ duration: 0.3 }}
        >
          <Button variant="secondary" onClick={zoomIn}>
            Zoom In
          </Button>
        </motion.div>
        <motion.div
          initial={{ scale: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.9 }}
          transition={{ duration: 0.3 }}
        >
          <Button variant="secondary" onClick={zoomOut}>
            Zoom Out
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default AudioForm;
