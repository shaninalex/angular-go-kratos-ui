
# Ng commands

This is a bunch of useful commands for `ng`
( I'm always forget them and manually creating them. )

```bash
# create empty workspace
ng new frontend --create-application=false --directory=.

# create ui library
ng generate library ui --prefix=kr

# create library lib mostly for types and functions
ng generate library lib --prefix=lib

# create client
ng generate application client --prefix=kr

# root path will be src/app/
ng generate module pages --project=client --routing
# after this command module will be created in:
# <project root>/client/projects/client/src/app/pages

ng generate component pages/home --skip-tests --style=none
# create component in this path:
# <project root>/client/projects/client/src/app/pages/home/home.component.ts
```