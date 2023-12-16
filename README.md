This is a markdown pastebin created using nextjs. This is a clone of `rentry.co` markdown pastebin.

## First - Getting Started

Install the packages

```bash
npm install
# or
yarn install
```

## Second - Connect to your database

I am using `sqlite` in the project. if you want to use different database using prisma you can do that too. just follow the steps.

### Sqlite setup

> Keep the file as it is.

### Postgresql setup

- Remove prisma folder
- Remove .env file
- Generate new prisma and .env for postgresql
  - `npx prisma init` (It will generate new prisma.schema and .env files)
  - Open .env file and change the database URL to your postgresql database url.
  - Open prisma.schema file that you can find in prisma folder and change the code with `Postgresql: prisma.schema` code and save the file.
  - Run `npx prisma generate`
  - To open prisma studio run `npx prisma studio`
  - Now you can use this app with postgresql

#### Postgresql `prisma.schema`

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model Rentry {
  id            Int @id @default(autoincrement())
  content       String
  editCode      String
  alias         String @unique
  reserved      Boolean @default(false)

  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
}
```

### MongoDB setup

- Remove prisma folder
- Remove .env file
- Generate new prisma and .env for mongodb
  - `npx prisma init` (It will generate new prisma.schema and .env files)
  - Open .env file and change the database URL to your mongodb database url.
  - Open prisma.schema file that you can find in prisma folder and change the code with `MongoDB: prisma.schema` code and save the file.
  - Run `npx prisma generate`
  - To open prisma studio run `npx prisma studio`
  - Now you can use this app with mongodb

#### MongoDB `prisma.schema`

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "mongodb"
  url      = env("DATABASE_URL")
}

model Rentry {
  id            String @id @default(auto()) @map("_id") @db.ObjectId
  content       String
  editCode      String
  alias         String @unique
  reserved      Boolean @default(false)
}
```

### MySql setup

- Remove prisma folder
- Remove .env file
- Generate new prisma and .env for mysql
  - `npx prisma init` (It will generate new prisma.schema and .env files)
  - Open .env file and change the database URL to your mysql database url.
  - Open prisma.schema file that you can find in prisma folder and change the code with `MySql: prisma.schema` code and save the file.
  - Run `npx prisma generate`
  - To open prisma studio run `npx prisma studio`
  - Now you can use this app with mysql

#### MySql `prisma.schema`

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}

model Rentry {
  id            Int @id @default(autoincrement())
  content       String
  editCode      String @db.VarChar(50)
  alias         String @unique
  reserved      Boolean @default(false)

  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
}
```

## Third - Run the development server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

## 🚀 About Me

[@Praveen Prajapati](https://www.github.com/kumarPraveen08)
I'm a full stack developer.
