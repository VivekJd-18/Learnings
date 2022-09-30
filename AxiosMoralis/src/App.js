import './App.css';
import axios from "axios";
import { useState, useEffect } from "react"

function App() {

  const [current, setCurrent] = useState([1, 2, 3, 4, 5, 6, 7, 8]);
  const [globalArray, setGlobalArray] = useState([]);



  const api = axios.create({
    baseURL: "https://jsonplaceholder.typicode.com/posts"
  })


  const option = {
    method: 'GET',
    url: 'https://deep-index.moralis.io/api/v2/nft/0x7e7a0a1B1aA966D9A2273192dfFc4eA4c625b8E7',
    params: { chain: 'mumbai', format: 'decimal' },
    headers: { accept: 'application/json', 'X-API-Key': 'test' }
  };

  const option2 = {
    method: 'GET',
    url: 'https://deep-index.moralis.io/api/v2/nft/0xeA9644dB153759d82Cc15b1fc43048E2725c9f72/owners',
    params: { chain: '0x5', format: 'decimal' },
    headers: { accept: 'application/json', 'X-API-Key': 'test' }
  };

  const option3 = {
    method: 'GET',
    url: 'https://deep-index.moralis.io/api/v2/nft/0xeA9644dB153759d82Cc15b1fc43048E2725c9f72/owners',
    params: { chain: '0x5', format: 'decimal' },
    headers: { accept: 'application/json', 'X-API-Key': 'test' }
  };


  const load1 = () => {
    axios
      .request(option)
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  const load2 = () => {
    axios
      .request(option2)
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  const load3 = (address) => {
    const local = []
    axios
      .request(option3)
      .then(function (response) {
        console.log(response.data);
        for (let i = 0; i < response.data.result.length; i++) {
          // setCurrent(response.data.result[i].owner_of)
          if (0x5082daa6d226718a7bb1f98c80625ea5c2a1d570 == response.data.result[i].owner_of) {
            // local.push(response.data.result[i])

            local.push({
              name: response.data.result[i].name,
              owner_of: response.data.result[i].owner_of,
              metadata: JSON.parse(response.data.result[i].metadata)?.image,
              token_id: response.data.result[i].token_id,
              token_uri: response.data.result[i].token_uri,
            })
            // setCurrent(local)
          }
        }
        setGlobalArray(local)
        // console.log(local);
        console.log("GlobalArray-=-=-=-=--", globalArray);
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  useEffect(() => {
    load3(0x5082daa6d226718a7bb1f98c80625ea5c2a1d570)
  }, [])


  // const loadAccountData = (acc) => {


  // }

  const ArrData = [1, 2, 3, 4, 5, 6, 7, 8]

  return (
    <div className="App">
      <button onClick={load1} className="btn btn-primary">get Contract NFTs</button>
      <button onClick={load2} className="btn btn-primary">get NFT Owners</button>
      <button onClick={load3} className="btn btn-primary">get NFT Owners(NFTrader)</button>

      <h1>Array 2</h1>
      <div className='ms-5 row text-center'>
      {globalArray.map(i => {
        return (
          <div className='col-4'>
          <div className='mt-4 App'>
            <div class="row row-cols-1 row-cols-md-3 g-4">
              <div class="col">
                <div class="card h-100 w-200" >
                  <img src={i.metadata} class="card-img-top " height={"250px"} width={"280px"} alt="..." />
                  <div class="card-body">
                    <h5 class="card-title">{i.name}</h5>
                    <p class="card-text">{i.owner_of}</p>
                    <p class="card-text">{i.token_uri}</p>
                  </div>
                  <div class="card-footer">
                    <small class="text-muted">{i.token_id}</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
          </div>
          )
      }
      )
      }
      </div>
    </div>
  );
}

export default App;
