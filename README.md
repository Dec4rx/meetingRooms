
# Meeting Rooms Management
Uses Laravel as backend and React as frontend.

- Has auth routes with laravel passport.
- Tests for the routes.
- Creation of CRUD for the boardroom
- A meeting room must be reserved with a range of initial and final times.
- You cannot reserve meeting rooms that are occupied.
- You cannot reserve a meeting room for more than 2 hours.
- The meeting room must be released when the reservation time expires.
- The meeting room can be released manually before finishing.

# IMPORTANT
- You need to install Laravel Passport: https://laravel.com/docs/11.x/passport#main-content
- The project is in development mode, so you need to use "npm run dev" to run it after installing all dependencies.
- A server like Appache is also necessary, I used XAMPP with the root folder of the project in htdocs (that's why the paths in the frontend have that format).
