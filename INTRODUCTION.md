# Frontend Challenge Submission

Based on the Upgrade's frontend challege description provided [here](https://github.com/upgrade/frontend-challenge), I have submitted the solution to the challenge on the fork [here](https://github.com/ughazi/frontend-challenge).

#### Additional Libraries/NPM Packages used to complete this challenge
- [React Router v6](https://reactrouter.com/en/main) - A client-side routing library.
- [React Loader Spinner](https://mhnpd.github.io/react-loader-spinner/) - Provides SVG React Components to show user a loading state.

#### Concepts/Code Explained

 - As mentioned in the instructions, this app consists of multi step form to collect user data.
 - Each step of the form is built as a separate React component.
 - Each of these React components are displayed on different routes and live in their own individual folders in the `components` folder.
 - The routes are mapped in the `src/components/Routing/Routing.js` file using the React Router's `Route` component. 
 - The state of the form data is maintained in a global `UserDataContext` in the `src/contexts/UserData.context.js` file. This helps to move back and forth between different routes/components without losing the entered/selected values and to reset the state to initial values when the `Restart` button is clicked on the `Success` or `Error` components. The `UserDataContext` exposes the state variables and their respective setter functions via context provider.
 - The user input values on the `Signup` component are validated using HTML5 validation so that the user can't move forward without entering expected values.
 - The colors for the drop down on the `MoreInfo` component are fetched from the local api provided in the challenge when the component gets mounted. While the colors are fetched, a loading indicator is displayed instead of the dropdown to let the user know of a pending request.
 - On the `Confirmation` component, the user data is submitted to the local api's `submit` route and a loading indicator is displayed while the request is being processed. Based on the status code received from the response the user is either navigated to the `Success` or `Error` component. 
 - On both the `Success` and `Error` components, the user can click `Restart` button to be navigated back to base `/` route. This also resets the `UserDataContext` data to let the user start over.

#### Future Improvements
- The features built were based on the time recommendation and the requirements/wireframes in the instructions.
- With more time, the User Interface (UI) could be improved by adding more styles etc. 
- The code quality can be improved by adding unit tests. 