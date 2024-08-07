import styles from "./style";
import {
  Business,
  CTA,
  Footer,
  Navbar,
  Stats,
  Testimonials,
  Hero,
  Steps,
  Output,
  Home,
  Info,
  Carousel
} from "./components";

const App = () => (
  <div className="bg-primary w-full overflow-hidden">
    <div className={``}>
      <div className={`${styles.boxWidth}`}>
        <Navbar />
      </div>
    </div>

    <div className={`bg-primary ${styles.flexStart}`}>
      <div className={`${styles.boxWidth}`}>
        <Hero />
      </div>
    </div>

    <div className={`bg-primary ${styles.paddingX} ${styles.flexCenter}`}>
      <div className={`${styles.boxWidth}`}>
        <Stats />
        <Business />
        <Steps />
        <Carousel />
        <Home />
        <Info />
        <Output />
        <Testimonials />
        <CTA />
        <Footer />
      </div>
    </div>
  </div>
);

export default App;
