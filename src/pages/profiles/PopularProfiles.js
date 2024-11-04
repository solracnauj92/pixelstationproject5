import React from "react";
import { Container, Card } from "react-bootstrap";
import appStyles from "../../App.module.css";
import Asset from "../../components/Asset";
import { useProfileData } from "../../contexts/ProfileDataContext";
import Profile from "./Profile";
import logo from "../../assets/logo.png";

const PopularProfiles = ({ mobile }) => {
  const { popularProfiles } = useProfileData();

  return (
    <Container
      className={`${appStyles.Content} ${
        mobile && "d-lg-none text-center mb-3"
      }`}
    >
      <Card className={`${appStyles.Content} mt-4 border-0`}>

<Card.Body className="text-center"> 

  <img 

    src={logo} 

    alt="Pixel Station Logo" 

    className="mb-3" 

    style={{ width: "300px", height: "auto" }} 
  />

  <Card.Text>

    Welcome to PixelStation, your hub for gaming news, reviews, and community discussions! 
    <br></br>
    <br></br>

    Stay updated, connect, and explore 

    new adventures. <br></br> <br></br>
    
    Join us for exclusive events and more!

  </Card.Text>


</Card.Body>

</Card>

      {popularProfiles.results.length ? (
        <>
          <h4>Top Gamers</h4>
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
    </Container>
  );
};

export default PopularProfiles;