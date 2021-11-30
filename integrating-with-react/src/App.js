import logo from './logo.svg';
import './App.css';
import 'media-comparison-component'

function App() {
  return (
      <media-comparison
        beforeSrc="./assets/videos/before.mp4"
        afterSrc="./assets/videos/after.mp4"
        mediaType="video"
      ></media-comparison>
  );
}

export default App;
