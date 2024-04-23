import NavBar from "../components/nav";

export default function Jobs() {
  return (
    <div className="container">
      <NavBar />
      <div>All Jobs</div>
    </div>
  );
}

async function getJobs() {
    const res = await fetch('/jobs')

    if(res.ok){
        const data = res.json()
        return data
    }

}