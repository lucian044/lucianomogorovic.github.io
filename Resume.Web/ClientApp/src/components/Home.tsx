import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { ApplicationState } from '../store';
import * as HomeStore from '../store/Home';

type HomeProps =
    HomeStore.HomeState &
    typeof HomeStore.actionCreators &
    RouteComponentProps<{}>;

class Home extends React.PureComponent<HomeProps> {

  componentDidMount() {
    if (!this.props.personalInfo) {
      this.props.getPersonalInfo();
    }
  }

    public render() {
      let homeMarkup = <></>;
      if (this.props.isLoading) {
        homeMarkup =
          <div>
            <h3>Loading...</h3>
          </div>;
      } else if (!this.props.personalInfo) {
        homeMarkup = 
            <div>
                <h2>There was an error getting the information about the loan.</h2>
            </div>;
      } else {
        var personalInfo = this.props.personalInfo;

        homeMarkup = 
          <div className="home">
            <div className="block-content">
              <h1 className="header">{personalInfo.firstName} {personalInfo.lastName}</h1>
              <h5 className="sub-header grey">{personalInfo.title}</h5>
            </div>
            <div className="block-content">
              <div className="sub-title-color"></div>
              <h1 className="sub-title">About Me</h1>
              <p>{personalInfo.description}</p>
            </div>
            <div className="block-content">
              <div className="sub-title-color"></div>
              <h1 className="sub-title">Personal Info</h1>
              <div className="middle-line">
                <div className="two-columns">
                  <div className="left-column" id="personal-info-left">
                    <ul>
                      <li>
                        <b>Address:</b> <br />
                        {personalInfo.streetAddress} <br />
                        {personalInfo.city}, {personalInfo.zipCode} <br />
                      </li>
                    </ul>
                  </div>
                  <div className="right-column" id="personal-info-right">
                    <ul>
                      <li><b>Email:</b> {personalInfo.email}</li>
                      <li><b>Phone:</b> {personalInfo.phoneNumber}</li>
                      <li><b>Website:</b> {personalInfo.website}</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>;
      }
        return homeMarkup;
    }
};

export default connect(
    (state: ApplicationState) => state.home,
    HomeStore.actionCreators
)(Home as any);
