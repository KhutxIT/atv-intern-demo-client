import { Route, Switch, useRouteMatch } from 'react-router-dom';
import SidebarAcc from '../../components/admin/sidebar/Sidebar';
import AccountantDetail from '../../pages/admin/account/accountantdetail/AccountantDetail';
import AccountListPage from '../../pages/admin/account/accountlist/AccountListPage';
import Dashboard from '../../pages/admin/dashboard/Dashboard';
import Minter from '../../pages/admin/nft/create/Minter';
import ManageNFT from '../../pages/admin/nft/ManageNFT';
import './style.scss';

const AdminLayout = (props) => {
  const match = useRouteMatch();
  return (
    <div className="admin-layout">
      <div className="layout-left">
        <SidebarAcc />
      </div>
      <div className="layout-right">
        <Switch>
          <Route
            path={[`${match.path}/`, `${match.path}/dashboard`]}
            component={Dashboard}
            exact
          />
          <Route
            path={`${match.path}/users`}
            component={AccountListPage}
            exact
          />
          <Route
            path={`${match.path}/users/:id`}
            exact
            component={AccountantDetail}
          />
          <Route
            path={`${match.path}/nfts`}
            exact
            component={ManageNFT}
          />
          <Route
            path={`${match.path}/nfts/create`}
            exact
            component={Minter}
          />
        </Switch>
      </div>
    </div>
  );
};

export default AdminLayout;
