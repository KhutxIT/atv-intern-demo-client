import { useSelector } from 'react-redux';
import HomeFeed from '../../../components/feed/HomeFeed';
import NewUsersList from '../../../components/newuserlist/NewUsersList';

function HomePage(props) {
  const user = useSelector(({ user }) => user);
  document.title = `${user.data.name} | Trang chủ`;

  return (
    <div id="homepage-container">
      <div id="left-container" className="section">
        <NewUsersList />
      </div>

      <div id="right">
        <HomeFeed />
      </div>
    </div>
  );
}

export default HomePage;
