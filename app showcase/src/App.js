import { Download, Features, SectionWrapper } from "./components";
import assets from "./assets";
import styles from "./styles/Global";

const App = () => {
  return (
    <>
      <SectionWrapper
        title="Welcome to Rhythm - Yours Music Companion 🎵"
        description="Discover a whole new dimension of music with our feature-packed React Native Expo app, carefully crafted with TypeScript to deliver a seamless and enjoyable user experience."
        showBtn
        mockupImg={assets.homeHero}
        banner="banner"
      />
      <SectionWrapper
        title="Key Features"
        description="Embark on a personalized musical journey with our app's key features. Explore a curated list of Recommended Songs, tailored to your unique taste through our sophisticated algorithm. Easily navigate through a myriad of genres using the intuitive Sidebar Modal, enabling you to set the mood for any occasion. The Search Page ensures a seamless discovery experience, allowing you to find specific songs or artists swiftly. Build your musical haven in the Liked Page, where your favorite tracks are saved with a simple tap of the heart icon, ready to play whenever you desire. Dive into a world where music meets your preferences effortlessly, offering a dynamic and enjoyable listening experience."
        mockupImg={assets.homeCards}
        reverse
      />
      <Features />
      <Download />

      <div className="px-4 py-2 justify-center items-center bg-primary flex-col text-center banner04">
        <p className={`${styles.pText} ${styles.whiteText}`}>
          <span class="bold text-sm">
            © {new Date().getFullYear()} Rhythm™. All Rights Reserved.
          </span>
        </p>
      </div>
    </>
  );
};

export default App;
