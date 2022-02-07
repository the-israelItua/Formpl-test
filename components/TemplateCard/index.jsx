import styles from "./templatecard.module.scss";
import Link from "next/link";

const TemplateCard = ({ item }) => {
  return (
    <div className={styles.templatecard}>
      <div className={styles.templatecard__top}>
        <h4>{item.name}</h4>
        <p>{item.description}</p>
      </div>
      <div className={styles.templatecard__footer}>
        <Link href={item.link}>
          <a>Use Template</a>
        </Link>
      </div>
    </div>
  );
};

export default TemplateCard;
