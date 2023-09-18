# CS HAVEN

This is a full-stack web application for students to share their projects and carry out discussions.

Built with every cool aspect in Next.js 13.

> **Warning**
> This app is a work in progress. I will probably deploy it later on for students to test it.

>
> If you're a non-project member and you'd like to contribute to the project kindly use Github pull requests. Consult 
> [GitHub Help](https://help.github.com/articles/about-pull-requests/) for more 
> information on using pull requests.

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
- [x] ~Search functionality.~

## Future functionalities

- [x] Users follow each other (Maybe).
- [x] Donations using stripe (Might take a while to get into).

## Running Locally

#### Prerequisites (If you want to create a copy of the site)

* Node v14 +.
* Database of your choice.
* NextAuth secret.
* Google cloud provider credentials.
* Github provider credentials.
* Uploadthing credentials.
* Upstash Redis credentials.
* Postmark credentials. (You can use any email provider you're comfortable with, make sure to adjust the auth.ts and .env accordingly)

1. Clone the repository.

2. Install dependencies.

   ```sh
   pnpm install
    ```

3. Copy `.env.example` to `.env` and update the variables.  

4. Start the development server:

   ```sh
   pnpm dev
   ```
