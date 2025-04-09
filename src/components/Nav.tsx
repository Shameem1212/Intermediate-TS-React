import { Link } from 'react-router-dom';

const Nav = () => {
  // TODO: Add necessary code to display the navigation bar and link between the pages
  return (
    <nav>
      <Link to={'/'}>Candidate Search Page</Link>
      <Link to={'/SavedCandidates'}>Saved Candidates Page</Link>
    </nav>
  );
};

export default Nav;
