import React from 'react';
import {applicationsGraphName} from '../configs/general';
import UserApplicationStore from '../stores/UserApplicationStore';
import {connectToStores} from 'fluxible-addons-react';
import {navigateAction, NavLink} from 'fluxible-router';

class DatasetApplications extends React.Component {
    componentDidMount() {

    }

    render() {
        let cssClass;
        let list = this.props.UserApplicationStore.applications.map(function(node, index) {
            if(node.status === 'submitted'){
                cssClass = 'animated fadeIn';
                cssClass = cssClass + ' warning';
            }else if (node.status === 'approved'){
                cssClass = cssClass + ' positive';
            }else if (node.status === 'rejected'){
                cssClass = cssClass + ' negative';
            }
            return (
                <tr className={cssClass} key={index}>
                  <td>
                      <NavLink routeName="datasetApplications" href={'/dataset/' + encodeURIComponent(applicationsGraphName) + '/resource/' + encodeURIComponent(node.uri)}>
                          {index+1}
                      </NavLink>
                  </td>
                  <td>{node.type}</td>
                  <td>{node.created}</td>
                  <td>{node.status}</td>
                </tr>
            )
        });
        return (
            <div className="ui page grid" ref="datasetApplications">
                <div className="row">
                  <div className="column">
                    <h1 className="ui header">Datset Visit/Access Requests</h1>
                      <div className="ui segment">
                          <table className="ui celled table">
                            <thead>
                              <tr>
                                <th>#</th>
                                <th>Type</th>
                                <th>Submission Date</th>
                                <th>Status</th>
                              </tr>
                            </thead>
                            <tbody>
                                {list}
                            </tbody>
                          </table>
                      </div>
                  </div>
                </div>
            </div>
        )
    }
}
DatasetApplications.contextTypes = {
    executeAction: React.PropTypes.func.isRequired,
    getUser: React.PropTypes.func
};
DatasetApplications = connectToStores(DatasetApplications, [UserApplicationStore], function (context, props) {
    return {
        UserApplicationStore: context.getStore(UserApplicationStore).getState()
    };
});
export default DatasetApplications;
