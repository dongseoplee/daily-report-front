import { BrowserRouter } from "react-router-dom";
import Mainpage from './Mainpage/Mainpage.js';

function Router() {
    return(
        <BrowserRouter>
            <Routes>
                <Route path = "/" element={<Mainpage />}/>
            </Routes>
        </BrowserRouter>

    );
}

export default Router;