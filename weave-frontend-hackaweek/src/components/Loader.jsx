import { motion } from "framer-motion";
export default function Loader() {
  let strings = [
    "For he who can wait, everything comes in time 🚀🚀.",
    "We will wait to see if it is a doozy before we decide how to cover it, and what it all means🍕.",
    "We need to talk about what we are going to do and see and decide. We'll have to wait and see🚲🚲.",
  ];

  let rand = strings[Math.floor(Math.random() * strings.length)];
  return (
    <div id="container" class="loading">
      <motion.div
        transition={{ ease: "linear", duration: 2 }}
        id="loading-text"
        class="loading-text"
      >
        {rand}
      </motion.div>
      <span class="loader"></span>
    </div>
  );
}
