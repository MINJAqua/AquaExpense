import { Paper, Typography } from "@mui/material";

const Profile = () => {
  return (
    <div className="dashboard">
      <div className="profile-container">
        <Paper
          sx={{
            display: "flex",
            justifyContent: "center",
            width: "70%",
            height: "50%",
            flexDirection: "column",
            margin: "10rem",
          }}
        >
          <Typography variant="h2" fontWeight={600}>
            Name
          </Typography>
          <p>HEllo</p>
        </Paper>
      </div>
    </div>
  );
};

export default Profile;
