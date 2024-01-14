# Zeus - Polls App

A polls app made with Next.js.

## Table of Contents

- [General Info](#general-info)
- [Technologies](#technologies)
- [Setup](#setup)
- [Features](#features)
- [Contributing](#contributing)

## General Info

This project is a simple polls app made in Next.js and React. It features a custom backend made in the `/api` folder. It's built on the `app` folder with React Server Components, including the latests features of Next 14.

## Technologies

- [Next.js 14](https://nextjs.org)
- [React 18](https://reactjs.org)
- [Prisma 5](https://prisma.io)
- PostgreSQL 15 (Provided by [Neon](https://neon.tech)))
- [TypeScript 5](https://typescriptlang.org)
- Icons by [lucide](https://lucide.dev) and [simple-icons](https://simpleicons.org/)
- Auth by [next-auth 4](https://next-auth.js.org/)
- UI by [Radix Primitives](https://www.radix-ui.com/) and [shadcn/ui](https://ui.shadcn.com/)
- Styled with [Tailwind 3](https://tailwindcss.com/)

### WIP

- Playwright for E2E tests
- Ably for real time updates

## Setup

If you want to run this project locally, make sure to have node 20+ installed. Clone the repo in your local machine by your preferred method.

After, copy the `.env.example` file to `.env`, and fill the variables with your own values. Install the dependencies, generate your Prisma types, and run the project.

```bash
# copy the .env.example file, and fill the variables with your own values
cp .env.example .env

# install the dependencies
npm install

# generate the prisma types and schema
npm run db:generate
npm run db:push

# run the project
npm run dev
```

**Note**: We don't use migrations in this project. We keep the "version" of the schema in the Git history. You can add/remove properties to the models and run the `db:push` command to update your database.

## Features

- You can create a "quick poll" without an account.
- Anyone can vote and check results of the polls. This results are updated in real time.
- You can share the poll with a link.
- You can create your account to create and manage your own polls.
  - By default, users can vote once. You can change this in the poll settings.
  - You can add title and description to your polls.
  - You can add time limits to your polls.
  - You can add a password to your polls.

## Contributing

Feel free to contribute to this project. You can open an issue or a pull request. If you want to add a new feature, please open an issue first to discuss it.
