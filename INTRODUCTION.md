# Frontend Challenge Submission

Based on the Upgrade's frontend challege description provided [here](https://github.com/upgrade/frontend-challenge), I have submitted the solution to the challenge on the fork [here](https://github.com/ughazi/frontend-challenge).

#### Additional Libraries/NPM Packages used to complete this challenge
- [React Router v6](https://reactrouter.com/en/main) - A client-side routing library.
- [React Loader Spinner](https://mhnpd.github.io/react-loader-spinner/) - Provides SVG React Components to show user a loading state.

#### Concepts/Code Explained

 - As mentioned in the instructions, this app consists of multi step form to collect the user data.
 - Each step of the form is built as a separate React component.
 - Each of these React components are displayed on different routes and live in their own individual folders in the `components` folder.
 - The routes are declared and mapped in the `src/components/Routing/Routing.js` file using the React Router's `Route` component. 
 - The state of the form data is maintained in a global `UserDataContext` in the `src/contexts/UserData.context.js` file. This helps the user to move back and forth between different routes/components without losing the entered/selected values and to reset the state to initial value when the `Restart` button is clicked on the `Success` or `Error` components. The `UserDataContext` exposes the state variables and their respective setter functions via a context provider.
 - The user's input and selected choices are persisted/cached into the browser's local storage to help the user to get the information back in the case browser is reloaded or something goes wrong during the any of the steps of the user input. 
 - The user input values on the `Signup` component are validated using HTML5 validation so that the user can't move forward without entering the expected values.
 - The colors for the drop down on the `MoreInfo` component are retrieved from the local api provided in the challenge when the component gets mounted. While the colors are being fetched, a loading indicator is displayed instead of the dropdown to let the user know of an in-flight request.
 - On the `Confirmation` component, the user data is submitted to the local api's `submit` route and a loading indicator is displayed while the request is being processed. Based on the status code received from the response the user is either navigated to the `Success` or `Error` component. 
 - For reusability, I abstracted out the logic of making network calls using the fetch API into its own `useFetch` hook (`src/hooks/useFetch.hook.js`).
 - On both the `Success` and `Error` components, the user can click `Restart` button to be navigated back to base `/` route. This also resets the `UserDataContext` data to let the user start over.
 - Each component is unit tested and their test/spec files live under the same folder.
