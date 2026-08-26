import type { NewsSection } from "@/data/news/news";

const section: NewsSection = {
  heading: `Mobile App`,
  anchor: `mobileApp`,
  paragraphs: [
    `Streamline Your Workflow On the Go - Axon Ivy has released a new version of the Axon Ivy Mobile App.`,
    `New Code, New Design, lots of functionalities!`,
    `Install the App for iOS and Android now:`,
  ],
  features: [
    {
      term: `Native iOS & Android App`,
      description: `Experience smooth performance and tailored design on both major mobile platforms. The app's compatibility with iOS and Android ensures seamless integration and user-friendly operation.`,
    },
    {
      term: `Work Beyond the Office`,
      description: `The app is perfect for mobile use cases like construction sites, elevator maintenance, and other on-the-go scenarios. You can work on your tasks in any environment, giving you the freedom to work from wherever your business takes you.`,
    },
    {
      term: `Native Access to Camera and Other Mobile Functions`,
      description: `Take full advantage of your device's built-in features, including the camera, GPS, and other mobile tools. Capture images, scan documents, and leverage other capabilities directly from the app to streamline your workflow and enhance productivity.`,
    },
    {
      term: `Offline Tasks Capability`,
      description: `Stay productive even when you're off the grid with offline task management. This feature ensures you can continue working on tasks, projects, and processes without interruption, regardless of network connectivity.`,
    },
    {
      term: `Demo Mode`,
      description: `Explore the app's full range of capabilities with its convenient demo mode. Test out all features and functions right now firsthand to see how it can elevate your processes.`,
    },
  ],
  links: [
    {
      label: `Android App`,
      url: `https://play.google.com/store/apps/details?id=com.axonivy`,
    },
  ],
  images: [
    `11.3/mobile-app/01-mobile-app.png`,
    `11.3/mobile-app/02-mobile-app.png`,
    `11.3/mobile-app/03-mobile-app.png`,
    `11.3/mobile-app/04-mobile-app.png`,
    `11.3/mobile-app/05-mobile-app.png`,
    `11.3/mobile-app/06-mobile-app.png`,
  ],
  code_sample: null,
};

export default section;
