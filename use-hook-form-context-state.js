import React, { useCallback, useEffect } from "react";

/**
 * Author: Akshay Chavan
 * useHookFormContextState - A custom hook for managing and persisting state variables
 * within the React Hook Form context, especially useful for deeply nested forms.
 *
 * @param {Object} control - The control object from React Hook Form.
 * @param {string} path - Path to the object that you want to set inside the Hook Form Context.
 * @param {*} defaultValue - Default value that should be set initially.
 * @returns {[any, function]} - Returns an array where the first element is the value,
 * and the second is a function to set the value.
 *
 * @example
 * const { control } = useForm();
 * const [username, setUsername] = useHookFormContextState(control, 'username', '');
 */
export const useHookFormContextState = (control, path, defaultValue) => {
  if (
    !control ||
    typeof control.watch !== "function" ||
    typeof control.setValue !== "function"
  ) {
    throw new Error(
      "Invalid control object. Make sure to pass the control object from useForm."
    );
  }

  if (typeof path !== "string" || path.trim() === "") {
    throw new Error("Path must be a non-empty string.");
  }

  const { watch, setValue } = control;

  const value = watch(path) || defaultValue;

  useEffect(() => {
    if (value === undefined) {
      setValue(path, defaultValue);
    }
  }, [path, defaultValue, value, setValue]);

  const updateValue = useCallback(
    (update, ...params) => {
      try {
        if (typeof update === "function") {
          const newVal = update(...params); // Call the given function and set the value we get as output
          setValue(path, newVal);
        } else {
          setValue(path, update);
        }
      } catch (error) {
        console.error(`Failed to update value for path "${path}":`, error);
      }
    },
    [path, setValue]
  );

  return [value, updateValue];
};

export default useHookFormContextState;
