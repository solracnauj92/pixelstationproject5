import React from "react";
import { Button, Container, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import Asset from "../../components/Asset";
import { useProfileData } from "../../contexts/ProfileDataContext";
import Profile from "./Profile";
import logo from "../../assets/logo.png";

const PopularProfiles = ({ mobile }) => {
  const { popularProfiles } = useProfileData();

  return (
    <Container
      className={`${mobile && "d-lg-none text-center mb-3"}`}
      style={{
        backgroundColor: "transparent",
        padding: 0,
      }}
    >
      {/* Individual Welcome Section */}
      <Card className="rounded shadow-lg mb-5 p-4 bg-white border-0">
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
      <Card className="rounded shadow-lg p-4 bg-white border-0 mb-5">
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

      {/* Newsletter Subscription Section */}
      <Card className="rounded shadow-lg p-4 bg-light border-0 text-center">
        <Card.Body>
          <h4 className="font-weight-bold mb-3">🎶 Stay Updated with Our Newsletter!</h4>
          <Card.Text>
            Upcoming Event: The official symphony concert world-tour <strong>Distant Worlds: Music from FINAL FANTASY</strong>. Subscribe now for the latest updates on concert dates, locations, and more exciting news!
          </Card.Text>
          <Button variant="success" as={Link} to="/newsletter" className="mt-3">
            Subscribe to our Newsletter
          </Button>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default PopularProfiles;
