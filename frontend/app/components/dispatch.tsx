const fetchUser = async (num: number) => {
    const res = await fetch(`http://localhost:8000/api/users/${num}`, {
        method: "GET"
    });

    if (res.ok) {
        const data = await res.json();
        return data;
    }
};

export default fetchUser;
