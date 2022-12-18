import { Paper } from "@mui/material";

const Profile = () => {
  return (
    <div className="dashboard">
      <div className="profile-container">
        <Paper
          sx={{
            display: "flex",
            justifyContent: "center",
            width: "50%",
            height: "50%",
            flexDirection: "column",
            margin: "10rem",
          }}
        >
          <h1>Profile</h1>
        </Paper>
      </div>
    </div>
  );
};

export default Profile;
