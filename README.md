# CS HAVEN

This is a full-stack web application for students to share their projects and carry out discussions.

Built with every cool aspect in Next.js 13.

> **Warning**
> This app is a work in progress. I will probably deploy it later on for students to test it.

## Features 

- API Routes using **Next.js Api Routes**
- Authentication using **NextAuth.js**
- ORM using **Prisma**
- Styling using **Tailwind CSS**
- Donating using **Stripe**
- Validations using **Zod**
- Written in **TypeScript**
- UI components built using **shadcn**

## Roadmap (Kind of the functional requirements)

- [x] ~Authentication.~
- [x] ~Creating and joining communities.~
- [x] ~Creating posts (project posts and discussion posts).~
- [x] ~Displaying posts in user feed. (Both logged in and not logged in).~
- [x] ~Commenting on posts and other peoples comments.~
- [x] ~Voting for posts and comments in discussions.~
- [x] Search functionality.
- [x] Donations (Might take a while to get into).

## Running Locally

#### Prerequisites (If you want to create a copy of the site)

* Node v14 +.
* Database of your choice.
* NextAuth secret.
* Google cloud provider credentials.
* Github provider credentials.
* Uploadthing credentials.
* Upstash Redis credentials.

1. Clone the repository.

2. Install dependencies.

   ```sh
   npm install
    ```

   If you're using yarn:

   ```sh
   yarn
   ```

3. Copy `.env.example` to `.env` and update the variables.  

4. Start the development server:

   ```sh
   npm run dev
   ```
   Or if you're using yarn:

   ```sh
   yarn dev
   ```
