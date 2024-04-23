import NavBar from "../components/nav";

interface User {
  name: string;
  email: string;
  profilePicture: string;
  isAdmin: boolean;
  phone: string;
}

export default async function Employees() {

  const res = await fetch("http://localhost:8000/api/users/getall");
  const allUsers = await res.json();

  function handleSubmit() {

  }

  return (
    <div className="container">
      <NavBar />
      <div>All Employees</div>

      <div className="employee-cards">
        {allUsers.map((user: User) => {
          return (
            <div className="single-employee-card">
              <p>{user.name}</p>
              {user.profilePicture ? (
                <img src={user.profilePicture}></img>
              ) : (
                <img
                  style={{ width: "40px" }}
                  src="https://cdn-icons-png.freepik.com/256/1077/1077114.png?semt=ais_hybrid"
                ></img>
              )}
              <p>Email: {user.email}</p>
              <p>Phone: {user.phone}</p>
            </div>
          );
        })}
      </div>
      <div>Add Employee</div>
      <form className="add-employee-form-container">
        <input></input>
      </form>
    </div>
  );
}
