import axios from 'axios';
const URL = process.env.REACT_APP_BIN_API_URL
const MASTER_KEY = process.env.REACT_APP_BIN_MASTER_KEY
const ACCESS_KEY = process.env.REACT_APP_BIN_ACCESS_KEY

async function getDivers() {
    try {
        const headers = {
            "X-Master-Key": MASTER_KEY,
            "X-Access-Key": ACCESS_KEY
        }

        const response = await axios.get(URL as string, { headers});
        console.log(response.data);

        return response.data.record
    } catch (error) {
      console.error(error);
    }
  }
  
export default getDivers;