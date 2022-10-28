# Books - React,Redux,Sanctum
---
author: Shaon Majumder
date: 18-10-2022
---

## Features
### User Features
- Authentication
- Data Vizualization
- CRUD (Unimplemented)
- Search (Unimplemented)

### Dev Features
- Authentication (Bearer Token Based, Context Based)
- CRUD (Redux Based)
- Structered API Axios
- Redux tool kit query (rtk-query)
    - fetching data rtk-query, Redux createApi endpoints
    - Passing parameters in RTK query
    - set Header Conditionally by passing hookstate by getState
    - rtk-query pagination
    - conditional fetching data rtk-query
- React Design
    - Pagination Custom Component
    - React-Bootstrap 
        - Table
        - Responsive Breakpoint Specific
        - Pagination
        - Button

    - How to store the result of query from createApi in a slice (unimplemented)


    change classname conditionally react







* conditional fetching createApi( react-redux 

### Next Features
private & protected routes

## Technologies Used
- Laravel
    * Sanctum
- React
- Redux

## Quick Run
open bash
```bash
cd auth-api
php artisan serve
```
open another bash
```bash
cd auth-client
yarn install
yarn start
```

## Dependencies
```bash
yarn add react-redux
yarn add @reduxjs/toolkit
yarn add react-bootstrap bootstrap
yarn add react-router-dom
yarn add sweetalert2
```

Adding FontAwesome
```bash
yarn add @fortawesome/fontawesome-svg-core
yarn add @fortawesome/free-solid-svg-icons
yarn add @fortawesome/react-fontawesome
```

## Books
Create Symbolic link
php artisan storage:link

## Backend 
```bash
composer create-project laravel/laravel auth-api
cd auth-api
composer require laravel/sanctum
code .
```
Edit app/Http/Kernel.php :
```php
'api' => [
            \Laravel\Sanctum\Http\Middleware\EnsureFrontendRequestsAreStateful::class,
            'throttle:api',
            \Illuminate\Routing\Middleware\SubstituteBindings::class,
        ],
```

Edit config/cors.php :
```php
'allowed_origins' => [env('FRONTEND_URL','http://localhost:3000')], //['*']
'supports_credentials' => true, //false
```

database/factories/UserFactory :
```php
​ 'password' => bcrypt('12345678'), // '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
```

Edit database/seeders/DatabaseSeeder.php :
```php
public function run(){
        User::insert([
            'name' => 'Global Admin',
            'email' => 'admin@admin.com',
            'email_verified_at' => now(),
            'password' => bcrypt('12345678'),        
            'remember_token' => Str::random(10),
        ]);   
        User::factory(10)->create();
    }

​ }
```
Generate Environment File
```bash
cp .env.example .env
```

Edit .env
```env
FRONTEND_URL=http://localhost:3000
DB_DATABASE=auth
DB_USERNAME=root
DB_PASSWORD=12345678
SESSION_DRIVER=cookie
SESSION_DOMAIN='.localhost'
SANCTUM_STATEFUL_DOMAINS='localhost,127.0.0.1'
```

Prepare Serve
```bash
php artisan key:generate
php artisan migrate:fresh --seed
php artisan serve
```

to kill a specified port process - 
ubuntu
```bash
sudo fuser -k port_number/tcp
```
<br>
<br>

Mac<br>
To get Pid -
```
netstat -vanp tcp | grep 3000
or
lsof -i tcp:3000
```
To kill with pid
```
kill -9 <pid>
```

### Errors
if you use autoload files helpers,
```php
"autoload": {
        "psr-4": {
            "App\\": "app/",
            "Database\\Factories\\": "database/factories/",
            "Database\\Seeders\\": "database/seeders/"
        },
        "files": [
            "app/Helpers/helpers.php"
        ]
    },
```
then run on backend:
composer dump-autoload

## FrontEnd
```bash
git clone https://github.com/unlikenesses/sanctum-react-spa 
mv sanctum-react-spa auth-client
cd auth-client
```

Run Application
```bash
yarn install
yarn start
```

set axio header for global :
```javascript
headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": "true",
        "Access-Control-Allow-Origin" : "http://localhost:3000"
    }
```



### Error Handling
- if ERR_OSSL_EVP_UNSUPPORTED Error :
Go to package.json and change
`react-scripts start`
To
`react-scripts --openssl-legacy-provider start`

- If failed  GET https://localhost:8000/sanctum/csrf-cookie net::ERR_CONNECTION_CLOSED
Check laravel console log, if Invalid request (Unsupported SSL request)
Change 
https://127.0.0.1:8000
To
http://127.0.0.1:8000

- Login Route Cors Error :
if endpoint is http://localhost:8000/login
It is heating on web route, to get api route
change  http://localhost:8000/api/login

- If your application sends 200 for success, Change 204 to 200 for success status code

- Logout Route Cors Error :
if endpoint is http://localhost:8000/logout
It is heating on web route, to get api route
change  http://localhost:8000/api/logout

- For Logged in or auth:sanctum route :
check urls have api/endpoint; Set headers for every authorized url :

apiClient.post('api/logout',[],{
      headers : {
        'Authorization' : `Bearer ${Cookies.get('access_token')}`
      }
    })
- For reading cookie properly -
yarn add js-cookie



### Research
- React Context State Management
https://www.freecodecamp.org/news/react-context-for-beginners/
- Redux Data Management
- React UseAuth Hook
https://hooks.reactivers.com/use-auth

- createApi react redux
    * https://redux-toolkit.js.org/rtk-query/api/createApi<br>
    * https://blog.openreplay.com/fetching-data-in-redux-using-rtk-query/<br>
    * https://redux-toolkit.js.org/rtk-query/usage/queries#frequently-used-query-hook-return-values
    * https://redux-toolkit.js.org/rtk-query/usage/pagination
    * Passing parameters in RTK query - https://stackoverflow.com/questions/69499487/rtk-query-pagination-and-combine-queries
    * set Header Conditionally by passing hookstate by getState - https://redux-toolkit.js.org/rtk-query/api/fetchBaseQuery
    * conditional fetching createApi( react-redux - https://redux-toolkit.js.org/rtk-query/usage/conditional-fetching
    * useSelector, useContext, createContext
- change classname conditionally react - https://www.pluralsight.com/guides/applying-classes-conditionally-react
- Passing State of Parent to Child Component as Props - https://www.pluralsight.com/guides/passing-state-of-parent-to-child-component-as-props
- Javascript Extracting Variables From Arrays And Objects With Object Destruction - https://webmobtuts.com/javascript/javascript-extracting-variables-from-arrays-and-objects-with-object-destruction/
- display none react - https://stackoverflow.com/questions/37728951/how-to-css-displaynone-within-conditional-with-react-jsx
- acess hooks - https://egghead.io/lessons/react-access-state-with-the-redux-useselector-hook
- How to Pass Data between React Components - https://www.pluralsight.com/guides/how-to-pass-data-between-react-components
- extra reducers - https://redux-toolkit.js.org/rtk-query/usage/examples#using-extrareducers
- handling events - https://reactjs.org/docs/handling-events.html

- React-Bootstrap
    - React-bootstrap Table - https://react-bootstrap.github.io/components/table/
    - React-bootstrap Pagination - https://react-bootstrap.github.io/components/pagination/
    - React-bootstrap Button - https://react-bootstrap.github.io/components/buttons/

- React Syllabus
    * mutation and immutaion
    * arrow and defined function
    * component lifecycle
    * state lifecycle
    * variable and state variable
    * state behavior / variable behavior with virtual DOM
    * Event Loop
    * Hooks
    * Redux

Next To Learn
    - placing pagination buttons
    - https://stackoverflow.com/questions/68612556/how-to-store-the-result-of-query-from-createapi-in-a-slice

    - https://redux.js.org/tutorials/essentials/part-8-rtk-query-advanced
    - https://reactjs.org/docs/hooks-custom.html
    - https://react-redux.js.org/api/hooks
    
    - https://codeburst.io/global-state-with-react-hooks-and-context-api-87019cc4f2cf
    - https://www.thisdot.co/blog/creating-a-global-state-with-react-hooks
    - https://endertech.com/blog/using-reacts-context-api-for-global-state-management
    - https://www.basefactor.com/global-state-with-react
    - https://stackoverflow.com/questions/69675357/react-what-is-the-proper-way-to-do-global-state
    - global state outside component react
    - https://reactjs.org/docs/hooks-state.html
    - https://redux.js.org/tutorials/fundamentals/part-6-async-logic
