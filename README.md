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
- PostgreSQL 15 (Provided by [Neon](https://neon.tech))
- [TypeScript 5](https://typescriptlang.org)
- Icons by [lucide](https://lucide.dev) and [simple-icons](https://simpleicons.org/)
- Auth by [next-auth 4](https://next-auth.js.org/)
- UI by [Radix Primitives](https://www.radix-ui.com/) and [shadcn/ui](https://ui.shadcn.com/)
- Styled with [Tailwind 3](https://tailwindcss.com/)
- [Playwright](https://playwright.dev/) for E2E tests

### WIP

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

### Testing Locally

If you want to test the app locally, and you have used Playwright before, you can simple test the app with `npx playwright test`.

If you haven't used Playwright before, or you are in an unsupported platform (Arch Linux, for example), you can use the Docker image to run the tests.

```bash
# build the image locally (sudo is required)
npm run test:setup

# with the image built you can run the tests whenever you want
npm run test:e2e
```

## Features

- You can create a "quick poll" without an account.
- Anyone can vote and check results of the polls. This results are updated in real time.
- You can share the poll with a link.
- You can create your account to create and manage your own polls.
  - You can add title and description to your polls.
  - You can add time limits to your polls.
  - You can add a password to your polls.

### Technical Objectives

Zeus will use Next.js and React Server Components. The flow is fairly straignforward. To add **spicy** to the mix, we'll use Websockets to update the results in real time. This technology is new to me, but Next and React is not.

The motivation of this project is to learn and showcase as part of my portfolio. I expect this project to be a good initial point to any fullstack application with scalable code and good practices.

## Contributing

Feel free to contribute to this project. You can open an issue or a pull request. If you want to add a new feature, please open an issue first to discuss it.
