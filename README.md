
# Trybe Futebol Clube

This is a project designed for a soccer website, it is a full dockerized app.

<details>
<summary><strong>Stacks used</strong></summary>
```
  TypeScript, MYSQL, MOCHA, CHAI, EXPRESS, JSONWEBTOKEN, SINON, BCRYPT, JOI, SEQUELIZE, HTTP-STATUS-CODES
```
</details>



<details>
  <summary><strong>Turning the app on</strong></summary>

  ## Run it on docker (LINUX)

  Clone the project

  ```
    git clone git@github.com:xafixav/trybe-futebol-clube.git
  ```

  Go to the project directory

  ```
    cd trybe-futebol-clube
  ```

  Start the server

  ```
    npm run compose:up
  ```

    <details>
    <summary><strong>If you want to turn it off</strong></summary>

    ## Stop the server

    ```
      npm run compose:down
    ```

    </details>

</details>


<details>
  <summary><strong>Connecting to the app</strong></summary>

  ## The website will be hosted on 
  ```
  localhost:3000
  ```

  ## The backend will be hosted on 
  ```
  localhost:3001
  ```

</details>

  <details>
    <summary>
      Endpoints
    </summary>
    
  ## API Reference

```js
      {
        username: 'Admin',
        role: 'admin',
        email: 'admin@admin.com',
        password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW', // secret_admin
      },
      {
        username: 'User',
        role: 'user',
        email: 'user@user.com',
        password: '$2a$08$Y8Abi8jXvsXyqm.rmp0B.uQBA5qUz7T6Ghlg/CvVr/gLxYj5UAZVO', // secret_user
      },
```

#### Login

```http
  POST /login
```

| Body | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `email` | `string` | **Required**. Your Email |
| `password` | `string` | **Required**. Your password |

#### Get Matches

```http
  GET /matches
```

## Readme :construction:

Sorry for the unfinished readme, I`ll finish soon as possible.
If you wanna know more endpoints, please check the routes files.
```
  cd app && cd backend && cd src && cd Routes
```
Every file in this folder, contains the route and the methods it will call. (Controller methods)

  </details>
