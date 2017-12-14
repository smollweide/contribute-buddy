# Contribute buddy

> In every project rules and best practices are written down **but** not everyone read them. Also something could change while developing and you need to make sure every contributor is informed about the change. Contribute buddy will solve this for you and makes sure everyone had read the documentation and everyone will be informed about updates in the documentation.

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
