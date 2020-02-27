# Foto - Serverless Social Photo App

A social photo app using [serverless framework](https://serverless.com/) and [Authing](https://authing.cn). This is a work in progress (see [issues](https://github.com/authing/foto/issues) for planned enhancements - help welcome!). It's a great app for learning and trying out Tencent Cloud and it is useful for managing your own photos.

## Demo

- link: [Foto](http://h0d7gjj-hko2zsj-1253396422.cos-website.ap-guangzhou.myqcloud.com)

![foto in chrome screenshot](https://cdn.authing.cn/blog/20200227122137.png)

Currently the foto serverless project includes:
- Web App (Vue)
- All resources defined and deployed using serverless framework Infra as Code
- [Authing](https://authing.cn) and [serverless-oidc](https://github.com/autthing/serverless-oidc) for auth
- [Strapi](https://strapi.io) for storage and API
- Tencent SCF for API and hosting website

## Requires

- Node 8.10.0 (matches Tencent Cloud env)
- yarn (or npm)
- serverless framework `yarn global add serverless`
- Authing account: [https://sign.authing.cn](https://sign.authing.cn)

## Deploy

You can deploy from your computer using the serverless CLI.

### Deploy Front-end

- `cd ./fe && npm install && cd ../`
- `sls --debug`

### Deploy API

- `cd ./serverless`
- `sls --debug`

## Local development

Local mocking of Tecent Cloud is fraught. I've stopped doing it as the upkeep is not worth the value I get. I prefer to deploy straight to cloud after thorough TDD locally.

## Front-end dev commands

- `npm run dev`

## API dev commands

- `sls --debug`

## Troubleshooting

Things will go wrong - with TencentC clou pretty much everything can be configured so there are a lot of moving parts. Guiding principles are:

- if something suddenly isnt working it's always user error
- Search for help, there are heaps of discussions at serverless forums and on stack overflow
- If you're stumped the problem is quite possibly not where you think it is. E.g

# Contributing

Yes! Do it.

Dev setup:
- use tslint
- editorconfig
- unit tests are awesome
- functional tests are superb
