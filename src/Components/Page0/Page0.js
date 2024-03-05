import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../Header/Header';
import IntroComponent from '../IntroSection/IntroComponent';
import LandingCardComponent from '../Landing/LandingComponent';
function PageZero() {

  return (
    <div >
      <Header></Header>
      <IntroComponent></IntroComponent>
      <LandingCardComponent></LandingCardComponent>
    </div>
  );
}

export default PageZero;