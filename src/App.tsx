import AudioForm from "./components/AudioForm";
import song1 from "./assets/song.mp3";
import song2 from "./assets/song2.mp3";
import song3 from "./assets/song3.mp3";
import { useCallback, useEffect, useState } from "react";
import Button from "./components/Button";
import Loading from "./components/Loading";
import { motion } from "framer-motion";

const urls = [song1, song2, song3];

function App() {
  const [audioUrl, setAudioUrl] = useState(urls[0]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleComplete = () => setLoading(false);

    const timer = setTimeout(() => {
      handleComplete();
    }, 4000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  const onUrlChange = useCallback(() => {
    urls.reverse();
    setAudioUrl(urls[0]);
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col">
      <AudioForm audioSrc={audioUrl} />
      <motion.div
        initial={{ scale: 1 }}
        whileHover={{ translateX: 10 }}
        whileTap={{ scale: 0.9 }}
        transition={{ duration: 0.3 }}
      >
        <Button
          className="max-w-xs mx-auto mt-5"
          variant="secondary"
          onClick={onUrlChange}
        >
          Change audio
        </Button>
      </motion.div>
    </div>
  );
}

export default App;
