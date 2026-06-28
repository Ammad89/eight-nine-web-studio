
  # EHRay Photography

  This is a code bundle for EHRay Photography. The original project is available at https://www.figma.com/design/Ay2aiPhQawdDg3jrnHQAgf/EHRAYPHOTOGRAPHY.

  ## Running the code

  Run `npm i` to install the dependencies.

  Run `npm run dev` to start the development server.

  ## Dashboard backend setup

  The `/dashboard` route uses Supabase for secure login, database storage, and image uploads.

  1. Create a Supabase project.
  2. Run `supabase/schema.sql` in the Supabase SQL editor.
  3. Create the client dashboard user in Supabase Auth.
  4. Add that user's email to `public.admin_users`.
  5. Copy `.env.example` to `.env` and fill in the project URL and anon key.
  6. Add the same environment variables to the deployed site.

  Draft content is stored in the private `draft` row. Published pages are stored in the public `published` row. The media bucket allows public reads for website images, while uploads and edits are limited to approved dashboard admins.
  
