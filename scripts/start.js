const startGame = () => {
  const name = document.getElementById("name").value.trim();
  const savedName = localStorage.getItem("CurrentPlayerTicTacName");

  if (name && name !== savedName) {
    localStorage.setItem("CurrentPlayerTicTacName", name);
  } else if (!name && !savedName) {
    localStorage.setItem("CurrentPlayerTicTacName", "You");
  }

  document.getElementById("welcome-message").textContent = `Welcome, ${
    name || "You"
  }! Ready to play?`;
};

window.onload = () => {
  const savedName = localStorage.getItem("CurrentPlayerTicTacName");
  if (savedName && savedName !== "You") {
    document.getElementById("name").value = savedName;
    document.getElementById(
      "welcome-message"
    ).textContent = `Welcome back, ${savedName}! Ready to play again?`;
  }
};
