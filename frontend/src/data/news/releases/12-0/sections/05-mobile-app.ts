import type { NewsSection } from "@/data/news/news";

const section: NewsSection = {
  heading: `Mobile App`,
  anchor: `mobileApp`,
  paragraphs: [
    `Streamline Your Workflow On the Go - Axon Ivy has released a new version of the Axon Ivy Mobile App.`,
    `New Code, New Design, More Functionality!`,
    `Install the App for iOS and Android now:`,
  ],
  features: [
    {
      term: `Native iOS & Android App`,
      description: `Smooth performance and an optimized design are provided across both major mobile platforms. Support for iOS and Android ensures a consistent, user-friendly experience on any device.`,
    },
    {
      term: `Work Beyond the Office`,
      description: `Ideal for mobile scenarios such as construction sites, elevator maintenance, and other field operations. Tasks can be managed from anywhere, providing the flexibility to work wherever needed.`,
    },
    {
      term: `Native Access to Camera and Other Mobile Functions`,
      description: `The app uses integrated device capabilities such as the camera and GPS to enhance functionality and enable the use of mobile tools within the app to improve workflow efficiency.`,
    },
    {
      term: `Offline Tasks Capability`,
      description: `Productivity is maintained even without an internet connection. Offline task capabilities ensure tasks, projects, and processes can continue without interruption, regardless of connectivity.`,
    },
    {
      term: `Demo Mode`,
      description: `All app capabilities can be explored in demo mode, allowing for firsthand testing to evaluate potential process improvements.`,
    },
  ],
  links: [
    {
      label: `Android App`,
      url: `https://play.google.com/store/apps/details?id=com.axonivy`,
    },
  ],
  images: [
    `12.0/mobile-app/01-mobile-app.png`,
    `12.0/mobile-app/02-mobile-app.png`,
    `12.0/mobile-app/03-mobile-app.png`,
    `12.0/mobile-app/04-mobile-app.png`,
    `12.0/mobile-app/05-mobile-app.png`,
    `12.0/mobile-app/06-mobile-app.png`,
  ],
  code_sample: null,
};

export default section;
