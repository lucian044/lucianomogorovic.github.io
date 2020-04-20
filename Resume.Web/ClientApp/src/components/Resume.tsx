import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { ApplicationState } from '../store';
import * as ResumeStore from '../store/Resume';

type ResumeProps =
    ResumeStore.ResumeState &
    typeof ResumeStore.actionCreators &
    RouteComponentProps<{}>;

class Resume extends React.PureComponent<ResumeProps> {

    componentDidMount() {
        if (!this.props.experiences || !this.props.education || !this.props.hardSkills || !this.props.softSkills) { 
            this.props.getResume();
        }
    }

    public render() {
        let resumeMarkup = <></>;
      if (this.props.isLoading) {
        resumeMarkup =
          <div>
            <h3>Loading...</h3>
          </div>;
      } else if (!this.props.experiences || !this.props.education || !this.props.hardSkills || !this.props.softSkills) {
        resumeMarkup = 
            <div>
                <h2>There was an error getting Luciano's work experiences.</h2>
            </div>;
      } else {
        let workExperiences = this.props.experiences.filter(exp => exp.type === 'Work');
        let internExperiences = this.props.experiences.filter(exp => exp.type === 'Intern');
        let education = this.props.education;
        let hardSkills = this.props.hardSkills;
        let softSkills = this.props.softSkills;
        resumeMarkup =
            <div className="resume">
                <div className="block-content">
                    <h1 className="header">Resume</h1>
                </div>
                <div className="block-content">
                    <div className="sub-title-color"></div>
                    <h1 className="sub-title">Work Experience</h1>
                    <div className="middle-line">
                        <div className="two-col-grid">
                            <div className="left-col">
                                {
                                    workExperiences.map((exp, i) => {
                                        let expDates = exp.endDate ?
                                                       exp.startDate + ' - ' + exp.endDate :
                                                       exp.startDate + ' - Present';
                                        return (
                                            <div key={i}>
                                                <p className="grey">{expDates}</p>
                                                <p>{exp.title} - {exp.company}</p>
                                            </div>
                                        );
                                    })
                                }
                            </div>
                            <div className="right-col">
                                {
                                    workExperiences.map((exp, i) => {
                                        return (
                                            <div key={i}>
                                                <p>{exp.description}</p>
                                            </div>
                                        );
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <div className="block-content">
                    <div className="sub-title-color"></div>
                    <h1 className="sub-title">Internship Experience</h1>
                    <div className="middle-line">
                        <div className="two-col-grid">
                            <div className="left-col">
                                {
                                    internExperiences.map((exp, i) => {
                                        return (
                                            <div key={i}>
                                                <p className="grey">{exp.startDate} - {exp.endDate}</p>
                                                <p>{exp.title} - {exp.company}</p>
                                            </div>
                                        );
                                    })
                                }
                            </div>
                            <div className="right-col">
                                {
                                    internExperiences.map((exp, i) => {
                                        return (
                                            <div key={i}>
                                                <p>{exp.description}</p>
                                            </div>
                                        );
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <div className="block-content">
                    <div className="sub-title-color"></div>
                    <h1 className="sub-title">Education</h1>
                    <div className="middle-line">
                        <div className="two-col-grid">
                            <div className="left-col">
                                {
                                    education.map((edu, i) => {
                                        return (
                                            <div key={i}>
                                                <p className="grey">{edu.startDate} - {edu.endDate}</p>
                                                <p>{edu.school}</p>
                                                <p>{edu.degreeType} - {edu.fieldOfStudy}</p>
                                            </div>
                                        );
                                    })
                                }
                            </div>
                            <div className="right-col">
                                {
                                    education.map((edu, i) => {
                                        return (
                                            <div key={i}>
                                                <p>{edu.description}</p>
                                            </div>
                                        );
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <div className="block-content">
                    <div className="sub-title-color"></div>
                    <h1 className="sub-title">Skills</h1>
                    <div className="middle-line">
                        <div className="two-col-grid">
                            <div className="left-col no-gap no-center">
                                <h4 className='grey'>Hard Skills</h4>
                                {
                                    hardSkills.map((hs, i) => {
                                        return (
                                            <p key={i}>{hs}</p>
                                        );
                                    })
                                }
                            </div>
                            <div className="right-col no-gap no-center">
                                <h4 className='grey'>Soft Skills</h4>
                                <div>
                                    {
                                        softSkills.map((sf, i) => {
                                            return (
                                                <p key={i}>{sf}</p>
                                            );
                                        })
                                    }
                                </div>
                                <h4 className='grey margin-top'>Hobbies & Interests</h4>
                                <div className='four-col-grid'>
                                    <div className="two-row-grid">
                                        <i className="fas fa-baseball-ball"></i>
                                        <p>Baseball</p>
                                    </div>
                                    <div className="two-row-grid">
                                        <i className="fas fa-volleyball-ball"></i>
                                        <p>Volleyball</p>
                                    </div>
                                    <div className="two-row-grid">
                                        <i className="fas fa-laptop-code"></i>
                                        <p>Technology</p>
                                    </div>
                                    <div className="two-row-grid">
                                        <i className="fas fa-globe-americas"></i>
                                        <p>Travel</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>;
      }
        return resumeMarkup;
    }
};

export default connect(
    (state: ApplicationState) => state.resume,
    ResumeStore.actionCreators
)(Resume as any);
