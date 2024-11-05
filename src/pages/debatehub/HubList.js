import React, { useEffect, useState } from "react";
import { axiosReq } from "../../api/axiosDefaults"; 
import { Container, Row, Col, Card } from "react-bootstrap"; 
import Asset from "../../components/Asset"; 
import { Link } from "react-router-dom"; 

function HubList() { 
  const [hubs, setHubs] = useState([]); 
  const [hasLoaded, setHasLoaded] = useState(false); 

  useEffect(() => { 
    const fetchHubs = async () => { 
      try { 
        const { data } = await axiosReq.get("/debatehub/hubs/"); 
        setHubs(data.results); 
        setHasLoaded(true); 
      } catch (err) { 
        console.error("Error fetching hubs:", err); 
      } 
    }; 

    fetchHubs(); 
  }, []); 

  return ( 
    <Container> 
      <h1 className="text-center">Debate Hubs</h1> 
      <Row> 
        {hasLoaded ? ( 
          hubs.length ? ( 
            hubs.map((hub) => ( 
              <Col key={hub.id} xs={12} md={6} lg={4}> 
                <Link to={`/debatehub/hubs/${hub.id}/`}>  {/* Update the link here */}
                  <Card className="m-2"> 
                    <Card.Body> 
                      <Card.Title>{hub.name}</Card.Title> 
                      <Card.Text>{hub.description}</Card.Text> 
                      <Card.Text>
                        Created At: {new Date(hub.created_at).toLocaleDateString()} 
                      </Card.Text> 
                    </Card.Body> 
                  </Card> 
                </Link> 
              </Col> 
            )) 
          ) : ( 
            <Asset message="No hubs available." /> 
          ) 
        ) : ( 
          <Asset spinner /> 
        )} 
      </Row> 
    </Container> 
  ); 
}

export default HubList;
