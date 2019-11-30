# jwt-authorizer

JWT API Gateway Lambda Authorizer 🚥

## Architecture

This project deploys an [API Gateway Lambda Authorizer](https://docs.aws.amazon.com/apigateway/latest/developerguide/apigateway-use-lambda-authorizer.html) that any Lambda function can use to authenticate requests.

Requests authenticate using a cookied JWT token. [SSM Parameter Store](https://docs.aws.amazon.com/systems-manager/latest/userguide/systems-manager-parameter-store.html) holds the private key used to [encode](src/token.ts) and [authenticate](src/index.ts) the JWT token.

## Private key

> ⚠️ Install the AWS CLI and set up your credentials before continuing.

Rotate or set up a new private key:

```bash
npm run rotate
```

## JWT token

Generate a new token from the command line:

```bash
npm run token -- "token subject"
```

See [`token.ts`](src/token.ts) for an example of generating the token programmatically.

## Cookie

Once you've generated the token, set it to a cookie named `token`.

## Authenticate

Add an [authorizer entry](https://serverless.com/framework/docs/providers/aws/events/apigateway#http-endpoints-with-custom-authorizers) to an HTTP endpoint in your `serverless.yml` config:

```yaml
functions:
  create:
    handler: posts.create
    events:
      - http:
          path: posts/create
          method: post
          authorizer:
            name: jwtAuthorizer
            arn:
              "Fn::ImportValue": jwtAuthorizer-0-1-0
            identitySource: method.request.header.Cookie
            type: request
```

## Deploy

Deploy to the `dev` stage:

```bash
npm run deploy
```

Deploy to the `prod` stage:

```bash
npm run deploy -- --stage=prod
```

## Build your own project

Generate this project with your own naming by running [boiler](https://github.com/winton/boiler):

```bash
npm i -g @fn2/boiler
mkdir my-project; cd my-project
boiler
```

Then select "JWT authorizer" under "New project".
