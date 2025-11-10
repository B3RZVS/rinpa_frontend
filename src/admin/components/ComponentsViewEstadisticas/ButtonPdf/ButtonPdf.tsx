import { motion } from "framer-motion";
import { FaFilePdf } from "react-icons/fa";
import styles from "./ButtonPdf.module.css";
type Props = {
  handleGenerate: () => void;
};

const ButtonPdf = ({ handleGenerate }: Props) => {
  return (
    <motion.button
      className={styles.pdfButton}
      onClick={handleGenerate}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <FaFilePdf />
      <span>PDF</span>
    </motion.button>
  );
};

export default ButtonPdf;
