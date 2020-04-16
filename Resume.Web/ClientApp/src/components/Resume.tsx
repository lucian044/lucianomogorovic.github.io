import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { ApplicationState } from '../store';
import * as CounterStore from '../store/Counter';

type ResumeProps =
    CounterStore.CounterState &
    typeof CounterStore.actionCreators &
    RouteComponentProps<{}>;

class Resume extends React.PureComponent<ResumeProps> {
    public render() {
        return (
            <div className="resume">
                <div className="block-content">
                    <h1 className="header">Resume</h1>
                </div>
                <div className="block-content">
                    <div className="sub-title-color"></div>
                    <h1 className="sub-title">Work Experience</h1>
                    <div className="middle-line">
                        <div className="two-columns">
                            <div className="left-column" id="work-experience-left">
                              <p className="grey">May 2018</p>
                              <p>Software Developer - Union Home Mortgage</p>
                            </div>
                            <div className="right-column" id="work-experience-right">
                              <p>Full time position as a software developer.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="block-content">
                    <div className="sub-title-color"></div>
                    <h1 className="sub-title">Internship Experience</h1>
                    <div className="middle-line">
                        <div className="two-columns">
                            <div className="left-column" id="work-experience-left">
                              <p className="grey">May 2017 - August 2017</p>
                              <p>Software Development Intern - Union Home Mortgage</p>
                            </div>
                            <div className="right-column" id="work-experience-right">
                              <p>Second internship of college as software developer at a mortgage company.</p>
                            </div>
                        </div>
                        <div className="two-columns">
                            <div className="left-column" id="work-experience-left">
                              <p className="grey">May 2016 - August 2016</p>
                              <p>Software Development Intern - Sanctuary Software</p>
                            </div>
                            <div className="right-column" id="work-experience-right">
                              <p>First internship of college as software developer at a software company.</p>
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
)(Resume);
