
# AddressVault

A comprehensive address management application featuring Google Maps integration to provide location based functionality. 

# Features
• User registration and authentication (login/logout)

• Create, read, update, and delete address records

• Google Maps integration for precise location display

• Address validation and autocomplete using Google Autocomplete

• Search and sort by name and date

# Getting Started
## Prequisites
• Node.js and npm must be installed

• MongoDB instance (local or cloud)

## Installation

Clone the repository

```git
  git clone https://github.com/ritz10001/AddressVault.git
```
Install the dependencies for frontend and backend

```git 
    cd AddressVault/address-book-application/client
    npm install
```
```git
    cd AddressVault/address-book-application/server
    npm install
```

# Running the application
## 1. Start the backend server
```git
    npm run dev
```
## 2. Start the frontend client
```git
    cd ../client
    npm run dev
```

# Usage Instructions
• Register a new user by either clicking on 'Get Started' or 'Register'. You will see a confirmation message if the user is created successfully.

![homepagescrnshot](https://github.com/ritz10001/AddressVault/assets/87536301/c8370c9f-6d84-477e-825c-b5a3cdc5a742)

![Screenshot (451)](https://github.com/ritz10001/AddressVault/assets/87536301/aca547de-01a4-46a9-a64e-bac3251757f0)

![Screenshot (452)](https://github.com/ritz10001/AddressVault/assets/87536301/9448b171-ecb7-41bb-91c6-1fb2897fb49a)

• Once you have created an account, log in with that account.

![Screenshot (453)](https://github.com/ritz10001/AddressVault/assets/87536301/782f93a0-6b4a-43be-986b-a30e9f563671)


• Add, edit, or delete address records by using the add, edit or delete buttons respectively. 

• While adding or editing addresses, you must select from one of the suggestions the autocomplete provides under the address line field. This is how the address the validated so that no fake addresses can be created.


![Screenshot (455)](https://github.com/ritz10001/AddressVault/assets/87536301/9c08352d-4183-405d-b909-fd3d8f4dec84)
![Screenshot (456)](https://github.com/ritz10001/AddressVault/assets/87536301/5cf273dc-d745-49f7-96b4-f47aac899637)
![Screenshot (457)](https://github.com/ritz10001/AddressVault/assets/87536301/c6261a24-1dc6-4081-8b8e-873abb898d03)

• Use the search bar and sort functionality button to manage addresses. You can sort by name and date at which the record was created.

• View full address information with a map display by clicking directly on the address record. This is where the map displays as well at the bottom.

![Screenshot (458)](https://github.com/ritz10001/AddressVault/assets/87536301/e681ea03-6aea-4fda-b49f-042433b07520)

• Clicking on the user option on the navbar will give some basic user information such as email and name of the currently logged in user. 

• You can easily log out in just one click by clicking the logout button on the navbar.
    
# API Reference 
## User Endpoints
### Register a new user

```http
  POST /user/register
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `Fullname` | `string` | **Required**.  |
| `Email` | `string` | **Required**.  |
| `Username` | `string` | **Required**.  |
| `Password` | `string` | **Required**.  |

### Login an existing user

```http
  POST /user/login
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `Username`      | `string` | **Required**. |
| `Password`      | `string` | **Required**. |

#### Response
| Parameter | Type     | 
| :-------- | :------- | 
| `AccessToken` | `jwt_token` |

## Address Endpoints
### Get all addresses
```http
  GET /vault
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `Authorization` | `Bearer jwt_token` | **Required**

#### Response
| Parameter | Type     | 
| :-------- | :------- | 
| `_id` | `string` |
| `name` | `string` |
| `email` | `string` |
| `addressLine1` | `string` |
| `addressLine2` | `string` |
| `city` | `string` |
| `state` | `string` |
| `postalCode` | `string` |
| `country` | `string` |
| `phone` | `string` |
| `createdAt` | `string` |
| `updatedAt` | `string` |

## Create a new address

```http
  POST /vault
```
#### Headers

| Headers | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `Authorization` | `Bearer jwt_token` | **Required**

#### Request Body

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `name` | `string` | **Required**
| `email` | `string` | **Required**
| `addressLine1` | `string` | **Required**
| `addressLine2` | `string` | *Optional*
| `city` | `string` | **Required**
| `state` | `string` | **Required**
| `postalCode` | `string` | **Required**
| `country` | `string` | **Required**
| `phone` | `string` | **Required**

#### Response
| Parameter | Type     | 
| :-------- | :------- | 
| `_id` | `string` |
| `name` | `string` |
| `email` | `string` |
| `addressLine1` | `string` |
| `addressLine2` | `string` |
| `city` | `string` |
| `state` | `string` |
| `postalCode` | `string` |
| `country` | `string` |
| `phone` | `string` |
| `createdAt` | `string` |
| `updatedAt` | `string` |

### Update an address

```http
  PUT /vault/{id}
```

#### Headers

| Headers | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `Authorization` | `Bearer jwt_token` | **Required**

#### Path Parameters
| Parameters | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `string` | **Required**

#### Request Body
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `name` | `string` | *Optional*
| `email` | `string` | *Optional*
| `addressLine1` | `string` | *Optional*
| `addressLine2` | `string` | *Optional*
| `city` | `string` | *Optional*
| `state` | `string` | *Optional*
| `postalCode` | `string` | *Optional*
| `country` | `string` | *Optional*
| `phone` | `string` | *Optional*

#### Response

| Parameter | Type     | 
| :-------- | :------- | 
| `_id` | `string` |
| `name` | `string` |
| `email` | `string` |
| `addressLine1` | `string` |
| `addressLine2` | `string` |
| `city` | `string` |
| `state` | `string` |
| `postalCode` | `string` |
| `country` | `string` |
| `phone` | `string` |
| `createdAt` | `string` |
| `updatedAt` | `string` |

### Delete an address

```http
  DELETE /vault/{id}
```

#### Headers

| Headers | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `Authorization` | `Bearer jwt_token` | **Required**

#### Path Parameters
| Parameters | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `string` | **Required**
