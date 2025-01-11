import img1 from "../../assets/avatars/6.png";
import { motion } from "framer-motion";

export default function Member(props) {
  return (
    <motion.li
      animate={{ scale: 1 }}
      initial={{ scale: 0.5 }}
      transition={{ type: "spring", duration: 0.1 }}
      key={props.member}
    >
      <img src={img1} alt="member" />
      <div className="button" onClick={() => props.handleCross(props.member)}>
        x
      </div>
    </motion.li>
  );
}
