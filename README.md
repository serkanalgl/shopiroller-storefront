

<div align="center">

<img  src="https://user-images.githubusercontent.com/1626923/137092657-fb398d20-b592-4661-a1f9-4135db0b61d5.png"  alt="Vue Storefront"  height="40px"  />

<img  src="https://www.shopiroller.com/wp-content/uploads/shopiroller_logo.png"  alt="Vue Storefront"  height="40px"  />

</div>

  

## Vue Storefront 2 integration with shopiroller

  



To learn how to build your integration, see our [Integration guide](https://docs.vuestorefront.io/v2/integrate/integration-guide.html).

  

------

  

<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->

<!-- ALL-CONTRIBUTORS-BADGE:END -->

  

## How to start if you want to try out the integration


```

yarn global add @vue-storefront/cli

```

  ```

git clone https://github.com/serkanalgl/shopiroller-storefront.git

```

```
** modify environment variables

cd shopiroller-storefront
cp .env.example .env
nano .env

```

```

 yarn dev

```

### Requirements:

- NodeJS v14 or later
  

### Steps

1. . Clone your the repo

```

example:

git clone https://github.com/serkanalgl/shopiroller-storefront.git

cd shopiroller-storefront


cd shopiroller-storefront
cp .env.example .env

nano .env
** modify shopiroller appKey&apiKey **

```

3. Run `yarn` to install dependencies

4. Build dependencies `yarn build:api-client && yarn build:composables`

5. Run `yarn dev:theme` to run theme. You can find other commands in `package.json`

6.  Run `yarn dev`

  

- If you need HMR on Api Client/Composables run `yarn dev:api-client` or `yarn dev:composables` on a separate terminal window.

  

## Resources

  

- [Vue Storefront Documentation](https://docs.vuestorefront.io/v2/)

- [shopiroller integration Documentation](https://docs.vuestorefront.io/shopiroller)

- [Community Chat](https://discord.vuestorefront.io)

  
  

## Contributors ✨

  

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->

  

<!-- ALL-CONTRIBUTORS-LIST:END -->

  

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!