import { Navigate} from 'react-router-dom';

const LogoutButton = () => {


  const handleLogout = () => {
    // Perform logout logic
    // Clear session-related data

    // Redirect to login page
    Navigate.push('/');
  };

  return (
    <button onClick={handleLogout}>
      Logout
    </button>
  );
};

export default LogoutButton;
