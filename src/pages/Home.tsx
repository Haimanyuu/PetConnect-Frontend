import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="app-container bg-gradient">
      <div className="card home-card animate-fade-in">
        <h1 className="title animate-slide-down">🐾 PetConnect</h1>
        <p className="subtitle animate-slide-up">
          Connecting Hearts, One Paw at a Time.
        </p>
        <div className="btn-group">
          <button onClick={() => navigate("/signup")} className="btn btn-primary animate-hover">
            Get Started
          </button>
          <button onClick={() => navigate("/login")} className="btn btn-secondary animate-hover">
            Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
