import { useState } from "react";

export function useInput(initValue) {
  const [value, setValue] = useState(initValue);
  const [error, setError] = useState(false);

  const handleChange = (event) => {
    const nValue = event.target.value;

    if (nValue.length <= 0) {
      setError(true);
    } else {
      setValue(nValue);
      setError(false);
    }
  };

  return [value, handleChange, error];
}

export function usePassword(initValue) {
  const [value, setValue] = useState(initValue);
  const [error, setError] = useState(false);

  const handleChange = (event) => {
    const nValue = event.target.value;

    if (nValue.length <= 7) {
      setError(true);
    } else {
      setValue(nValue);
      setError(false);
    }
  };

  return [value, handleChange, error];
}

export function useOTP(initValue) {
  const [value, setValue] = useState(initValue);
  const [error, setError] = useState(false);

  const handleChange = (event) => {
    const nValue = event.target.value;

    if (nValue.length <= 5) {
      setError(true);
    } else {
      setValue(nValue);
      setError(false);
    }
  };

  return [value, handleChange, error];
}

export function useMobileNumber(initValue) {
  const [value, setValue] = useState(initValue);
  const [error, setError] = useState(false);

  const handleChange = (event) => {
    const nValue = event.target.value;

    if (nValue.length < 10) {
      setError(true);
    } else {
      setValue(nValue);
      setError(false);
    }
  };

  return [value, handleChange, error];
}

export function usePinCode(initValue) {
  const [value, setValue] = useState(initValue);
  const [error, setError] = useState(false);

  const handleChange = (event) => {
    const nValue = event.target.value;

    if (nValue.length < 6) {
      setError(true);
    } else {
      setValue(nValue);
      setError(false);
    }
  };

  return [value, handleChange, error];
}

export function useEmail(initValue) {
  const [value, setValue] = useState(initValue);
  const [error, setError] = useState(false);

  const handleChange = (event) => {
    const pattern = /^([a-zA-Z0-9._%+-]+)@([a-zA-Z0-9-]+)\.([a-zA-Z]{2,})$/;

    const nValue = event.target.value;

    if (!pattern.test(nValue)) {
      setError(true);
    } else {
      setValue(nValue);
      setError(false);
    }
  };

  return [value, handleChange, error];
}
