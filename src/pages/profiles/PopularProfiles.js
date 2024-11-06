import React from "react";
import { Button, Container, Card } from "react-bootstrap";
import Asset from "../../components/Asset";
import { useProfileData } from "../../contexts/ProfileDataContext";
import Profile from "./Profile";
import logo from "../../assets/logo.png";

const PopularProfiles = ({ mobile }) => {
  const { popularProfiles } = useProfileData();

  return (
    <Container
      className={`${mobile && "d-lg-none text-center mb-3"}`} // Remove appStyles.Content
      style={{
        backgroundColor: "transparent", // Ensures no background color
        padding: 0, // Remove any default padding from Container
      }}
    >
      {/* Individual Welcome Section */}
      <Card className="rounded shadow-sm mb-5 p-4 bg-white border-0">
        <Card.Body className="text-center">
          <img
            src={logo}
            alt="Pixel Station Logo"
            className="mb-3"
            style={{ width: "300px", height: "auto" }}
          />
          <Card.Text>
            Welcome to Pixel Station – your ultimate hub to share posts, dive into lively room discussions, join our forums, and explore a treasure trove of games!
          </Card.Text>
          <Button variant="primary" as="a" href="/forum" className="mt-3">
            Monthly Quest Forum
          </Button>
        </Card.Body>
      </Card>

      {/* Individual Top Gamers Section */}
      <Card className="rounded shadow-sm p-4 bg-white border-0">
        <h2 className="text-center font-weight-bold text-uppercase mb-4">Top Gamers</h2>

        {popularProfiles.results.length ? (
          <>
            {mobile ? (
              <div className="d-flex justify-content-around">
                {popularProfiles.results.slice(0, 4).map((profile) => (
                  <Profile key={profile.id} profile={profile} mobile />
                ))}
              </div>
            ) : (
              popularProfiles.results.map((profile) => (
                <Profile key={profile.id} profile={profile} />
              ))
            )}
          </>
        ) : (
          <Asset spinner />
        )}
      </Card>
      
    </Container>
  );
};

export default PopularProfiles;
