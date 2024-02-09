export const handleShowPassword = (e) => {
  const inputHook = document.getElementsByName("password")[0];
  if (inputHook.type === "password") {
    inputHook.type = "text";
  } else {
    inputHook.type = "password";
  }
};
