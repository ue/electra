<p align="center"><img align="center" src="http://i63.tinypic.com/27zkuwg.png"/></p>

<h1 align="center"> Electra Desktop App </h1>

<p align="center"> Save your test accouns and use easy! </p>

<p align="center"> Why you still keep on notepad? This app build for instead of notepad! </p>
<p align="center"><img align="center" src="https://media.giphy.com/media/3ov9jZovC5UqLk9xIY/giphy.gif"/></p>

### Downloading And Installing

[Download for MacOs](http://.com)

[Download For Windows](http://.com)

[Download For Linux](http://.com)

Whatever your system if, you can choose appropriate to download it. And install so easy.

### How it works

You can add your account just click the line and add, after than click clipboard button and copy your account id or password.

All data save your local storage. Don`t worry about it.

## Install & Run

First, clone the repo via git:

```bash
git clone --depth=1 https://github.com/ue/electra your-project-name
```

And then install dependencies with yarn.

```bash
$ cd your-project-name
$ yarn
```

Start the app in the `dev` environment. This starts the renderer process in [**hot-module-replacement**](https://webpack.js.org/guides/hmr-react/) mode and starts a server that sends hot updates to the renderer process:

```bash
$ gulp electra
```
May need `sudo `

Now you ready to code.
  
Happy coding!

* **Note: requires a node version >= 7 and an npm version >= 4.**
* **If you have installation or compilation issues with this project, please see [our debugging guide](https://github.com/ue/electra/issues)**

## How to create package

Package for all platforms
```gulp package ```

For OSx

```gulp package-osx ```

For Windows

```gulp ackage-windows ```

For Linux

```gulp package-linux' ```


## How to keep the app updated

If your application is a fork from this repo, you can add this repo to another git remote:

```sh
git remote add upstream https://github.com/ue/electra.git
```

Then, use git to merge some latest commits:

```sh
git pull upstream master
```

## License
MIT © [UE](https://github.com/ue)
