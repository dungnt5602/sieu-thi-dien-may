import { BrowserRouter } from "react-router-dom";
import { DataProvider } from "./GlobalState";
import Header from "./components/Header/Header";
import MainPages from "./pages/Pages";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <BrowserRouter>
      <DataProvider>
        <Header />
        <MainPages />
        <Footer />
      </DataProvider>
    </BrowserRouter>
  );
}

export default App;
