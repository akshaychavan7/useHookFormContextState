
# useHookFormContextState
useHookFormContextState is a lightweight and efficient React hook designed to manage and persist state variables within the context of a React Hook Form. It simplifies state handling, ensuring seamless integration and improved maintainability of forms in your React applications.

## Features
- **Effortless State Management:** Easily maintain state variables within your React Hook Form context.
- **Lightweight:** Minimal overhead, making it ideal for performance-sensitive applications.
- **Seamless Integration:** Designed to work out-of-the-box with React Hook Form, requiring minimal setup.
- **TypeScript Support:** Built with TypeScript, providing strong typing and enhanced development experience.

## **Why useHookFormContextState?**

Managing forms in React can quickly become complex, especially when dealing with deeply nested structures. Traditionally, managing the state of such forms might require multiple state variables and extensive use of props drilling to pass these states down through the component tree. This approach can lead to bloated components, convoluted code, and increased maintenance overhead.

**useHookFormContextState** offers a streamlined solution by allowing you to maintain state directly within the context of your React Hook Form. Instead of managing numerous state variables and passing them down through layers of components, you can leverage this hook to manage your form's state at a central point. This results in cleaner, more readable code and a more intuitive form management experience.

### Similar to React's useState Hook

If you're familiar with React's `useState()` hook, you'll find **useHookFormContextState** very intuitive. It provides the same feel and usability:

-   **State Management**: Like `useState()`, **useHookFormContextState** returns an array with two elements: the current state value and a function to update that value.
    
-   **Ease of Use**: You can use it just like `useState()` but with the added benefit of integrating seamlessly with `react-hook-form`. This makes it easier to manage form-related state without lifting state up or drilling props down through deeply nested components.
    
-   **Context-Aware**: Unlike `useState()`, this hook is designed specifically for managing state within the `react-hook-form` context, ensuring that all state updates are consistent with the form's internal state.

## Installation
You can install the library via npm:

    npm install use-hook-form-context-state

## Usage
Here's how to use useHookFormContextState in a React component:

### Basic Example

    import React from 'react';
    import { useForm } from 'react-hook-form';
    import useHookFormContextState from 'use-hook-form-context-state';
    
    const MyForm = () => {
      const { control, handleSubmit } = useForm();
      const [username, setUsername] = useHookFormContextState(control, 'username', '');
    
      const onSubmit = data => {
        console.log(data);
      };
    
      return (
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            name="username"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
          <button type="submit">Submit</button>
        </form>
      );
    };
    
    export default MyForm;


###  Advanced Example: Deeply Nested Form Handling with State Exchange

Consider a scenario where you have a multi-step form for creating a user profile that includes nested components like `UserProfile`, `AddressForm`, and `CountrySelector`. The `CountrySelector` needs to update the `Country` value within the `AddressForm`, which is part of the larger `UserProfile` form. This setup would typically require complex state management and extensive props drilling, but with **useHookFormContextState**, the process is streamlined.

**UserProfileForm.js**

    import React from 'react';
    import { useForm } from 'react-hook-form';
    import AddressForm from './AddressForm';
    import PersonalInfoForm from './PersonalInfoForm';
    import useHookFormContextState from 'use-hook-form-context-state';
    
    const UserProfileForm = () => {
      const { control, handleSubmit } = useForm();
    
      // Centralized state management for the whole form
      const [profileName, setProfileName] = useHookFormContextState(control, 'profileName', '');
    
      const onSubmit = data => {
        console.log('User Profile Data:', data);
      };
    
      return (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label>Profile Name</label>
            <input
              name="profileName"
              value={profileName}
              onChange={e => setProfileName(e.target.value)}
            />
          </div>
          <PersonalInfoForm control={control} />
          <AddressForm control={control} />
          <button type="submit">Submit</button>
        </form>
      );
    };
    
    export default UserProfileForm;

**PersonalInfoForm.js**

    import React from 'react';
    import useHookFormContextState from 'use-hook-form-context-state';
    
    const PersonalInfoForm = ({ control }) => {
      const [firstName, setFirstName] = useHookFormContextState(control, 'firstName', '');
      const [lastName, setLastName] = useHookFormContextState(control, 'lastName', '');
    
      return (
        <div>
          <h3>Personal Information</h3>
          <div>
            <label>First Name</label>
            <input
              name="firstName"
              value={firstName}
              onChange={e => setFirstName(e.target.value)}
            />
          </div>
          <div>
            <label>Last Name</label>
            <input
              name="lastName"
              value={lastName}
              onChange={e => setLastName(e.target.value)}
            />
          </div>
        </div>
      );
    };
    
    export default PersonalInfoForm;

