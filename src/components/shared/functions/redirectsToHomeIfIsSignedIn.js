function redirectsToHomeIfIsSignedIn(navigate) {
    const token = localStorage.getItem("token");

    if (token) {
        alert("Você já fez o login, saia da conta atual para criar uma nova!");
        navigate("/");
    };
};

export default redirectsToHomeIfIsSignedIn;