import styles from "../style";
import Button from "./Button";

const Info = () => (
  <section className={`${styles.flexCenter} ${styles.marginY} ${styles.padding} sm:flex-row flex-col bg-black-gradient-2 rounded-[20px] box-shadow`}>
    <div className="flex-1 flex flex-col">
      <h4 className={styles.heading2}>Safe Content Database</h4>
      <p className={`${styles.paragraph} `}>
      Our Safe Content Database maintains a repository of reviewed and approved content, ensuring a safe and secure viewing experience for all users. This database is continuously updated to keep your content safe and appropriate.
      </p>
    </div>
  </section>
);

export default Info;
