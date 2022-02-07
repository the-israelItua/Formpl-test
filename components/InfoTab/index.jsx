import Icon from "../Icons";
import styles from "./infotab.module.scss";

const InfoTab = () => {
  return (
    <div className={styles.infoTab}>
      <Icon id="InfoIcon" />
      <p>
        Tada! Get started with a free template. Can’t find what you are looking
        for? Search from the 1000+ available templates
      </p>
    </div>
  );
};

export default InfoTab;
