// "use client";

import NavBar from "../components/nav";

interface User {
  name: string;
  email: string;
  password: string;
  profilePicture: string;
  isAdmin: boolean;
  phone: string;
}

export default async function Employees() {
  // const employees = await fetch('/users/getall');
  // console.log(employees)

  const res = await fetch("http://localhost:8000/api/users/getall");
  const allUsers = await res.json();
  //   console.log(allUsers.json());

  return (
    <div className="homepage-container">
      <NavBar />
      <div>All Employees</div>
      {allUsers.map((user: User) => {
        return (
          <div className="employee-card">
            <div>
              <p>{user.name}</p>
              {user.profilePicture ? (
                <img src={user.profilePicture}></img>
              ) : (
                <img style={{width: "40px"}} src="https://cdn-icons-png.freepik.com/256/1077/1077114.png?semt=ais_hybrid"></img>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
