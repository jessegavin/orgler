# Run the app locally

    npm install
    npm run dev
    
## Notes

I tried to keep this simple. I avoided server-side rendering, Babel, ES6 & JSX, keeping dependencies to a minimum.

## Next steps / considerations

 - Add more features
    - Include repository detail information in the list.
    - Include repository star & watch count.
 - Write unit tests
 - Make the UI look better. Kind of "meh" at the moment.
 - Think further about how to host script and style assets. (Currently using cdnjs for some assets)
 - Use a linter (lots of formatting issues currently)
 - Use a css preprocessor (or css modules)
 - Use authenticated github account to bypass api rate limiting
 - Routing is currently very simplistic. Consider [react-router](https://github.com/reactjs/react-router)
