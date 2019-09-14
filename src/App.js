import React, { useState } from 'react';
import styled from 'styled-components'
const CLIENT_ID = '25a6312cd0379dbf2b4d8fce66d4f112';

const StyledApp = styled.div`
    font-family: 'Roboto';
    background: linear-gradient(to bottom, #fc4a1a, #f7b733); 
    min-height:100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
`;

const StyledSpan = styled.span`
   font-size: 48px;
   color: white;
`;

const StyledInput = styled.input`
    background-color: white;
    width: 40%;
    height: 40px;
    border-radius: 4px;
    border: none;
    padding: 0 20px;
    outline: none;
    transform: scale(${props => props.image ? '1' : '2'});
    transition: all 0.3s ease-in-out;
    &::placeholder {
      color: #DDDDDD;
    }
`;

const StyledImg = styled.img`
    height: 300px;
    width: 300px;
`;

const StyledFooter = styled.span`
   font-size: 12px;
   color: white;
`;

function App() {
  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);

  async function fetchArtwork(e) {
      try {
        const trackURL = e.target.value;
        let response = await fetch(`https://api.soundcloud.com/resolve?url=${trackURL}&client_id=${CLIENT_ID}`)
        if (!response.ok) {
          throw Error(response.statusText);
        }
        let track = await response.json()
        setImage(track.artwork_url.replace("large", "t500x500"));
        console.log(`Got URL ${track.artwork_url} from track ${track.title}`)
      } 
      catch (err) {
        console.log(err);
        setImage(null);
      }
  }

  return (
    <StyledApp>
        <StyledSpan>Download any Soundcloud artwork easily</StyledSpan>
        <StyledInput type="text" placeholder="Your Soundcloud URL here" onChange={fetchArtwork} image={image}/>
        {image && <StyledImg src={image} />}
        {error && <span>
            {error}
          </span>}
          <StyledFooter>Made with love by Hugo Massing</StyledFooter>
    </StyledApp>
  );
}

export default App;
