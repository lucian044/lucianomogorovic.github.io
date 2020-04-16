import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { ApplicationState } from '../store';
import * as CounterStore from '../store/Counter';

type HomeProps =
    CounterStore.CounterState &
    typeof CounterStore.actionCreators &
    RouteComponentProps<{}>;

class Home extends React.PureComponent<HomeProps> {
    public render() {
        return (
          <div className="home">
          <div className="block-content">
            <h1 className="header">Luciano Mogorovic</h1>
            <h5 className="sub-header grey">Software Developer</h5>
          </div>
          <div className="block-content">
            <div className="sub-title-color"></div>
            <h1 className="sub-title">About Me</h1>
            <p>“ Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse ! “</p>
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
                      1553 Warren Road <br />
                      Lakewood, 44107 <br />
                    </li>
                  </ul>
                </div>
                <div className="right-column" id="personal-info-right">
                  <ul>
                    <li><b>Email:</b> lmogorovic44@gmail.com</li>
                    <li><b>Phone:</b> (216) 659-1931</li>
                    <li><b>Website:</b> www.lucianomogorovic.dev</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        );
    }
};

export default connect(
    (state: ApplicationState) => state.counter,
    CounterStore.actionCreators
)(Home);
