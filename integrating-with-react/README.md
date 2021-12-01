# Integrate the Media Comparison Component with React

### How to Run After Cloning this Repository

1. Go to the project's root directory and change directory to the web component npm package's directory.
    
    ```sh
    $ cd npm-component
    ```

2. Create a symlink in your global `node_modules` folder
    ```sh
    $ npm link
    ```
    This creates an npm package on your machine called media-comparison-component. Note that package-name is taken from package.json, not from the directory name. You can read more about this [here](https://docs.npmjs.com/cli/v8/commands/npm-link/).

3. Create a sample React application using [create-react-app](https://reactjs.org/docs/create-a-new-react-app.html) in your desired location.
    ```sh
    $ npx create-react-app sample-app
    ```

4. Change directory to your sample app and link the `media-comparison-component` to the application.
    ```sh
    $ npm link media-comparison-component
    ```

5. Open `src/App.js` in your sample application and import the `media-comparison-component`. 
    ```js
    import logo from './logo.svg';
    import './App.css';
    
    import 'media-comparison-component';
    
    function App() {
        return (
            //... HTML code (omitted for conciseness)
        );
    }
    export default App;
    ```
 
6. Use your custom element in `src/App.js`.
    ```js
    import logo from './logo.svg';
    import './App.css';
    
    import 'media-comparison-component';
    
    function App() {
        return (
            <media-comparison
                // make sure these files exist in your sample app's public folder
                beforeSrc="./assets/videos/before.mp4"
                afterSrc="./assets/videos/after.mp4"
                mediaType="video"
            ></media-comparison>
        );
    }
    
    export default App;
    ```
    > Don't forget to add your video assets to the ./public/ folder for this application and replace the value for beforeSrc and afterSrc below with the appropriate file directory!

7. All done! You can now run your sample app in your browser by using the command below.
    ```sh
    $ npm start
    ```

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
