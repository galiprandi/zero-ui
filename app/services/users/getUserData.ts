export interface UserData {
  id: string;
  name: string;
  lastName: string;
  displayName: string;
  email: string;
  store: {
    code: number;
    name: string;
  };
  // Add more user data fields as needed
}

export function getUserData(): UserData {
  return {
    id: "1",
    name: "Juan",
    lastName: "Perez",
    displayName: "Juan Perez",
    email: "juan.perez@mail.com",
    store: {
      code: 5202,
      name: "Disco",
    },
  };
}
