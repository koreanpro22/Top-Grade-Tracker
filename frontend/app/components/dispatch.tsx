export const fetchUser = async (email: string | undefined) => {
  const res = await fetch(`http://localhost:8000/api/users/${email}`, {
    method: "GET",
  });

  if (res.ok) {
    const data = await res.json();
    return data;
  } else if (res.status < 500) {
    const data = await res.json();
    return data.errors
  } else {
    return res
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

