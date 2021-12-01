# Integrate the Media Comparison Component with Vue.js

### How to Run After Cloning this Repository

1. Go to the project's root directory and change directory to the web component npm package's directory.
    
    ```sh
    $ cd npm-component
    ```

2. Create a symlink in your global `node_modules` folder.
    
    ```sh
    $ npm link
    ```
    > This creates an npm package on your machine called media-comparison-component. Note that package-name is taken from package.json, not from the directory name. You can read more about this [here](https://docs.npmjs.com/cli/v8/commands/npm-link/).

3. Install the [Vue CLI](https://cli.vuejs.org/guide/creating-a-project.html#vue-create) if you don't already have it installed.
    
    ```sh
    $ npm install -g @vue/cli
    ```

4. Create a sample Vue application using [vue create](https://cli.vuejs.org/guide/creating-a-project.html#vue-create) in your desired location.
    
    ```sh
    $ vue create sample-app --default
    ```

5. Change directory to your Vue sample app and link the `media-comparison-component` to the application.
    
    ```sh
    $ npm link media-comparison-component
    ```

6. Replace `src/main.js` with the code sample below so that Vue doesn't consider your custom HTML element as a Vue component.
    
    ```js
    import Vue from 'vue'
    import App from './App.vue'
    
    Vue.config.productionTip = false
    
    // don't consider this custom element as a vue component
    Vue.config.ignoredElements = [ 'media-comparison-component' ]
    
    new Vue({
    render: h => h(App),
    }).$mount('#app')
    ```

7. Open `src/App.vue` and import the media-comparison-component npm package in the `<script>` tag.

    ```js
    //... omitted <template>
    
    <script>
    import HelloWorld from './components/HelloWorld.vue'
    import 'media-comparison-component'
    
    export default {
        name: 'App',
        components: {
            HelloWorld
        }
    }
    </script>
    
    //... omitted <style> tag
    ```

8. Use your custom element in the `<template>` tag in the same file (`src/App.vue`).

    ```js
    <template>
    <div id="app">
        <img alt="Vue logo" src="./assets/logo.png">
        <HelloWorld msg="Welcome to Your Vue.js App"/>
        <media-comparison
            beforeSrc="./assets/videos/before.mp4"
            afterSrc="./assets/videos/after.mp4"
            mediaType="video"
        ></media-comparison>
    </div>
    </template>
    
    //... omitted <script> tag
    
    //... omitted <style> tag
    ```

    > Don't forget to add your video assets to the ./public/ folder for this application and replace the value for beforeSrc and afterSrc below with the appropriate file directory.

9. All done! You can now run your sample app in your browser by using the command below.
    ```sh
    $ npm run serve
    ```
