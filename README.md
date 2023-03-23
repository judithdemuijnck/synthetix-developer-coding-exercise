# Synthetix Tech Assessment

## Instructions

### Node Version
- This task was completed using Node 16.16.0

### Installing the dependencies
- To install all dependencies, open this directory in a new shell and run the command
```
$ npm install
```

### Starting the application
- To start this application, open this directory in a new shell and run the command
```
$ npm start
```

### Running the tests
- To run the tests, open this directory in a new shell and run the command
```
$ npm test
```

### Viewing the application
- The application will be served from http://localhost:3000, open this in your browser

### Known Limitations
- **Testing:** While writing my tests, I noticed I couldn't mock axios within my getSearchResults function. I eventually traced it back to me creating an instance of axios in my App component, but mocking a different instance in my tests. I tried to export the instance to the tests as well, but since the instantiation is triggered by rendering the App, and we mock the instance *before* the first render, I still couldn't mock the instance. I think this issue is called dependency injection. After quite a while of trying to fix this problem, I acknowledged that this issue is too advanced for me to fix on my own. As I know it is best practice not to change your code in order to make a test pass, I therefore decided to leave my tests incomplete. Maybe we can find a solution together.

- **Summary:** Since there is no summary or preview property in the JSON response, I went back and forth as to how and what I wanted to display as a summary. My initial idea was to convert the answer to a string (using the html-to-text npm package, or maybe regex if I'm feeling adventurous) and then truncate the answer to 100 letters or so (using answer.slice). However, I noticed the format of answer is very inconsistent - sometimess it would be a few p elements, sometimes a div, sometimes an entire design including img and styling, so there was no way of creating a summary/preview that could reliably work for each answer. Since there was no summary on the help.synthetix.com website either, I therefore decided to use the category property instead.

- **Rendering HTML straight from the API:** By default, React does not allow to set HTML from code as this exposes the user to risks like cross-site scripting. You can override this by using dangerouslySetInnerHTML, which I have done for this exercise. As the answer format is so inconsistent for each response, I couldn't see any other way to display the answer except rendering the HTML straight from the response. I am, however, aware it is called *dangerously*SetInnerHTML for a reason.

- **React and env files:** Due to client-side rendering, there are no secret environment variables - they are embedded during the build, so are visible to the user. I stored the API keys in a .env file, but as mentioned, this does not make the keys secret or inaccessible to the user. Since you had publically exposed the API keys in your README, I assumed this solution would be ok. However, I would usually handle secret keys on the server-side.

### Next Steps
- **Testing:** As I said, I deliberately left my tests incomplete as I couldn't handle the dependency injection. If I had more time and/or someone to work with, this would be my next step.

- **Advanced error handling:** I have done basic error handling, but with a bit of guidance would love to learn what else I could do here to make my app more secure.


