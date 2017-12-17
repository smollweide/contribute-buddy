# Contribute buddy [![build status](https://img.shields.io/travis/smollweide/contribute-buddy/master.svg)](https://travis-ci.org/smollweide/contribute-buddy)

> In every project rules and best practices are written down **but** not everyone read them. Also something could change while developing and you need to make sure every contributor is informed about the change. Contribute buddy will solve this for you and makes sure everyone had read the documentation and everyone will be informed about updates in the documentation.

![kapture 2017-12-17 at 17 23 59](https://user-images.githubusercontent.com/2912007/34081584-242f35a6-e34f-11e7-8a82-dbb37d66c96c.gif)

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

## How does it work
Contribute buddy collect all readme files in the project and split them into sections and topics by using the `h1` and `h2` headlines. These sections and topics will be displayed in the cli before start (and after install) if you didn't read them before and nothing had changed. The reading history will be stored in your filesystem (user directory).

## Shields
[![coverage status](https://coveralls.io/repos/github/smollweide/contribute-buddy/badge.svg?branch=master)](https://coveralls.io/github/smollweide/contribute-buddy?branch=master)
[![npm](https://img.shields.io/npm/v/contribute-buddy.svg)](http://npm.im/contribute-buddy)
[![downloads](https://img.shields.io/npm/dm/contribute-buddy.svg)](https://npm-stat.com/charts.html?package=contribute-buddy)
[![MIT License](https://img.shields.io/npm/l/contribute-buddy.svg)](http://opensource.org/licenses/MIT)
[![Codestyle](https://img.shields.io/badge/codestyle-namics-green.svg)](https://github.com/namics/eslint-config-namics)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

## License

MIT © [Simon Mollweide](https://github.com/smollweide)
