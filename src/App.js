import React, { useState } from 'react';
import styled from 'styled-components'

const CLIENT_ID = '25a6312cd0379dbf2b4d8fce66d4f112';

const StyledApp = styled.div`
    font-family: 'Roboto';
    background: linear-gradient(to bottom, #fc4a1a, #f7b733); 
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    color: white;
    padding: 0 50px;
    text-align: center;
`;

const StyledTitle = styled.span`
   font-size: 48px;
   margin: 60px 0 30px 0;
   text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.2);
`;

const StyledInput = styled.input`
    background-color: white;
    width: 40%;
    height: 40px;
    border-radius: 4px;
    border: none;
    padding: 0 20px;
    margin: ${props => props.image ? '30px' : '60px'} 0;
    outline: none;
    transform: scale(${props => props.image ? '1' : '2'}) translateZ(1px);
    transition: all 0.3s ease-out;
    box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.2);  
    &::placeholder {
      color: #DDDDDD;
    }
`;

const StyledImg = styled.img`
    height: 300px;
    width: 300px;
    margin-bottom: 20px;
`;

const ImgWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 10px;
`;

const StyledFooter = styled.span`
   font-size: 12px;
   color: white;
   margin-top: auto;
   padding: 30px;
   a {
      color: white;
   }
`;

function App() {
  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);

  async function fetchArtwork(e) {
      try {
        setError(null);
        const trackURL = e.target.value;
        if (trackURL === '') {
          setImage(null);
          return 
        };
        let response = await fetch(`https://api.soundcloud.com/resolve?url=${trackURL}&client_id=${CLIENT_ID}`)
        if (!response.ok) {
          if (response.status === 404) {
            throw Error('You didn\'t typed an URL or your track doesn\'t exists')
          } else if (response.status === 403){
            throw Error('Soundcloud does not allow your track artwork to be downloaded')
          }
        }
        let payload = await response.json()
        if (payload.kind !== 'track') {
          throw Error('Your URL is not a track')
        }
        setError(null);
        setImage(payload.artwork_url.replace("large", "t500x500"));
        console.log(`Got URL ${payload.artwork_url} from track ${payload.title}`)
      } 
      catch (err) {
        console.error(err);
        setError(err.message);
        setImage(null);
      }
  }

  return (
    <StyledApp>
        <StyledTitle>Download any Soundcloud artwork easily</StyledTitle>
        <StyledInput type="text" placeholder="Your Soundcloud URL here" onChange={fetchArtwork} image={image}/>
        <div>
          {image && <ImgWrapper>
            <StyledImg src={image} />
            <span>Right-click image to save</span>
          </ImgWrapper>}
          {error && <span>
            {error}
          </span>}
        </div>
        <StyledFooter>Made with love by Hugo Massing - Source on <a href="https://github.com/hugomassing/soundcloud-artwork">Github</a></StyledFooter>
    </StyledApp>
  );
}

export default App;
