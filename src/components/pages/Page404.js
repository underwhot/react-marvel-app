import { Link } from 'react-router-dom';
import ErrorMessage from '../errorMessage/ErrorMessage';

const Page404 = () => {
  return (
    <div style={{ textAlign: 'center' }}>
      <ErrorMessage></ErrorMessage>
      <p>Oops! Page doesn't exist</p>
      <Link to="/">Back to main page</Link>
    </div>
  );
};

export default Page404;
