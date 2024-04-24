export const fetchUser = async (num: number) => {
  const res = await fetch(`http://localhost:8000/api/users/${num}`, {
    method: "GET",
  });

  if (res.ok) {
    const data = await res.json();
    return data;
  }
};

export const fetchJobs = async () => {
    const res = await fetch(`http://localhost:8000/api/jobs/getall`, {
        method: "GET"
    });

    if (res.ok) {
        const data = await res.json();
        return data;
    }
};

export const fetchJob = async (num: number) => {
    const res = await fetch(`http://localhost:8000/api/jobs/${num}`, {
        method: "GET"
    });

    if (res.ok) {
        const data = await res.json();
        return data;
    }
};


export const getAllUsers = async () => {
  const res = await fetch(`http://localhost:8000/api/users/getall`, {
    method: "GET",
  });

  if (res.ok) {
    const data = await res.json();
    return data;
  }
};
