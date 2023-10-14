import { motion } from "framer-motion";

interface Cube {
  color: string;
  delay: number;
}

const cubes: Cube[] = [
  {
    color: "bg-gradient-to-br from-primary/60 to-primary_pink/60",
    delay: 0.1,
  },
  {
    color: "bg-gradient-to-br from-tertiary/60 to-tertiary_pink/60",
    delay: 0.2,
  },
  {
    color: "bg-gradient-to-br from-secondary/60 to-secondary_pink/60",
    delay: 0.4,
  },
  {
    color: "bg-gradient-to-br from-tertiary/60 to-tertiary_pink/60",
    delay: 0.6,
  },
  {
    color: "bg-gradient-to-br from-primary/60 to-primary_pink/60",
    delay: 0.8,
  },
];

const Loading = () => {
  return (
    <div id="home" className="w-full text-center">
      <div className="max-w-[1240px] w-full h-screen mx-auto p-2 flex justify-center items-center">
        <div className="flex justify-center items-center h-screen">
          {cubes.map((cube, index) => {
            return (
              <motion.div
                key={index}
                className={`cube mx-4 w-10 h-10 rounded-lg ${cube.color}`}
                animate={{
                  scale: [1, 1.1, 1, 1.1, 1],
                  y: [0, 40, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: cube.delay,
                }}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Loading;
