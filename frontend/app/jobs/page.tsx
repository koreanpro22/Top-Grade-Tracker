
async function getJobs() {
    const res = await fetch('/jobs')

    if(res.ok){
        const data = res.json()
        return data
    }

}

export default function Home() {
    return (
      <h1>TESTING jobs Again</h1>
    );
  }
