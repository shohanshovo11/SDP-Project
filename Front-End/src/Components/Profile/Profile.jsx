import Footer from '../Footer';
import { Navbar } from '../navbar/Navbar';
import BasicInfo from './BasicInfo';
import './style.css';

export const Profile = () => {
  return (
    <>
    <div className='root pb-28'>
      <Navbar />
      <br />
      <br />
      <br />
      <br />
      <BasicInfo obj={{name: "Shovo"}} />
    </div>
    <Footer />
    </>
  );
}

// export default CreateProfile;
