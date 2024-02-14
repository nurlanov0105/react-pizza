export const getUserFromLS = () => {
   const data = localStorage.getItem("user");

   if (data) {
      const { name, email, id, token } = JSON.parse(data);

      return {
         name,
         email,
         token,
         id,
      };
   }

   return {
      name: null,
      email: null,
      token: null,
      id: null,
   };
};
