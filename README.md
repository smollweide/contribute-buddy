# WIP Contribute buddy

> Contribute buddy helps your contributors to understand your project. It makes sure the contributor have read everything which is important. It uses the readme files in your project to collect a CLI UI guided tour through it. In case of an readme had changed or an new one was added every contributor will be informed about it.

## Install

```
$ npm install contribute-buddy
```

## Usage

```
$ contribute-buddy init
```

Init will add `contribute-buddy run` to `prestart` and `postinstall` in your package.json.
Also the `.contributebuddy` directory will be added.
