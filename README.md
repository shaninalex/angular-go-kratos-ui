# Angular Kratos Ui

This is example of implementation [Kratos](https://github.com/ory/kratos) ui with
Angular framework. Here I was trying to replicate default [Kratos Node UI](https://github.com/ory/kratos-selfservice-ui-node)
forms.

## Start

```bash
make start

cd frontend
npm run start
```

### Architecture
![Alt text](./docs/images/app-architecture.png "App Architecture")

## Important
Current configuration has open `kratos:4433` public port. Later I'll hide it by `oathkeeper` and handle forms submittions by `beckend` service