**AddressForm.js**

    import React from 'react';
    import useHookFormContextState from 'use-hook-form-context-state';
    import CountrySelector from './CountrySelector';
    
    const AddressForm = ({ control }) => {
      const [street, setStreet] = useHookFormContextState(control, 'address.street', '');
      const [city, setCity] = useHookFormContextState(control, 'address.city', '');
      const [country, setCountry] = useHookFormContextState(control, 'address.country', '');
    
      return (
        <div>
          <h3>Address Information</h3>
          <div>
            <label>Street</label>
            <input
              name="street"
              value={street}
              onChange={e => setStreet(e.target.value)}
            />
          </div>
          <div>
            <label>City</label>
            <input
              name="city"
              value={city}
              onChange={e => setCity(e.target.value)}
            />
          </div>
          <CountrySelector control={control} setCountry={setCountry} />
        </div>
      );
    };
    
    export default AddressForm;

**CountrySelector.js**

    import React from 'react';
    import useHookFormContextState from 'use-hook-form-context-state';
    
    const CountrySelector = ({ control, setCountry }) => {
      const [selectedCountry, setSelectedCountry] = useHookFormContextState(control, 'address.country', '');
    
      const handleCountryChange = e => {
        const country = e.target.value;
        setSelectedCountry(country);
        setCountry(country); // Update the parent state in AddressForm
      };
    
      return (
        <div>
          <label>Country</label>
          <select
            name="country"
            value={selectedCountry}
            onChange={handleCountryChange}
          >
            <option value="USA">USA</option>
            <option value="Canada">Canada</option>
            <option value="UK">UK</option>
          </select>
        </div>
      );
    };
    
    export default CountrySelector;

####  How it Works:

In this example, the `UserProfileForm` component manages the overall form structure, while `PersonalInfoForm` and `AddressForm` are nested components that handle specific sections of the form. The `CountrySelector` component, nested within `AddressForm`, is responsible for selecting and updating the country field.

The state for the `profileName`, `firstName`, `lastName`, `street`, `city`, and `country` fields is managed using **useHookFormContextState**. This hook allows each component to manage its state independently, while still being part of the same form context. When the country is selected in the `CountrySelector` component, it updates the state directly in the `AddressForm` component without needing to pass the state through multiple layers of props.

This approach keeps the code clean, maintainable, and avoids the common pitfalls of deeply nested forms, such as excessive props drilling and scattered state management.

### TypeScript Basic Example
    import React from 'react';
    import { useForm, Control } from 'react-hook-form';
    import useHookFormContextState from 'use-hook-form-context-state';
    
    type FormValues = {
      username: string;
      email: string;
    };
    
    const MyTypeScriptForm: React.FC = () => {
      const { control, handleSubmit } = useForm<FormValues>();
      const [username, setUsername] = useHookFormContextState<string>(control, 'username', '');
      const [email, setEmail] = useHookFormContextState<string>(control, 'email', '');
    
      const onSubmit = (data: FormValues) => {
        console.log(data);
      };
    
      return (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label>Username</label>
            <input
              name="username"
              value={username}
              onChange={e => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label>Email</label>
            <input
              name="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <button type="submit">Submit</button>
        </form>
      );
    };
    
    export default MyTypeScriptForm;

## API
### useHookFormContextState
**Parameters**
- **control (Control):** The control object from react-hook-form.
- **key (string):** A unique key for the state variable within the form.
- **initialValue (any):** The initial value for the state variable.
- **Returns [state, setState]:** Returns the current state and a function to update the state.

## Contributing
Contributions, issues, and feature requests are welcome! Feel free to check the [issues](https://github.com/akshaychavan7/useHookFormContextState/issues) page for any issues or open a new one.

## License
This project is licensed under the MIT License - see the [LICENSE](https://github.com/akshaychavan7/useHookFormContextState/blob/master/LICENSE) file for details.

##
&copy; [Akshay Chavan](https://www.linkedin.com/in/akshaychavan7/)
