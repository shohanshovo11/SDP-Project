import { Navbar } from '../navbar/Navbar';
import BasicInfo from './BasicInfo';
import './style.css';

export const Profile = () => {
  return (
    <div className='root'>
      <Navbar />
      <br />
      <br />
      <br />
      <br />
      <BasicInfo obj={{name: "Shovo"}} />
    </div>
  );
}

// export default CreateProfile;
