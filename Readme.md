# Books - React.Redux,Sanctum
---
author: Shaon Majumder
date: 18-10-2022
---

## Features
- Authentication (Bearer Token Based, Context Based)
- CRUD (Redux Based)

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
yarn add react-redux
yarn add @reduxjs/toolkit

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
```bash
sudo fuser -k port_number/tcp
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
- Slate
https://qomarullah.medium.com/create-api-docs-using-slate-3b90565333d0
- Clean Code
https://refactoring.guru/refactoring/smells
- React Context State Management
https://www.freecodecamp.org/news/react-context-for-beginners/
- Redux Data Management
- React UseAuth Hook
https://hooks.reactivers.com/use-auth
- React CV Inspiration
    * https://github.com/tasmidur/react-resume
    * https://tasmidur.netlify.app/
    * https://react-resume-rho.vercel.app/