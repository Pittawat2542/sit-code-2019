# SIT Code 2019 Website

A website for SIT Code 2019, coding competition by SIT, KMUTT.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Installing

Clone the project and run the script to install all dependencies.

```
yarn
```

Install `knex` 

```
yarn global add knex
```

Change directory to `server`

```
cd server
```

Migrate the database

```
knex migrate:latest
```

If you want the seed data, run the script (only available in `development` mode)

```
knex seed:run
```

Change directory back to the project

```
cd ..
```

Start the project with

```
yarn start
```


## Versioning

We use [SemVer](http://semver.org/) for versioning.

## Authors

* **Pittawat Taveekitworachai**


## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details
